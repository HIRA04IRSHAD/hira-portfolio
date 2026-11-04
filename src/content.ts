export const person = {
  name: 'Hira',
  fullName: 'Hira Irshad',
  handle: '@HIRA04IRSHAD',
  location: 'India',
  email: 'irshad04hira@gmail.com',
};

export const nav = [
  {label: 'Projects', href: '#projects'},
  {label: 'Resume', href: 'https://github.com/HIRA04IRSHAD'},
];

export const socials = [
  {label: 'GitHub', href: 'https://github.com/HIRA04IRSHAD', icon: 'github'},
  {label: 'LinkedIn', href: 'https://linkedin.com/in/hira04irshad', icon: 'linkedin'},
  {label: 'Email', href: 'mailto:irshad04hira@gmail.com', icon: 'email'},
];

export const bio = [
  'I build AI-powered products.',
  'Full-stack developer shipping with React, Next.js, Flask and LLM APIs — from construction document pipelines at IIT Roorkee to study trackers used across campuses. GATE CS 2026 qualified, selected for the University of Tokyo\'s data science programme.',
  'Currently finishing a dual degree (B.Tech CSE + IIT Madras BS Data Science) and building tools that make AI useful for real people:',
];

const base = import.meta.env.BASE_URL;

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
    desc: 'Natural-language product search that understands queries like "best gaming laptop under 80k" and ranks results with a deal-score engine.',
    detail: 'Parses category, budget, brand and feature requirements from natural language queries. Ranks results with a custom deal-score engine that factors in discount percentage, user ratings and sentiment analysis. Built with a Flask backend handling NLP processing and a vanilla JavaScript frontend.',
    stack: ['Python', 'Flask', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/HIRA04IRSHAD/ShoppingPro',
    live: 'https://hira04irshad.github.io/ShoppingPro/',
    color: 'var(--disc)',
  },
  {
    name: 'Learner Success',
    tagline: 'ML & Explainable AI Pipeline',
    desc: 'Predicting MOOC certification outcomes at 98.99% accuracy with XGBoost and SHAP explainability for non-technical users.',
    detail: 'End-to-end ML pipeline on the HarvardX-MITx MOOC dataset using an XGBoost classifier. Integrated SHAP-based explainable AI to surface feature-level attributions (video engagement, forum participation) behind each prediction. Deployed through a Flask REST API with a React.js dashboard for real-time prediction, confidence scoring and risk assessment.',
    stack: ['Python', 'XGBoost', 'Scikit-learn', 'SHAP', 'Flask', 'React'],
    github: 'https://github.com/HIRA04IRSHAD',
    color: '#22c55e',
  },
];

export const experience = [
  {
    role: 'AI/ML Intern',
    org: 'IIT Roorkee · Google Centre for Climate Technology',
    period: 'Sep – Oct 2026',
  },
  {
    role: 'Web Developer',
    org: 'Saranda House, IIT Madras BS',
    period: 'Nov 2025 – Present',
  },
];

/** Tech stack shown as wordmarks in the footer, each set in a different face. */
export const techStrip = [
  {name: 'React', font: 'font-display font-black tracking-[-0.04em]'},
  {name: 'Next.js', font: 'font-mono tracking-[0.04em]'},
  {name: 'TypeScript', font: 'font-wide tracking-[0.08em]'},
  {name: 'Flask', font: 'font-serif italic'},
  {name: 'Gemini API', font: 'font-display font-medium italic'},
  {name: 'Firebase', font: 'font-serif'},
];
