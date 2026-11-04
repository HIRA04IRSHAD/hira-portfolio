import {useCallback, useState} from 'react';
import {bio, experience, nav, person, photos, projects, socials, techStrip} from './content';
import {useFitHeadline, useTheme, useTilt} from './hooks';

function Header({dark, onToggle}: {dark: boolean; onToggle: () => void}) {
  return (
    <header className="relative z-40 flex items-center justify-between gap-4 px-[clamp(16px,2.4vw,36px)] pt-[clamp(14px,2.4vh,24px)]">
      <a href="#" className="flex items-center gap-2.5 font-display text-[15px] font-bold tracking-[-0.01em]">
        <span className="relative size-8 overflow-hidden rounded-full bg-disc">
          <img src={photos.headshot} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </span>
        {person.handle}
      </a>
      <nav aria-label="Main" className="flex items-center gap-1.5">
        {nav.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            className={`rounded-full px-3.5 py-2 text-ui font-semibold uppercase transition-colors ${
              i === 0 ? 'bg-ink text-page' : 'hover:bg-line'
            }`}
          >
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={dark}
          aria-label="Dark mode"
          className="ml-2 flex h-7 w-12 items-center rounded-full bg-sun p-1"
        >
          <span
            className={`size-5 rounded-full bg-ink transition-transform duration-300 ${dark ? 'translate-x-5' : ''}`}
          />
        </button>
      </nav>
    </header>
  );
}

function PhotoDisc() {
  const {ref, hovered} = useTilt<HTMLDivElement>();
  const [swapped, setSwapped] = useState(false);

  return (
    <div ref={ref} className="photo-stage relative mx-auto aspect-square w-full cursor-pointer" onClick={() => setSwapped((s) => !s)}>
      <div data-tilt className="photo-tilt relative h-full w-full">
        {/* Cobalt disc behind the photo */}
        <div className="absolute left-[9%] top-[17%] h-[82%] w-[82%] rounded-full bg-disc" />
        {/* Photo — positioned to break out over the top of the disc */}
        <img
          src={swapped ? photos.outdoor : photos.headshot}
          alt={`${person.fullName} — full-stack developer`}
          className="relative z-10 h-full w-full object-contain drop-shadow-lg transition-opacity duration-300"
          draggable={false}
        />
        {/* Shine overlay on hover */}
        <div
          data-shine
          className="photo-shine z-20"
          style={{opacity: 0}}
        />
      </div>
      {/* Hint arrow */}
      <p
        className={`hint absolute top-[20%] right-[-2%] rotate-6 font-serif text-[clamp(17px,1.5vw,22px)] italic md:right-[-8%] z-30 pointer-events-none ${
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

function ProjectCard({project}: {project: (typeof projects)[0]}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block rounded-2xl border border-line bg-field p-5 md:p-6"
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className="size-2.5 rounded-full"
          style={{background: project.color}}
        />
        <h3 className="font-display text-[1.1em] font-bold tracking-[-0.01em]">{project.name}</h3>
      </div>
      <p className="mb-4 text-[13.5px] leading-relaxed text-mute">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-mute">
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

function ExperienceSection() {
  return (
    <div className="w-full max-w-[380px] space-y-4">
      <h2 className="text-micro font-medium uppercase text-mute">Experience</h2>
      {experience.map((exp) => (
        <div key={exp.role} className="space-y-0.5">
          <p className="font-display text-[15px] font-bold tracking-[-0.01em]">{exp.role}</p>
          <p className="text-[13px] text-mute">{exp.org}</p>
          <p className="text-[12px] font-medium uppercase tracking-wider text-mute">{exp.period}</p>
        </div>
      ))}
    </div>
  );
}

function ConnectSection() {
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="w-full max-w-[380px]">
      <h2 className="mb-3 text-micro font-medium uppercase text-mute">Connect</h2>
      <div className="flex flex-wrap gap-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.icon === 'email' ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-line bg-field px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-ink hover:text-page"
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
            {s.label}
          </a>
        ))}
        <button
          type="button"
          onClick={copyEmail}
          className="rounded-full border border-line bg-disc px-4 py-2.5 text-[13px] font-medium text-white transition-transform active:scale-95"
        >
          {copied ? '✓ Copied!' : 'Copy Email →'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, toggle] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();

  return (
    <div className="flex min-h-[100svh] flex-col bg-page text-ink">
      <Header dark={dark} onToggle={toggle} />

      <main className="relative isolate flex flex-1 flex-col px-[clamp(16px,2.4vw,36px)] pt-[clamp(20px,5vh,56px)] text-center">
        <h1 ref={title} className="headline relative z-0 inline-block text-[21vw] md:whitespace-nowrap">
          <span className="block md:inline">Hey, I'm </span>
          <span className="marker">{person.name}</span>
        </h1>

        {/* Hero section — bio / photo / experience */}
        <div className="relative grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 text-left md:grid-cols-[1fr_auto_1fr]">
          <div className="stage relative mx-auto aspect-square w-[min(100vw,580px)] md:order-2 md:w-[min(46vw,78svh)]">
            <PhotoDisc />
          </div>

          <div className="relative z-10 max-w-[380px] space-y-3 pb-[clamp(20px,5vh,48px)] text-lede md:order-1">
            {bio.map((b, i) => (
              <p key={i} className={i === 0 ? 'font-display text-[1.25em] font-bold tracking-[-0.015em]' : 'text-mute'}>
                {b}
              </p>
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-7 pb-[clamp(20px,5vh,48px)] md:order-3 md:items-end">
            <ExperienceSection />
            <ConnectSection />
          </div>
        </div>
      </main>

      {/* Projects section */}
      <section id="projects" className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-[clamp(32px,6vh,64px)]">
        <h2 className="mb-8 text-center font-display text-[clamp(28px,3vw,42px)] font-black tracking-[-0.03em] uppercase">
          Featured <span className="marker">Projects</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </section>

      {/* Tech strip footer */}
      <footer className="relative z-10 border-t border-line px-[clamp(16px,2.4vw,36px)] py-5">
        <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-mute">
          <li className="text-micro font-medium uppercase">Built with</li>
          {techStrip.map((t) => (
            <li key={t.name} className={`text-wordmark ${t.font}`}>
              {t.name}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
