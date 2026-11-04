import {useCallback, useEffect, useState} from 'react';
import {aboutMe, bio, experience, nav, person, photos, projects, socials, techStack} from './content';
import {useFitHeadline, useScrollReveal, useTheme, useTilt} from './hooks';

/* ------------------------------------------------------------------ */
/*  Vertical Navbar (right side)                                       */
/* ------------------------------------------------------------------ */

function VerticalNav() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      {threshold: 0.3, rootMargin: '-80px 0px -40% 0px'},
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex">
      {nav.map((n) => (
        <a
          key={n.href}
          href={n.href}
          title={n.label}
          className="group relative flex items-center"
        >
          <span className="absolute right-6 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-page opacity-0 transition-all group-hover:opacity-100 group-hover:right-7">
            {n.label}
          </span>
          <span className={`nav-dot ${active === n.href ? 'active' : ''}`} />
        </a>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function Header({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  return (
    <header className="relative z-40 flex items-center justify-between gap-4 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.4vh,24px)]">
      <a href="#" className="flex items-center gap-2.5 font-cursive text-[17px] font-semibold">
        <span className="relative size-9 overflow-hidden rounded-full bg-disc ring-2 ring-disc/30">
          <img src={photos.headshot} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </span>
        {person.fullName}
      </a>
      <div className="flex items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.icon === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="glass flex size-9 items-center justify-center rounded-full transition-transform hover:scale-110"
            aria-label={s.label}
          >
            {s.icon === 'github' && (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            {s.icon === 'linkedin' && (
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            )}
            {s.icon === 'email' && (
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
            )}
          </a>
        ))}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={dark}
          aria-label="Dark mode"
          className="glass ml-1 flex h-8 w-14 items-center rounded-full p-1 transition-shadow hover:shadow-[0_0_16px_var(--glow)]"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-disc text-white text-[12px] transition-transform duration-300">
            {dark ? (
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            ) : (
              <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
            )}
          </span>
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo disc with 3D tilt                                            */
/* ------------------------------------------------------------------ */

function PhotoDisc() {
  const {ref, hovered} = useTilt<HTMLDivElement>();
  const [swapped, setSwapped] = useState(false);

  return (
    <div ref={ref} className="photo-stage relative mx-auto aspect-square w-full cursor-pointer" onClick={() => setSwapped((s) => !s)}>
      <div className="disc-glow" />
      <div data-tilt className="photo-tilt relative h-full w-full">
        <div className="absolute left-[9%] top-[17%] h-[82%] w-[82%] rounded-full bg-disc shadow-[0_0_80px_var(--glow)]" />
        <img
          src={swapped ? photos.outdoor : photos.headshot}
          alt={`${person.fullName} — full-stack developer`}
          className="relative z-10 h-full w-full object-contain drop-shadow-2xl transition-opacity duration-500"
          draggable={false}
        />
        <div data-shine className="photo-shine z-20" style={{opacity: 0}} />
      </div>
      <p
        className={`hint absolute top-[20%] right-[-2%] rotate-6 font-cursive text-[clamp(17px,1.5vw,22px)] italic md:right-[-8%] z-30 pointer-events-none ${
          hovered ? 'translate-y-2 opacity-0' : ''
        }`}
      >
        hover me
        <svg viewBox="0 0 60 40" className="ml-6 block h-8 w-12 -scale-x-100" fill="none" aria-hidden>
          <path d="M4 4c18 2 34 12 44 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M40 31l8 4 1-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  About Me section (expandable)                                      */
/* ------------------------------------------------------------------ */

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
      <p className="fade-up mx-auto mb-8 max-w-xl text-center text-[14px] leading-relaxed text-mute">
        Click a tab to explore my background
      </p>

      <div className="fade-up glossy-curve mx-auto max-w-3xl p-6 md:p-8">
        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
              className={`rounded-full px-5 py-2.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all ${
                openTab === tab.key
                  ? 'bg-disc text-white shadow-lg shadow-disc/25'
                  : 'glass text-mute hover:text-ink'
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

/* ------------------------------------------------------------------ */
/*  Project card (expandable)                                          */
/* ------------------------------------------------------------------ */

function ProjectCard({project, isOpen, onToggle}: {
  project: (typeof projects)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="project-card glossy-curve p-5 md:p-6"
      onClick={onToggle}
    >
      <div className="card-stripe" style={{background: project.color}} />
      <div className="relative z-10">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full shadow-[0_0_8px]" style={{background: project.color, boxShadow: `0 0 12px ${project.color}`}} />
            <h3 className="font-cursive text-[1.15em] font-bold">{project.name}</h3>
          </div>
          <svg
            className={`size-5 text-mute transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="mb-1 font-sans text-[11px] font-medium uppercase tracking-widest text-mute">{project.tagline}</p>
        <p className="mb-3 text-[13.5px] leading-relaxed text-mute">{project.desc}</p>

        <div className={`detail-panel ${isOpen ? 'open' : ''}`}>
          <div className="detail-inner">
            <div className="mb-4 border-t border-line pt-4">
              <p className="mb-4 text-[13.5px] leading-relaxed" style={{color: 'var(--ink)', opacity: 0.8}}>{project.detail}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-glow inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider text-page transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source Code
                </a>
                {'live' in project && project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="btn-glow inline-flex items-center gap-1.5 rounded-full bg-disc px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-wider text-white transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.182a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V6.56l-5.22 5.22a.75.75 0 11-1.06-1.06l5.22-5.22h-2.19a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(isOpen ? project.stack : project.stack.slice(0, 3)).map((t) => (
            <span key={t} className="rounded-full border border-line bg-field/50 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-mute transition-colors">
              {t}
            </span>
          ))}
          {!isOpen && project.stack.length > 3 && (
            <span className="rounded-full border border-line bg-field/50 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-mute">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience (expandable)                                            */
/* ------------------------------------------------------------------ */

function ExperienceSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[420px] space-y-4">
      <h2 className="font-sans text-micro font-medium uppercase text-mute">Experience</h2>
      {experience.map((exp, i) => (
        <div
          key={exp.role}
          className="glass cursor-pointer space-y-0.5 rounded-2xl p-4 transition-all hover:scale-[1.01]"
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
        >
          <div className="flex items-center justify-between">
            <p className="font-cursive text-[16px] font-bold">{exp.role}</p>
            <svg
              className={`size-4 text-mute transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
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

/* ------------------------------------------------------------------ */
/*  Tech Stack Section                                                 */
/* ------------------------------------------------------------------ */

function TechStackSection() {
  const [openCat, setOpenCat] = useState<string | null>(null);
  const categories = Object.entries(techStack);

  const catColors: Record<string, string> = {
    'Frontend': '#3b82f6',
    'Backend': '#22c55e',
    'AI / ML': '#a855f7',
    'Data': '#f59e0b',
    'Cloud & Tools': '#ec4899',
  };

  return (
    <section id="tech" className="px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
      <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
        Tech <span className="gradient-text italic">Stack</span>
      </h2>
      <p className="fade-up mx-auto mb-8 max-w-xl text-center text-[14px] leading-relaxed text-mute">
        Click a category to see the tools I work with
      </p>

      <div className="stagger mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([cat, techs]) => (
          <div
            key={cat}
            className="fade-up glossy-curve cursor-pointer p-5 transition-all hover:scale-[1.02]"
            onClick={() => setOpenCat(openCat === cat ? null : cat)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{background: catColors[cat] || 'var(--disc)'}} />
                <h3 className="font-cursive text-[16px] font-bold">{cat}</h3>
              </div>
              <span className="font-sans text-[12px] text-mute">{techs.length}</span>
            </div>
            <div className={`section-panel ${openCat === cat ? 'open' : ''}`}>
              <div className="section-inner">
                <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                  {techs.map((t) => (
                    <span
                      key={t}
                      className="tech-chip glass"
                      style={{borderLeft: `3px solid ${catColors[cat] || 'var(--disc)'}`}}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Connect / Contact                                                  */
/* ------------------------------------------------------------------ */

function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section id="contact" className="px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
      <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
        Let's <span className="gradient-text italic">Connect</span>
      </h2>
      <p className="fade-up mx-auto mb-8 max-w-xl text-center text-[14px] leading-relaxed text-mute">
        Open to collaborations, internships, and interesting conversations
      </p>

      <div className="fade-up glossy-curve mx-auto flex max-w-lg flex-wrap items-center justify-center gap-3 p-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.icon === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="glass flex items-center gap-2.5 rounded-full px-5 py-3 font-sans text-[14px] font-medium transition-all hover:scale-[1.04] hover:shadow-lg hover:-translate-y-0.5"
          >
            {s.icon === 'github' && (
              <svg className="size-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            {s.icon === 'linkedin' && (
              <svg className="size-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            )}
            {s.icon === 'email' && (
              <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
            )}
            {s.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyEmail}
          className="btn-glow rounded-full bg-disc px-5 py-3 font-sans text-[14px] font-medium text-white transition-all active:scale-95 hover:-translate-y-0.5"
        >
          {copied ? 'Copied!' : 'Copy Email'}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const [openProject, setOpenProject] = useState<number | null>(null);
  useScrollReveal();

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <VerticalNav />
      <Header dark={dark} onToggle={toggle} />

      {/* Hero */}
      <main className="relative isolate flex flex-1 flex-col px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,56px)] text-center">
        <h1 ref={title} className="headline relative z-0 inline-block text-[21vw] md:whitespace-nowrap">
          <span className="block md:inline">Hey, I'm </span>
          <span className="marker">{person.name}</span>
        </h1>

        <div className="relative grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 text-left md:grid-cols-[1fr_auto_1fr]">
          <div className="stage relative mx-auto aspect-square w-[min(100vw,580px)] md:order-2 md:w-[min(46vw,78svh)]">
            <PhotoDisc />
          </div>

          <div className="relative z-10 max-w-[380px] space-y-3 pb-[clamp(20px,5vh,48px)] text-lede md:order-1">
            {bio.map((b, i) => (
              <p key={i} className={`fade-up ${i === 0 ? 'font-cursive text-[1.35em] font-bold' : 'text-mute'}`}>
                {b}
              </p>
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-7 pb-[clamp(20px,5vh,48px)] md:order-3 md:items-end">
            <div className="fade-up">
              <ExperienceSection />
            </div>
          </div>
        </div>
      </main>

      {/* About Me */}
      <AboutSection />

      {/* Projects */}
      <section id="projects" className="relative z-10 px-[clamp(16px,2.4vw,36px)] py-[clamp(40px,8vh,80px)]">
        <h2 className="fade-up mb-2 text-center font-cursive text-[clamp(28px,3.5vw,48px)] font-bold">
          Featured <span className="gradient-text italic">Projects</span>
        </h2>
        <p className="fade-up mb-10 text-center text-[14px] text-mute">
          Click a card to see the full story and links
        </p>
        <div className="stagger mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.name} className="fade-up">
              <ProjectCard
                project={p}
                isOpen={openProject === i}
                onToggle={() => setOpenProject(openProject === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5 text-center">
        <p className="font-sans text-[13px] text-mute">
          Designed & built by <span className="font-cursive font-semibold text-ink">{person.fullName}</span>
        </p>
      </footer>
    </div>
  );
}
