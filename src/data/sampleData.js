// Preset sample profiles reflecting real-world JD and candidate pairs
// Tailored specifically to edxso / Student Credibility's AI & Product Engineering challenges

export const SAMPLE_PRESETS = [
  {
    id: 'ai-engineer',
    title: 'AI Product Engineer Intern (edxso Recommended)',
    company: 'Student Credibility / edxso',
    roleTitle: 'AI Product Engineer Intern',
    jobDescription: `Role: AI Product Engineer Intern
Company: Student Credibility (edxso)
Location: Remote / Hybrid

About the Role:
We are looking for a passionate AI Product Engineer Intern to build next-generation career intelligence and AI-powered evaluation systems. You will work on LLM pipelines, Retrieval-Augmented Generation (RAG), dynamic interview agents, and student credibility scoring algorithms.

Key Responsibilities:
- Design, build, and optimize RAG-based systems for candidate evaluation and resume parsing.
- Implement dynamic agentic workflows that adapt conversational difficulty based on real-time feedback.
- Integrate modern LLMs (Gemini, Claude, GPT) and speech APIs for conversational interfaces.
- Collaborate with frontend and backend engineers to build responsive, high-performance web applications.
- Develop quantitative evaluation harnesses to benchmark interview assessment accuracy.

Required Skills:
- Python (FastAPI, LangChain, LlamaIndex, PyTorch or similar)
- Machine Learning fundamentals and modern LLM APIs
- Retrieval-Augmented Generation (RAG) architectures and Vector Databases
- RESTful API design and asynchronous backend services
- Git, clean code architecture, and unit testing

Preferred Skills:
- Experience with speech-to-text (Whisper/WebSpeech) and audio stream processing
- Next.js / React / TypeScript frontend integration
- Vector databases (Pinecone, ChromaDB, Weaviate, Qdrant)
- Knowledge of model evaluation metrics (RAGAS, BLEU, ROUGE, Precision@K)

Behavioural Competencies:
- First-principles problem solving
- Proactive technical communication
- Rapid learning ability and curiosity
- Ownership mindset and user empathy

Experience Expectations:
- Bachelor's or Master's student in Computer Science, AI/Data Science, or equivalent experience.
- Demonstrable hands-on projects involving LLMs, RAG, or AI agents.`,

    resume: `ARAVIND CHENNA
Email: aravind.chenna@email.com | GitHub: github.com/aravind-chenna | LinkedIn: linkedin.com/in/aravind-chenna

EDUCATION
B.Tech in Computer Science & Engineering — Expected Graduation: May 2025
CGPA: 8.8 / 10.0

TECHNICAL SKILLS
- Languages: Python, JavaScript, TypeScript, SQL
- AI/ML & Frameworks: PyTorch, Hugging Face, LangChain, ChromaDB, OpenAI API, Scikit-Learn
- Backend & Tools: FastAPI, Node.js, Express, Docker, Git, PostgreSQL
- Core Concepts: RAG, Embeddings, Prompt Engineering, Semantic Search, OOP

PROJECTS
1. RAG-Based Technical Knowledge Assistant (Final-Year Capstone Project)
- Designed an end-to-end RAG question-answering assistant over 50,000 pages of technical documentation using LangChain, ChromaDB, and OpenAI embeddings.
- Implemented hybrid semantic and BM25 keyword search with reciprocal rank fusion, achieving high retrieval relevance.
- Improved model accuracy by 18% compared to the baseline single-vector approach.
- Built a FastAPI backend streaming responses to a React client interface.

2. Student Mock Interview Platform (Hackathon Winner)
- Created an interactive web app that parses resumes and generates job-specific questions.
- Integrated Web Speech API for voice input and text-to-speech feedback.
- Used vector embeddings to compare user answers against sample ideal responses.

3. Distributed Task Scheduler
- Built a multi-worker async job queue in Python using Celery and Redis to handle batch data processing.

EXPERIENCE
Software Engineering Intern — CloudScale Labs (June 2024 - August 2024)
- Developed and maintained microservices in FastAPI and PostgreSQL.
- Authored automated integration test suites increasing test coverage from 62% to 85%.
- Contributed to internal prompt evaluation tooling for customer support classification.

ACHIEVEMENTS
- 1st Place, National AI Agents Hackathon (2024)
- Finalist, Smart India Hackathon (2023)`
  },
  {
    id: 'fullstack-engineer',
    title: 'Full-Stack Product Engineer Intern',
    company: 'TechFlow Systems',
    roleTitle: 'Full-Stack Product Engineer Intern',
    jobDescription: `Role: Full-Stack Product Engineer Intern
Company: TechFlow Systems

About the Role:
We are seeking a versatile Full-Stack Product Engineer Intern to help build fast, beautiful, and intuitive user interfaces backed by scalable serverless APIs.

Key Responsibilities:
- Build and maintain modern web applications with React, Next.js, and TypeScript.
- Design performant relational database schemas in PostgreSQL with Prisma ORM.
- Implement responsive, accessible UI components using Tailwind CSS and Radix UI.
- Write clean, maintainable unit and end-to-end tests.
- Collaborate with product designers to ship delightful features with sub-second page loads.

Required Skills:
- React 18+, Next.js (App Router), TypeScript
- Node.js, Express or Next.js API routes
- PostgreSQL or MySQL, relational schema modeling
- Tailwind CSS, HTML5, CSS3, modern browser APIs
- Git and version control best practices

Preferred Skills:
- Experience with state management (Zustand, Redux Toolkit, React Query)
- Docker, CI/CD with GitHub Actions
- Cloud deployment on Vercel or AWS

Behavioural Competencies:
- Attention to detail and design sensibility
- Collaborative communication
- Independent problem solving`,

    resume: `PRIYA SHARMA
Email: priya.sharma@email.com | Portfolio: priyasharma.dev | GitHub: github.com/priya-sharma

EDUCATION
B.E. Information Technology — 2021 - 2025
CGPA: 8.5 / 10.0

SKILLS
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, React Query
- Backend: Node.js, Express, PostgreSQL, Prisma ORM, RESTful APIs
- Tools: Git, GitHub, Figma, Vercel, Postman, Jest

PROJECTS
1. SaaS Collaborative Kanban Workspace
- Developed a real-time collaborative project management application in Next.js 14 and TypeScript.
- Implemented drag-and-drop board management with optimistic UI updates and PostgreSQL persistence.
- Reduced initial bundle load by 35% through dynamic imports and server components.

2. DevSnippet Code Sharing Platform
- Built a developer snippet sharing platform with syntax highlighting, search, and user authentication.
- Authored backend REST APIs using Node.js, Express, and Prisma with JWT authentication.

EXPERIENCE
Frontend Developer Intern — InnovateX Solutions (Jan 2024 - April 2024)
- Built 15+ responsive UI components in React and Tailwind CSS following Figma design tokens.
- Fixed 20+ cross-browser responsiveness bugs across mobile Safari and Chrome.`
  },
  {
    id: 'data-scientist',
    title: 'Data Science & Machine Learning Intern',
    company: 'MetricPulse Analytics',
    roleTitle: 'Data Science & ML Intern',
    jobDescription: `Role: Data Science & ML Intern
Company: MetricPulse Analytics

Key Responsibilities:
- Conduct exploratory data analysis, hypothesis testing, and statistical modeling.
- Engineer features and train supervised machine learning models (XGBoost, Random Forest, Logistic Regression).
- Perform model evaluation, error analysis, and cross-validation across imbalanced datasets.
- Write automated data preprocessing and feature transformation pipelines in Python and SQL.

Required Skills:
- Python (Pandas, NumPy, Scikit-Learn, SciPy)
- SQL (complex queries, window functions, aggregations)
- Machine Learning algorithms, cross-validation, hyperparameter tuning
- Data visualization (Matplotlib, Seaborn, Plotly)

Preferred Skills:
- PyTorch or TensorFlow
- Experience with MLflow or Weights & Biases
- Understanding of A/B testing and causal inference

Behavioural Competencies:
- Analytical rigor and data skepticism
- Clear articulation of mathematical tradeoffs
- Systematic experimentation`,

    resume: `ROHAN VERMA
Email: rohan.verma@email.com | Kaggle: kaggle.com/rohanverma | GitHub: github.com/rohan-verma

EDUCATION
B.S. in Data Science — 2021 - 2025
CGPA: 8.9 / 10.0

SKILLS
- Programming: Python, SQL, R, Bash
- Libraries: Pandas, NumPy, Scikit-Learn, PyTorch, XGBoost, LightGBM, Seaborn
- Techniques: Regression, Classification, Clustering, Feature Importance, Cross-Validation

PROJECTS
1. Customer Churn Prediction Engine
- Developed an end-to-end churn prediction pipeline on 120,000 customer records using XGBoost.
- Applied SMOTE and stratified k-fold cross validation to handle class imbalance (8:1 ratio), achieving an AUC-ROC of 0.89.
- Identified top churn indicators through SHAP feature importance analysis.

2. Financial Fraud Detection Model
- Evaluated ensemble models on credit card transaction datasets, prioritizing precision-recall curve optimization over raw accuracy.
- Built interactive dashboard in Streamlit to visualize real-time anomaly scores.`
  }
];
