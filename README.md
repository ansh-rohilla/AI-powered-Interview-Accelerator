# AI-Powered Interview Accelerator

> **AI Product Engineer Intern Challenge — Assignment 3**  
> Built for **Student Credibility** / **edxso**  
> Candidate: **Ansh Rohilla**

---

## 1. Executive Summary & Problem Overview

When students and early-career candidates prepare for competitive technical interviews, they usually possess a **Resume** and a target **Job Description (JD)**, but face critical uncertainties:
- **Employer Expectations:** What the employer is *actually* seeking beneath buzzwords.
- **Resume Match & Fit:** How genuinely their background aligns with core competencies.
- **Interview Questions:** What specific technical and behavioral challenges they will confront.
- **Evaluation Standards:** How an elite interviewer will evaluate their answers and detect weak claims.
- **Preparation Gaps:** Exactly which architectures, formulas, and concepts need focused study.
- **Interview Readiness:** A transparent, quantitative measure of whether they are ready to sit for the interview.

**Interview Accelerator** solves this problem end-to-end through an adaptive, multi-tier AI simulation platform equipped with speech synthesis, real-time microphone transcription, camera feedback, and deep-dive probing.

---

## 2. Key Features & Acceptance Criteria Alignment

| edxso Criterion | Implementation & Capabilities |
| :--- | :--- |
| **JD & Resume Input** | Paste raw text OR upload documents (`.pdf`, `.txt`, `.docx`, `.md`). Includes 3 verified realistic presets for 1-click evaluator testing. |
| **Step 1: Role Intelligence** | Extracts Role Title, Key Responsibilities, Required Skills, Preferred Skills, Technical Competencies, Behavioural Competencies, Keywords, and Critical Concepts into a dedicated dashboard. |
| **Step 2: Candidate Verification** | Performs candidate skill extraction, checks strong/partial/missing skills, flags unverified resume claims for recruiter probing, and computes a composite **Job Fit Score (0–100%)**. |
| **Step 3: AI Interview Simulator** | 3-stage progressive simulation: **Level 1 (Screening)**, **Level 2 (Competency)**, and **Level 3 (Deep-Dive Probe)**. |
| **Adaptive Intelligence** | Evaluates answers in real time: strong answers trigger edge-case scenarios; vague answers trigger fundamental and quantitative probes. |
| **Voice AI (Mandatory)** | **Text-to-Speech (TTS)** with natural speech synthesis & visual waveform; **Speech-to-Text (STT)** with real-time continuous microphone transcription. |
| **Video & Communication Analytics** | Live webcam feed with speaking pace (**WPM**), filler-word detection (`um`, `uh`, `like`, `actually`), answer duration, and confidence indicators. |
| **Step 4: Performance Report** | Overall Score, 7 Competency Scores, question-by-question deep dive (**What Was Good**, **What Could Be Better**, **Ideal Direction**), Strengths, and Weaknesses. |
| **Interview Readiness Scale** | 4-tier assessment: `Not Ready (<60)`, `Needs Preparation (60–74)`, `Interview Ready (75–87)`, and `Strong Candidate (88+)`. |
| **Step 5: Preparation Roadmap** | Prioritized action plan (`Priority 1`, `Priority 2`, `Priority 3`) with interactive study checklist and curated documentation resources. |
| **Bonus Features** | Local session history tracking, exportable print/PDF formatting, multiple interviewer personas (Staff AI Engineer, VP of Engineering, Talent Partner), dual-mode AI engine (Offline Heuristic NLP + Cloud LLMs). |

---

## 3. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INTERVIEW ACCELERATOR                           │
│                                                                        │
│   ┌─────────────────────┐              ┌───────────────────────────┐   │
│   │   Input Workspace   │              │   Voice & Video Studio    │   │
│   │  - JD & Resume Text │              │  - MediaDevices Camera    │   │
│   │  - PDF/File Parsing │              │  - Web Speech TTS Engine  │   │
│   │  - 3 Quick Presets  │              │  - Realtime STT Listen    │   │
│   └──────────┬──────────┘              └─────────────┬─────────────┘   │
│              │                                       │                 │
│              ▼                                       ▼                 │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                  AI Orchestration Engine                     │     │
│   │  ┌───────────────────────────────┬────────────────────────┐  │     │
│   │  │   Local Heuristic NLP Engine  │  Cloud LLM Dispatcher  │  │     │
│   │  │   - Role Deconstruction       │  - OpenAI (GPT-4o)     │  │     │
│   │  │   - 3-Tier Match Calculator   │  - Gemini 1.5 Flash    │  │     │
│   │  │   - Resume Claim Auditor      │  - Groq (Llama 3.3)    │  │     │
│   │  │   - Adaptive Difficulty       │  (Zero-config fallback)│  │     │
│   │  └───────────────────────────────┴────────────────────────┘  │     │
│   └──────────────────────────────┬───────────────────────────────┘     │
│                                  │                                     │
│                                  ▼                                     │
│   ┌──────────────────────────────────────────────────────────────┐     │
│   │                Evaluation & Reporting Engine                 │     │
│   │  - Multi-Competency Weighting (Role, Tech, Problem, Comm)    │     │
│   │  - Question-Level Triad (Strengths / Critiques / Ideal Ans)  │     │
│   │  - Communication Analytics (WPM, Fillers, Speech Clarity)    │     │
│   │  - Prioritized Gap Roadmap & Curated Study Links             │     │
│   └──────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Technical Explanations

### 4.1 AI / LLM Approach & Dual-Engine Design
- **Offline / Local Heuristic NLP Engine:** Built directly into `src/services/aiEngine.js` using deterministic rule-based parsing, domain keyword extraction, and contextual scoring. This ensures that any evaluator can test the full user journey immediately **without entering any API keys**.
- **Cloud LLM Dispatcher:** Supports live integration with **OpenAI (GPT-4o-mini)**, **Google Gemini (Gemini 1.5 Flash)**, and **Groq (Llama 3.3 70B)**. When an API key is provided via the in-app Settings modal, prompts are dispatched with structured JSON outputs.

### 4.2 Dynamic Questioning Logic & Adaptive Intelligence
The interview simulator models real hiring loops through 3 progressive levels:
1. **Level 1 — Screening Round:** Begins with a personalized question grounded directly in the candidate's actual projects (e.g. asking about their final-year RAG assistant rather than a generic "tell me about yourself").
2. **Level 2 — Competency Round:** Tests technical systems and architectural tradeoffs (e.g., chunk size and overlap selection in vector databases, latency scaling, async FastAPI handling).
3. **Level 3 — Deep-Dive Probe:** Simulates a rigorous interviewer who detects unverified claims. For example, if a resume states *"Improved model accuracy by 18%"*, the AI probes the baseline dataset, evaluation formulas, and counter-questions regarding dataset imbalance.
- **Adaptive Calibration:** Responses are analyzed for word count, technical vocabulary, and specificity. Strong answers trigger edge-case scenarios; hesitant or vague answers trigger foundational clarification questions.

### 4.3 Voice & Video Implementation
- **Text-to-Speech (TTS):** Uses the browser `window.speechSynthesis` API, matching natural English voices, accompanied by an animated audio waveform.
- **Speech-to-Text (STT):** Uses the `window.webkitSpeechRecognition` API for continuous real-time voice capture. A manual editable text fallback is provided to guarantee complete accessibility across all devices.
- **Video & Speech Analytics:** `navigator.mediaDevices.getUserMedia` provides a mirrored webcam feed. In-flight text is parsed by `MetricsService` to calculate words per minute (WPM), flag filler words (`um`, `uh`, `like`, `basically`), and score communication clarity.

### 4.4 Evaluation Methodology
- **Job Fit Score:** Evaluated across Required Skills (50%), Practical Projects (25%), Domain Alignment (15%), and Preferred Competencies (10%).
- **Interview Performance Score:** Weighted across Technical Knowledge (25%), Problem Solving (20%), Role Fit (20%), Depth of Understanding (15%), Communication (10%), and Confidence (10%).
- **Readiness Scale:**
  - `🔴 Not Ready (<60)`: Significant foundational gaps.
  - `🟠 Needs Preparation (60–74)`: Demonstrates potential but lacks verification rigor.
  - `🟡 Interview Ready (75–87)`: Capable of passing standard technical screens.
  - `🟢 Strong Candidate (88+)`: Exceptional technical depth, concise storytelling, and high ownership.

---

## 5. Quickstart & Local Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation Steps
```bash
# 1. Clone repository
git clone https://github.com/ansh-rohilla/AI-powered-Interview-Accelerator.git
cd AI-powered-Interview-Accelerator

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 6. Live Deployment & Submission Links

- **GitHub Repository:** [https://github.com/ansh-rohilla/AI-powered-Interview-Accelerator](https://github.com/ansh-rohilla/AI-powered-Interview-Accelerator)
- **Primary Preset Tested:** AI Product Engineer Intern (Student Credibility / edxso benchmark)
- **Candidate Evaluated:** Aravind Chenna (B.Tech CS, RAG Assistant capstone, FastAPI microservices)

---

## 7. Author
- **Name:** Ansh Rohilla
- **Target Role:** AI Product Engineer Intern
- **Organization:** edxso / Student Credibility
