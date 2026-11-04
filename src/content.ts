const base = import.meta.env.BASE_URL;

export const person = {
  name: 'Hira',
  fullName: 'Hira Irshad',
  handle: '@HIRA04IRSHAD',
  location: 'India',
  email: 'irshad04hira@gmail.com',
};

export const nav = [
  {label: 'About', href: '#about'},
  {label: 'Projects', href: '#projects'},
  {label: 'Tech Stack', href: '#tech'},
  {label: 'Contact', href: '#contact'},
];

export const socials = [
  {label: 'GitHub', href: 'https://github.com/HIRA04IRSHAD', icon: 'github'},
  {label: 'LinkedIn', href: 'https://linkedin.com/in/hira04irshad', icon: 'linkedin'},
  {label: 'Email', href: 'mailto:irshad04hira@gmail.com', icon: 'email'},
];

export const bio = [
  'I build AI-powered products.',
  'Full-stack developer shipping with React, Next.js, Flask and LLM APIs — from construction document pipelines at IIT Roorkee to study trackers used across campuses. GATE CS 2026 qualified, selected for the University of Tokyo\'s data science programme.',
  'Currently finishing a dual degree (B.Tech CSE + IIT Madras BS Data Science) and building tools that make AI useful for real people.',
];

export const aboutMe = {
  education: [
    {degree: 'B.Tech Computer Science & Engineering', school: 'MJPRU, Bareilly', year: '2021 – 2025'},
    {degree: 'BS in Data Science & Applications', school: 'IIT Madras', year: '2023 – Present'},
  ],
  achievements: [
    'GATE CS 2026 Qualified',
    'Selected for University of Tokyo Data Science Programme',
    'AI/ML Intern at IIT Roorkee — Google Centre for Climate Technology',
    'Web Developer at Saranda House, IIT Madras BS',
  ],
  certifications: [
    'Google Cloud Computing Foundations',
    'IIT Madras — Machine Learning Techniques',
    'IIT Madras — Business Data Management',
  ],
};

export const photos = {
  headshot: `${base}photos/headshot.webp`,
  outdoor: `${base}photos/outdoor.webp`,
};

export const projects = [
  {
    name: 'SmartSearch PDF',
    tagline: 'AI-Grounded PDF Topic Search',
    desc: 'Find every occurrence of a word in any PDF with page, chapter and context — then ask Gemini to explain it.',
    detail: 'Full-stack app that detects chapters from the PDF\'s table of contents with a font-size heading fallback. Calls the LLM only for rows the user shortlists, keeping search instant and API usage low. Built with a React 18 frontend and Flask backend powered by PyMuPDF for PDF parsing.',
    stack: ['Python', 'Flask', 'PyMuPDF', 'React', 'Vite', 'Gemini API'],
    github: 'https://github.com/HIRA04IRSHAD/smartsearch-pdf',
    color: 'var(--sun)',
  },
  {
    name: 'StudyDuel',
    tagline: 'Competitive Study Tracker',
    desc: 'Two-player study tracker for GATE and DSA prep — daily tasks, streaks, head-to-head battles, live Firebase sync.',
    detail: 'Built for two partners preparing for GATE and DSA together: daily task checklists with streaks, subject-wise progress, weekly schedules, an exam countdown and a shared resource library. Uses a 6-character invite code for team pairing, Firebase Realtime Database listeners for live sync, and a Battle view comparing both users\' daily tasks and LeetCode counts with nudge messages.',
    stack: ['React', 'Vite', 'Firebase Auth', 'Firebase Realtime DB', 'React Router'],
    github: 'https://github.com/HIRA04IRSHAD/studyduel',
    live: 'https://studyduel-f6702.web.app',
    color: '#e8412c',
  },
  {
    name: 'ShopAI',
    tagline: 'Smart Shopping Assistant',
    desc: 'Natural-language product search that understands "best gaming laptop under 80k" and ranks results with a deal-score engine.',
    detail: 'Parses category, budget, brand and feature requirements from natural language queries. Ranks results with a custom deal-score engine that factors in discount percentage, user ratings and sentiment analysis. Built with a Flask backend handling NLP processing and a vanilla JavaScript frontend.',
    stack: ['Python', 'Flask', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/HIRA04IRSHAD/ShoppingPro',
    live: 'https://hira04irshad.github.io/ShoppingPro/',
    color: 'var(--disc)',
  },
  {
    name: 'Learner Success Predictor',
    tagline: 'ML & Explainable AI Pipeline',
    desc: 'Predicting MOOC certification outcomes at 98.99% accuracy with XGBoost and SHAP explainability.',
    detail: 'End-to-end ML pipeline on the HarvardX-MITx MOOC dataset using an XGBoost classifier. Integrated SHAP-based explainable AI to surface feature-level attributions (video engagement, forum participation) behind each prediction. Deployed through a Flask REST API with a React.js dashboard for real-time prediction, confidence scoring and risk assessment.',
    stack: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'Flask', 'React'],
    github: 'https://github.com/HIRA04IRSHAD/student-dropout-marks-prediction-model',
    color: '#22c55e',
  },
  {
    name: 'Vehicle Parking App',
    tagline: 'Flask Parking Lot Management',
    desc: 'Admin lots/spots, user booking & release with billing, stats via Matplotlib charts.',
    detail: 'Full-stack parking lot management built for the IIT Madras MAD-1 project. Admin can create and manage lots and spots. Users book, release, and get billed automatically. Includes visual statistics rendered with Matplotlib embedded in the Flask app.',
    stack: ['Python', 'Flask', 'SQLite', 'Jinja2', 'Matplotlib'],
    github: 'https://github.com/HIRA04IRSHAD/vehicle-parking-app',
    color: '#a855f7',
  },
  {
    name: 'Interactive Canvas',
    tagline: 'HTML5 Drawing App',
    desc: 'Brush, eraser, shapes with fill toggle, color picker, and image export on HTML5 Canvas.',
    detail: 'A feature-rich drawing application built with vanilla JavaScript on HTML5 Canvas. Supports free-hand brush, eraser, rectangle/circle shapes with fill toggle, customizable color picker, and export to image. Clean, responsive UI with tool switching.',
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS'],
    github: 'https://github.com/HIRA04IRSHAD/interactive-canvas-app',
    color: '#f97316',
  },
  {
    name: 'GATE DSA Tracker',
    tagline: 'Daily Prep Dashboard',
    desc: 'Track daily DSA practice, GATE subjects, and LeetCode progress with streak counting.',
    detail: 'Personal dashboard for GATE CS and DSA prep tracking. Logs daily practice problems, subject-wise GATE syllabus coverage, and LeetCode progress with streaks and consistency metrics. Firebase backend for persistent data.',
    stack: ['React', 'Firebase', 'JavaScript'],
    github: 'https://github.com/HIRA04IRSHAD/gate-dsa-tracker',
    color: '#06b6d4',
  },
  {
    name: 'Saranda House Website',
    tagline: 'Open Source Contribution',
    desc: 'Added scroll-to-top button, upcoming meetups block, and newsletter route to the IIT Madras BS house website.',
    detail: 'Contributed multiple PRs to the Saranda House (IIT Madras BS) community website: a scroll-to-top floating button, an upcoming-meetups information block, and a newsletter subscription route. Collaborative open-source contribution.',
    stack: ['JavaScript', 'React', 'CSS'],
    github: 'https://github.com/HIRA04IRSHAD/saranda_website_project',
    color: '#ec4899',
  },
];

export const experience = [
  {
    role: 'AI/ML Intern',
    org: 'IIT Roorkee · Google Centre for Climate Technology',
    period: 'Sep – Oct 2026',
    detail: 'BoQ-to-Material-Passport extraction pipeline for AMP-GEN. Processed construction documents using Python, NLP, and structured data extraction to create machine-readable material passports.',
  },
  {
    role: 'Web Developer',
    org: 'Saranda House, IIT Madras BS',
    period: 'Nov 2025 – Present',
    detail: 'Building and maintaining the house website. Contributed scroll-to-top navigation, upcoming-meetups blocks, and newsletter subscription features through multiple pull requests.',
  },
];

export const techStack = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
  'Backend': ['Flask', 'Node.js', 'REST APIs', 'Jinja2'],
  'AI / ML': ['XGBoost', 'Scikit-learn', 'SHAP', 'Gemini API', 'PyMuPDF', 'NLP', 'RAG'],
  'Data': ['SQLite', 'Firebase', 'Pandas', 'Matplotlib', 'NumPy'],
  'Cloud & Tools': ['Google Cloud', 'GitHub Actions', 'Git', 'Docker', 'CI/CD'],
};
