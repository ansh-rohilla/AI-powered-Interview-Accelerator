// Utility for client-side file reading and text extraction

export async function extractTextFromFile(file) {
  if (!file) return '';

  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.json') || fileName.endsWith('.csv')) {
    return await file.text();
  }

  // Handle PDF files: extract ASCII text chunks from binary stream safely
  if (fileName.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer();
    return extractTextFromPdfBuffer(arrayBuffer);
  }

  // Fallback to text reader
  try {
    return await file.text();
  } catch (err) {
    throw new Error(`Unable to read file ${file.name}. Please paste the text directly.`);
  }
}

function extractTextFromPdfBuffer(buffer) {
  try {
    const uint8 = new Uint8Array(buffer);
    let str = '';
    for (let i = 0; i < uint8.length; i++) {
      str += String.fromCharCode(uint8[i]);
    }
    
    // Look for text streams in PDF syntax: BT ... ET or (Text) Tj
    const textMatches = [];
    const regexTj = /\(([^)]+)\)\s*Tj/g;
    let match;
    while ((match = regexTj.exec(str)) !== null) {
      if (match[1] && match[1].trim()) {
        textMatches.push(match[1]);
      }
    }

    if (textMatches.length > 20) {
      return textMatches.join(' ').replace(/\\([()\\])/g, '$1');
    }

    // Secondary fallback: Extract readable ASCII sequences
    const textChunks = [];
    let currentChunk = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if ((code >= 32 && code <= 126) || code === 10 || code === 13) {
        currentChunk += str[i];
      } else {
        if (currentChunk.trim().length > 4) {
          textChunks.push(currentChunk.trim());
        }
        currentChunk = '';
      }
    }
    const filtered = textChunks
      .filter(c => !c.includes('obj') && !c.includes('endobj') && !c.includes('xref') && !c.includes('/Font'))
      .join('\n');
    
    if (filtered.length > 50) {
      return filtered;
    }
  } catch (e) {
    console.warn('PDF stream extraction fallback:', e);
  }

  return 'PDF uploaded. If any text is missing, please paste text directly into the editor for maximum analysis fidelity.';
}
