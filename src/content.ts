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

export const photos = {
  headshot: '/photos/headshot.webp',
  outdoor: '/photos/outdoor.webp',
};

export const projects = [
  {
    name: 'AMP-GEN',
    desc: 'LLM pipeline that reads scanned PDFs with Gemini, extracts tables into clean records and maps them to an Excel template.',
    stack: ['Python', 'Gemini API', 'Streamlit'],
    href: 'https://github.com/HIRA04IRSHAD',
    color: 'var(--disc)',
  },
  {
    name: 'SmartSearch PDF',
    desc: 'Find every occurrence of a word in any PDF with page, chapter and context — then ask Gemini to explain it.',
    stack: ['Flask', 'React', 'Gemini API'],
    href: 'https://github.com/HIRA04IRSHAD/smartsearch-pdf',
    color: 'var(--sun)',
  },
  {
    name: 'StudyDuel',
    desc: 'Competitive study tracker for two partners: daily tasks, streaks, head-to-head battles, live Firebase sync.',
    stack: ['React', 'Firebase', 'Vite'],
    href: 'https://github.com/HIRA04IRSHAD/studyduel',
    color: '#e8412c',
  },
  {
    name: 'Learner Success',
    desc: 'ML pipeline on HarvardX-MITx data predicting certification outcomes at 99% accuracy with SHAP explainability.',
    stack: ['XGBoost', 'SHAP', 'Flask'],
    href: 'https://github.com/HIRA04IRSHAD',
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
