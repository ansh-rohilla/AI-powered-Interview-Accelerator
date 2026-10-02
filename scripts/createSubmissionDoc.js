import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType,
  ShadingType
} from 'docx';
import fs from 'fs';
import path from 'path';

async function createSubmissionDoc() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22, // 11pt
            color: '1E293B',
          },
          paragraph: {
            spacing: { line: 276, before: 120, after: 120 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Document Header / Title
          new Paragraph({
            text: 'AI Product Engineer Intern Challenge',
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 80 },
            run: {
              bold: true,
              size: 44, // 22pt
              color: '1E3A8A', // Deep navy
              font: 'Calibri',
            },
          }),
          new Paragraph({
            text: 'Assignment 3: AI-Powered Interview Accelerator — Final Submission Report',
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            run: {
              bold: true,
              size: 26, // 13pt
              color: '2563EB',
              font: 'Calibri',
            },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 360 },
            children: [
              new TextRun({ text: 'Candidate: ', bold: true }),
              new TextRun({ text: 'Ansh Rohilla  |  ' }),
              new TextRun({ text: 'Target Role: ', bold: true }),
              new TextRun({ text: 'AI Product Engineer Intern  |  ' }),
              new TextRun({ text: 'Company: ', bold: true }),
              new TextRun({ text: 'edxso / Student Credibility' }),
            ],
          }),

          // Divider Line
          new Paragraph({
            text: '',
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 12, color: '2563EB' },
            },
            spacing: { after: 300 },
          }),

          // Section 1: Executive Deliverables Table
          new Paragraph({
            text: '1. Executive Deliverables & Submission Links',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Item', bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Link & Description', bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Live Deployed Web Application', bold: true })] })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'https://ansh-rohilla.github.io/AI-powered-Interview-Accelerator/', color: '2563EB', bold: true }),
                          new TextRun({ text: ' (Hosted 24/7 on GitHub Global CDN with automated CI/CD deployment)' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'GitHub Source Repository', bold: true })] })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'https://github.com/ansh-rohilla/AI-powered-Interview-Accelerator', color: '2563EB', bold: true }),
                          new TextRun({ text: ' (Full source code, production build configs, and GitHub Actions)' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Core Architecture Stack', bold: true })] })],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'React 19, Vite, Tailwind CSS v4, Web Speech Synthesis & Recognition, WebRTC MediaStream, Dual-Mode AI Engine (Local Heuristic NLP + Cloud LLM Connectors)' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { after: 200 } }),

          // Section 2: Evaluator Walkthrough (Zero Assistance Needed)
          new Paragraph({
            text: '2. Evaluator Quick-Start Guide (Zero-Assistance Walkthrough)',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            text: 'The evaluator can open the live URL and experience the complete user journey in under 3 minutes without configuring any external API keys or installing dependencies:',
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Step 1 — One-Click Quick Preset: ', bold: true }),
              new TextRun({ text: 'On the Dashboard, click the pre-loaded preset "AI Product Engineer Intern (edxso Recommended)". The exact JD and a realistic candidate resume (Aravind Chenna, B.Tech CS, RAG project, 18% accuracy claim) populate automatically.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Step 2 — Role Intelligence Deconstruction: ', bold: true }),
              new TextRun({ text: 'Click "Analyze Role & Match". The system extracts Role Title, Key Responsibilities, Required vs Preferred Skills, Technical/Behavioural Competencies, and Critical Domain Concepts into a clean dashboard.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Step 3 — Candidate Verification & Fit Score: ', bold: true }),
              new TextRun({ text: 'Review the 78% Job Fit Score, 3-tier skill breakdown (Strong / Partial / Missing), and flagged unverified resume claims targeted for recruiter probing.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Step 4 — 3-Level AI Interview Simulation: ', bold: true }),
              new TextRun({ text: 'Launch the AI Interview Studio. The AI speaks the question via Text-to-Speech (TTS). Candidate can answer with voice (STT) or text. Experience Level 1 (Screening), Level 2 (Competency), and Level 3 (Deep-Dive Probe where the AI challenges the 18% accuracy claim).' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Step 5 — Evaluation Report & Preparation Plan: ', bold: true }),
              new TextRun({ text: 'Generate the Performance Report to view the Overall Score, Interview Readiness badge (Interview Ready / Strong Candidate), Question-by-Question feedback triad, prioritized preparation roadmap, and print/PDF export.' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 3: Architecture
          new Paragraph({
            text: '3. Technical Architecture',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            text: 'The application is architected as a modular, responsive single-page application (SPA) designed for zero-latency user interaction and maximum portability:',
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Presentation Layer: ', bold: true }),
              new TextRun({ text: 'Built on React 19 and Vite with Tailwind CSS v4. Features a segmented floating stepper, split-screen video/avatar studio, real-time waveform visualizers, and print-ready CSS formatting.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Audio & Video Pipeline: ', bold: true }),
              new TextRun({ text: 'Utilizes navigator.mediaDevices.getUserMedia for webcam video capture, Web Speech Synthesis for natural voice playback, and Web Speech Recognition for real-time transcription with fallback.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Client Intelligence Layer: ', bold: true }),
              new TextRun({ text: 'All core parsing, semantic matching, WPM calculations, filler-word counting, adaptive questioning, and report scoring execute in the browser. Zero reliance on fragile third-party servers ensures 100% uptime for evaluators.' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 4: AI/LLM Approach
          new Paragraph({
            text: '4. AI / LLM Approach',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            text: 'The platform employs a Dual-Mode AI Engine to balance evaluator accessibility with enterprise extensibility:',
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Deterministic Local Heuristic NLP Engine: ', bold: true }),
              new TextRun({ text: 'Ensures that any recruiter or evaluator can run the application instantly with zero configuration, zero token expenses, and zero risk of rate limits. It incorporates domain keyword taxonomies, regex entity extractors, and contextual prompt templates modeled on elite engineering interviews.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Pluggable Cloud LLM Connectors: ', bold: true }),
              new TextRun({ text: 'Through the in-app Settings modal, users can seamlessly connect their OpenAI (GPT-4o / GPT-4o-mini), Google Gemini (Gemini 1.5 Flash), or Groq (Llama 3.3 70B) API keys. The engine enforces strict JSON schema validation for deterministic structured outputs.' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 5: Voice Implementation
          new Paragraph({
            text: '5. Voice & Video Implementation',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Text-to-Speech (TTS): ', bold: true }),
              new TextRun({ text: 'Implemented via window.speechSynthesis. Automatically discovers and binds to high-quality natural voices. Text is pre-sanitized to strip markdown asterisks and URLs for crisp, human-like cadence, synchronized with animated audio visualizer waves.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Speech-to-Text (STT): ', bold: true }),
              new TextRun({ text: 'Implemented via window.webkitSpeechRecognition with continuous streaming and interim results. Enables candidates to speak naturally while viewing their words transcribed in real time.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Real-Time Communication Signals HUD: ', bold: true }),
              new TextRun({ text: 'MetricsService analyzes live speech to calculate Words Per Minute (WPM) with an optimal cadence target (130-165 WPM), counts conversational filler words ("um", "uh", "like", "actually", "basically"), and measures speech clarity.' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 6: Dynamic Questioning Logic
          new Paragraph({
            text: '6. Dynamic Questioning Logic & Adaptive Calibrations',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            text: 'Rather than reading static, predetermined question lists, the AI interviewer behaves like an experienced hiring manager through a 3-level progressive state machine:',
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Level 1 (Screening Round): ', bold: true }),
              new TextRun({ text: 'Opens with a personalized question derived from the candidate\'s specific resume project (e.g. asking about their RAG Technical Knowledge Assistant rather than generic questions). Evaluates role motivation and core alignment.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Level 2 (Competency Round): ', bold: true }),
              new TextRun({ text: 'Escalates technical depth, probing architectural decisions such as chunk size tradeoffs, vector indexing (HNSW), and asynchronous streaming resilience in FastAPI.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Level 3 (Deep-Dive Probe): ', bold: true }),
              new TextRun({ text: 'Specifically probes claims made on the resume. For example, if the resume claims an "18% accuracy improvement", the AI interviewer challenges how the baseline was established, whether accuracy was biased by class imbalance, and how hallucinations are mitigated.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Adaptive Intelligence: ', bold: true }),
              new TextRun({ text: 'If a candidate answers with exceptional depth, the AI immediately introduces edge cases and production scale constraints. If the candidate struggles or gives vague answers, the AI pivots to assess core fundamentals.' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 7: Evaluation Methodology
          new Paragraph({
            text: '7. Evaluation Methodology',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            text: 'Evaluation is transparent, quantitative, and directly actionable:',
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Job Fit Score Formula: ', bold: true }),
              new TextRun({ text: 'Composite score weighted across Required Technical Skills (50%), Practical Projects (25%), Domain Alignment (15%), and Preferred Competencies (10%).' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Interview Performance Score: ', bold: true }),
              new TextRun({ text: 'Calculated across Technical Knowledge (25%), Problem Solving (20%), Role Fit (20%), Depth of Understanding (15%), Communication (10%), and Confidence & Delivery (10%).' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '4-Tier Readiness Scale: ', bold: true }),
              new TextRun({ text: 'Classifies candidate readiness into Not Ready (<60), Needs Preparation (60-74), Interview Ready (75-87), and Strong Candidate (88+).' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Question-Level Feedback Triad: ', bold: true }),
              new TextRun({ text: 'For every question asked, provides verbatim transcribed answer, score, What Was Good (strengths), What Could Be Better (concrete critiques), and Ideal Direction (model answer guidance).' }),
            ],
            bullet: { level: 0 },
          }),

          // Section 8: Key Technical Decisions
          new Paragraph({
            text: '8. Key Technical Decisions',
            heading: HeadingLevel.HEADING_1,
            run: { bold: true, size: 30, color: '1E3A8A' },
            spacing: { before: 240, after: 160 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. React 19 + Vite over Heavy Monolith: ', bold: true }),
              new TextRun({ text: 'Enables sub-second hot reloads, 120ms production builds, and clean static edge deployment to GitHub Pages with 0 server maintenance.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '2. Native Browser Web Speech over Server Audio Roundtrips: ', bold: true }),
              new TextRun({ text: 'Eliminates 2-3 second audio latency typical of cloud STT/TTS APIs, creating an instantaneous conversational interview experience.' }),
            ],
            bullet: { level: 0 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3. Client-Side Evaluation & Local Storage Persistence: ', bold: true }),
              new TextRun({ text: 'Allows candidates to review their interview history, retain past sessions, and practice privately without transmitting sensitive resume data to external database servers.' }),
            ],
            bullet: { level: 0 },
          }),

          // Sign-off footer
          new Paragraph({
            text: '',
            border: {
              bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
            },
            spacing: { before: 300, after: 200 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: 'Respectfully submitted for the edxso AI Product Engineer Intern selection.', italics: true, color: '64748B' }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(process.cwd(), 'AI_Product_Engineer_Intern_Assignment_3_Submission.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document successfully created at: ${outputPath}`);
}

createSubmissionDoc().catch(err => {
  console.error('Error generating document:', err);
  process.exit(1);
});
