import {useCallback, useEffect, useRef, useState} from 'react';
import {aboutDescription, aboutMe, experience, flipBio, heroTagline, nav, person, photos, projects, socials, techStack} from './content';
import {useFitHeadline, useScrollReveal, useTheme, useTilt} from './hooks';

/* ================================================================== */
/*  SVG Icons                                                          */
/* ================================================================== */

const GithubIcon = ({className = 'size-4'}: {className?: string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedInIcon = ({className = 'size-4'}: {className?: string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const EmailIcon = ({className = 'size-4'}: {className?: string}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" />
  </svg>
);
const ChevronDown = ({className = 'size-5'}: {className?: string}) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);
const ExternalIcon = ({className = 'size-3.5'}: {className?: string}) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.19a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);
const SocialIcon = ({icon, className}: {icon: string; className?: string}) => {
  if (icon === 'github') return <GithubIcon className={className} />;
  if (icon === 'linkedin') return <LinkedInIcon className={className} />;
  return <EmailIcon className={className} />;
};

/* ================================================================== */
/*  Glossy Sticky Navbar                                               */
/* ================================================================== */

function StickyNav({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive('#' + e.target.id); });
      },
      {threshold: 0.2, rootMargin: '-80px 0px -40% 0px'},
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-cursive text-[17px] font-semibold">
          <span className="relative size-8 overflow-hidden rounded-full bg-disc ring-2 ring-disc/30">
            <img src={photos.headshot} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </span>
          <span className="hidden sm:inline">{person.fullName}</span>
        </a>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`btn-glossy rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider ${
                active === n.href ? 'text-disc' : 'text-mute hover:text-ink'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Right: resume + socials + theme */}
        <div className="flex items-center gap-2">
          <a
            href={person.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glossy-filled hidden rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider sm:inline-flex"
          >
            Resume
          </a>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.icon === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="btn-glossy hidden size-8 items-center justify-center rounded-full md:flex"
              aria-label={s.label}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
          <button
            type="button"
            onClick={onToggle}
            aria-pressed={dark}
            aria-label="Dark mode"
            className="btn-glossy flex size-8 items-center justify-center rounded-full text-[14px]"
          >
            {dark ? (
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            ) : (
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ================================================================== */
/*  Flip-card Photo                                                    */
/* ================================================================== */

function FlipPhoto() {
  const {ref} = useTilt<HTMLDivElement>();
  const [flipped, setFlipped] = useState(false);

  return (
    <div ref={ref} className="photo-stage relative mx-auto w-full max-w-[400px]">
      <div className="disc-glow" />
      <div
        className={`flip-container aspect-square ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="flip-card">
          {/* Front: headshot */}
          <div className="flip-front">
            <div className="absolute inset-0 rounded-full bg-disc shadow-[0_0_80px_var(--glow)]" />
            <img
              src={photos.headshot}
              alt={person.fullName}
              className="relative z-10 h-full w-full rounded-full object-cover drop-shadow-2xl"
              draggable={false}
            />
          </div>
          {/* Back: bio text */}
          <div className="flip-back glossy-curve !rounded-full">
            <div className="relative z-10 space-y-2">
              <p className="font-cursive text-[clamp(16px,1.8vw,22px)] font-bold leading-snug">{heroTagline}</p>
              {flipBio.map((line, i) => (
                <p key={i} className="text-[clamp(11px,1.1vw,13px)] leading-relaxed text-mute">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className={`hint absolute bottom-[-8%] left-1/2 -translate-x-1/2 font-cursive text-[14px] italic text-mute transition-opacity ${flipped ? 'opacity-0' : ''}`}>
        click to flip
      </p>
    </div>
  );
}

/* ================================================================== */
/*  About Me                                                           */
/* ================================================================== */

function AboutSection() {
  const [openTab, setOpenTab] = useState<string | null>('education');
  const tabs = [
    {key: 'education', label: 'Education'},
    {key: 'achievements', label: 'Achievements'},
    {key: 'certifications', label: 'Certifications'},
  ];

  return (
    <section id="about" className="px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
      <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
        About <span className="gradient-text italic">Me</span>
      </h2>

      {/* Description paragraph first */}
      <div className="fade-up mx-auto mb-8 max-w-2xl space-y-3 text-center">
        {aboutDescription.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-mute">{p}</p>
        ))}
      </div>

      <div className="fade-up glossy-curve mx-auto max-w-3xl p-6 md:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
              className={`rounded-full px-5 py-2.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all ${
                openTab === tab.key ? 'btn-glossy-filled' : 'btn-glossy text-mute hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Education */}
        <div className={`section-panel ${openTab === 'education' ? 'open' : ''}`}>
          <div className="section-inner">
            <div className="space-y-4 pb-2">
              {aboutMe.education.map((edu) => (
                <div key={edu.degree} className="glass rounded-2xl p-4 transition-transform hover:scale-[1.01]">
                  <p className="font-cursive text-[17px] font-semibold">{edu.degree}</p>
                  <p className="text-[14px] text-mute">{edu.school}</p>
                  <p className="font-sans text-[12px] font-medium uppercase tracking-wider text-disc">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className={`section-panel ${openTab === 'achievements' ? 'open' : ''}`}>
          <div className="section-inner">
            <div className="space-y-3 pb-2">
              {aboutMe.achievements.map((a) => (
                <div key={a} className="glass flex items-start gap-3 rounded-2xl p-4 transition-transform hover:scale-[1.01]">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-sun/20 text-sun text-[12px]">
                    <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </span>
                  <p className="text-[15px]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={`section-panel ${openTab === 'certifications' ? 'open' : ''}`}>
          <div className="section-inner">
            <div className="space-y-3 pb-2">
              {aboutMe.certifications.map((c) => (
                <div key={c} className="glass flex items-start gap-3 rounded-2xl p-4 transition-transform hover:scale-[1.01]">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-disc/20 text-disc text-[12px]">
                    <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  </span>
                  <p className="text-[15px]">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Project Card                                                       */
/* ================================================================== */

function ProjectCard({project, isOpen, onToggle}: {
  project: (typeof projects)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="project-card glossy-curve p-5 md:p-6" onClick={onToggle}>
      <div className="card-stripe" style={{background: project.color}} />
      <div className="relative z-10">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full" style={{background: project.color, boxShadow: `0 0 12px ${project.color}`}} />
            <h3 className="font-cursive text-[1.15em] font-bold">{project.name}</h3>
          </div>
          <ChevronDown className={`size-5 text-mute transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        <p className="mb-1 font-sans text-[11px] font-medium uppercase tracking-widest text-mute">{project.tagline}</p>
        <p className="mb-3 text-[13.5px] leading-relaxed text-mute">{project.desc}</p>

        <div className={`detail-panel ${isOpen ? 'open' : ''}`}>
          <div className="detail-inner">
            <div className="mb-4 border-t border-line pt-4">
              <p className="mb-4 text-[13.5px] leading-relaxed" style={{color: 'var(--ink)', opacity: 0.8}}>{project.detail}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="btn-glossy inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider">
                  <GithubIcon className="size-3.5" /> Source Code
                </a>
                {'live' in project && project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    className="btn-glossy-filled inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider">
                    <ExternalIcon /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(isOpen ? project.stack : project.stack.slice(0, 3)).map((t) => (
            <span key={t} className="rounded-full border border-line bg-field/50 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-mute">{t}</span>
          ))}
          {!isOpen && project.stack.length > 3 && (
            <span className="rounded-full border border-line bg-field/50 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-mute">+{project.stack.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Experience (expandable)                                            */
/* ================================================================== */

function ExperienceSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="w-full space-y-4">
      <h2 className="font-sans text-micro font-medium uppercase text-mute">Experience</h2>
      {experience.map((exp, i) => (
        <div key={exp.role} className="glass cursor-pointer rounded-2xl p-4 transition-all hover:scale-[1.01]"
          onClick={() => setOpenIdx(openIdx === i ? null : i)}>
          <div className="flex items-center justify-between">
            <p className="font-cursive text-[16px] font-bold">{exp.role}</p>
            <ChevronDown className={`size-4 text-mute transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
          </div>
          <p className="text-[13px] text-mute">{exp.org}</p>
          <p className="font-sans text-[12px] font-medium uppercase tracking-wider text-disc">{exp.period}</p>
          <div className={`section-panel ${openIdx === i ? 'open' : ''}`}>
            <div className="section-inner">
              <p className="mt-2 border-t border-line pt-3 text-[13px] leading-relaxed text-mute">{exp.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Tech Stack — side drawer                                           */
/* ================================================================== */

function TechStackSection() {
  const [drawerCat, setDrawerCat] = useState<string | null>(null);
  const categories = Object.entries(techStack);
  const catColors: Record<string, string> = {
    'Languages': '#722F37',
    'Frontend': '#3b82f6',
    'Backend': '#9CAF88',
    'AI / ML': '#CC7722',
    'Databases': '#a855f7',
    'Cloud & DevOps': '#ec4899',
    'Tools': '#8B6F5E',
  };

  return (
    <section id="tech" className="px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
      <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
        Tech <span className="gradient-text italic">Stack</span>
      </h2>
      <p className="fade-up mx-auto mb-8 max-w-xl text-center text-[14px] leading-relaxed text-mute">
        Click a category to see the tools I work with
      </p>

      <div className="stagger mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map(([cat, techs]) => (
          <div key={cat} className="fade-up glossy-curve cursor-pointer p-5 transition-all hover:scale-[1.03]"
            onClick={() => setDrawerCat(cat)}>
            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
              <span className="size-3 rounded-full" style={{background: catColors[cat] || 'var(--disc)'}} />
              <h3 className="font-cursive text-[15px] font-bold">{cat}</h3>
              <span className="font-sans text-[12px] text-mute">{techs.length} tools</span>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className={`drawer-overlay ${drawerCat ? 'open' : ''}`} onClick={() => setDrawerCat(null)} />

      {/* Side drawer */}
      <div className={`side-drawer ${drawerCat ? 'open' : ''}`}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-page/90 px-6 py-4 backdrop-blur">
          <h3 className="font-cursive text-[20px] font-bold">{drawerCat}</h3>
          <button type="button" onClick={() => setDrawerCat(null)}
            className="btn-glossy flex size-8 items-center justify-center rounded-full text-[18px]">
            &times;
          </button>
        </div>
        <div className="space-y-2 p-6">
          {drawerCat && techStack[drawerCat]?.map((t) => (
            <div key={t} className="glass flex items-center gap-3 rounded-2xl p-4 transition-transform hover:scale-[1.01]"
              style={{borderLeft: `3px solid ${catColors[drawerCat] || 'var(--disc)'}`}}>
              <span className="font-sans text-[15px] font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Contact Section with form                                          */
/* ================================================================== */

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const msg = data.get('message') as string;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${msg}`);
    window.open(`mailto:${person.email}?subject=${subject}&body=${body}`, '_self');
    setFormStatus('sent');
    form.reset();
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
      <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
        Let's <span className="gradient-text italic">Connect</span>
      </h2>
      <p className="fade-up mx-auto mb-8 max-w-xl text-center text-[14px] leading-relaxed text-mute">
        Open to collaborations, internships, freelance projects, and interesting conversations
      </p>

      <div className="fade-up mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Social links + resume */}
        <div className="glossy-curve p-6 md:p-8">
          <h3 className="mb-4 font-cursive text-[18px] font-bold">Get in Touch</h3>
          <div className="space-y-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target={s.icon === 'email' ? undefined : '_blank'} rel="noopener noreferrer"
                className="btn-glossy flex items-center gap-3 rounded-2xl px-5 py-3.5 font-sans text-[14px] font-medium">
                <SocialIcon icon={s.icon} className="size-5" />
                {s.label}
              </a>
            ))}
            <button type="button" onClick={copyEmail}
              className="btn-glossy flex w-full items-center gap-3 rounded-2xl px-5 py-3.5 font-sans text-[14px] font-medium">
              <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" /><path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
            <a href={person.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="btn-glossy-filled flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-sans text-[14px] font-semibold uppercase tracking-wider">
              <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* Contact form */}
        <div className="glossy-curve p-6 md:p-8">
          <h3 className="mb-4 font-cursive text-[18px] font-bold">Send a Message</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block font-sans text-[12px] font-semibold uppercase tracking-wider text-mute">Name</label>
              <input name="name" required placeholder="Your name"
                className="glass w-full rounded-xl px-4 py-3 font-sans text-[14px] outline-none placeholder:text-mute/50 focus:ring-2 focus:ring-disc/30" />
            </div>
            <div>
              <label className="mb-1 block font-sans text-[12px] font-semibold uppercase tracking-wider text-mute">Email</label>
              <input name="email" type="email" required placeholder="your@email.com"
                className="glass w-full rounded-xl px-4 py-3 font-sans text-[14px] outline-none placeholder:text-mute/50 focus:ring-2 focus:ring-disc/30" />
            </div>
            <div>
              <label className="mb-1 block font-sans text-[12px] font-semibold uppercase tracking-wider text-mute">Message</label>
              <textarea name="message" required rows={4} placeholder="Tell me about your project..."
                className="glass w-full resize-none rounded-xl px-4 py-3 font-sans text-[14px] outline-none placeholder:text-mute/50 focus:ring-2 focus:ring-disc/30" />
            </div>
            <button type="submit"
              className="btn-glossy-filled w-full rounded-xl px-5 py-3 font-sans text-[14px] font-semibold uppercase tracking-wider">
              {formStatus === 'sent' ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Freelancing CTA                                                    */
/* ================================================================== */

function FreelanceCTA() {
  return (
    <section className="px-[clamp(16px,2.4vw,36px)] pb-[clamp(40px,8vh,80px)]">
      <div className="fade-up glossy-curve mx-auto max-w-3xl p-8 text-center md:p-12">
        <h2 className="mb-3 font-cursive text-[clamp(24px,3vw,36px)] font-bold">
          Open for <span className="gradient-text italic">Freelancing</span>
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-[15px] leading-relaxed text-mute">
          Need a full-stack developer for your next project? I build web apps, AI integrations, dashboards, and more.
          Let's turn your idea into reality.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:irshad04hira@gmail.com?subject=Freelance%20Inquiry"
            className="btn-glossy-filled rounded-full px-8 py-3 font-sans text-[14px] font-semibold uppercase tracking-wider">
            Hire Me
          </a>
          <a href="#contact"
            className="btn-glossy rounded-full px-8 py-3 font-sans text-[14px] font-semibold uppercase tracking-wider">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  App                                                                */
/* ================================================================== */

export default function App() {
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const [openProject, setOpenProject] = useState<number | null>(null);
  useScrollReveal();

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <StickyNav dark={dark} onToggle={toggle} />

      {/* Spacer for fixed nav */}
      <div className="h-14" />

      {/* Hero */}
      <main className="relative isolate flex flex-1 flex-col px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,56px)] text-center">
        <h1 ref={title} className="headline relative z-0 inline-block text-[21vw] md:whitespace-nowrap">
          <span className="block md:inline">Hey, I'm </span>
          <span className="marker">{person.name}</span>
        </h1>

        {/* Image LEFT, Experience RIGHT */}
        <div className="relative grid flex-1 grid-cols-1 items-center gap-x-10 gap-y-8 text-left md:grid-cols-[1fr_1fr] lg:grid-cols-[auto_1fr]">
          {/* Left: Flip photo */}
          <div className="stage relative mx-auto w-[min(80vw,400px)] md:order-1">
            <FlipPhoto />
          </div>

          {/* Right: Experience */}
          <div className="relative z-10 flex flex-col gap-6 pb-[clamp(20px,5vh,48px)] md:order-2">
            <div className="fade-up">
              <ExperienceSection />
            </div>
          </div>
        </div>
      </main>

      <AboutSection />

      {/* Projects */}
      <section id="projects" className="relative z-10 px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
        <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
          Featured <span className="gradient-text italic">Projects</span>
        </h2>
        <p className="fade-up mb-10 text-center text-[14px] text-mute">Click a card to see the full story and links</p>
        <div className="stagger mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.name} className="fade-up">
              <ProjectCard project={p} isOpen={openProject === i} onToggle={() => setOpenProject(openProject === i ? null : i)} />
            </div>
          ))}
        </div>
      </section>

      <TechStackSection />
      <ContactSection />
      <FreelanceCTA />

      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5 text-center">
        <p className="font-sans text-[13px] text-mute">
          Designed & built by <span className="font-cursive font-semibold text-ink">{person.fullName}</span>
        </p>
      </footer>
    </div>
  );
}
