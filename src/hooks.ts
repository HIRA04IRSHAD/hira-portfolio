import {useEffect, useLayoutEffect, useRef, useState} from 'react';

/**
 * From md up, sizes the one-line headline (inline-block, nowrap) to span its
 * parent's content box exactly. Below md it keeps its CSS size and wraps.
 * Either way the final size is published on the parent as --mega, which the
 * stage uses to tuck up under the type.
 */
export function useFitHeadline<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const wide = window.matchMedia('(min-width: 768px)');

    const PROBE = 100;
    const fit = () => {
      if (wide.matches) {
        el.style.fontSize = `${PROBE}px`;
        const styles = getComputedStyle(parent);
        const available = parent.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        const natural = el.offsetWidth;
        if (natural > 0) el.style.fontSize = `${(PROBE * available) / natural}px`;
      } else {
        el.style.fontSize = '';
      }
      parent.style.setProperty('--mega', getComputedStyle(el).fontSize);
    };

    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return ref;
}

const THEME_KEY = 'hira-theme';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch {
      /* storage blocked */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#2C2C2C' : '#E8DCC6');
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    } catch {
      /* not persisted */
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

/**
 * 3D tilt effect on the photo disc — follows the cursor with a subtle
 * perspective rotation and a light-source shine.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const tiltX = y * -18;
        const tiltY = x * 18;
        const tiltEl = el.querySelector<HTMLElement>('[data-tilt]');
        const shineEl = el.querySelector<HTMLElement>('[data-shine]');
        if (tiltEl) {
          tiltEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`;
        }
        if (shineEl) {
          const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
          const intensity = Math.min(Math.hypot(x, y) * 1.6, 0.7);
          shineEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${intensity * 0.4}) 0%, transparent 60%)`;
          shineEl.style.opacity = '1';
        }
      });
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => {
      setHovered(false);
      cancelAnimationFrame(raf);
      const tiltEl = el.querySelector<HTMLElement>('[data-tilt]');
      const shineEl = el.querySelector<HTMLElement>('[data-shine]');
      if (tiltEl) tiltEl.style.transform = '';
      if (shineEl) shineEl.style.opacity = '0';
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return {ref, hovered};
}

/** Triggers the 'visible' class on elements with 'fade-up' when they scroll into view. */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.01, rootMargin: '0px 0px 100px 0px'},
    );

    const observe = () => document.querySelectorAll('.fade-up:not(.visible), .fade-left:not(.visible), .fade-right:not(.visible), .scale-in:not(.visible), .blur-in:not(.visible)').forEach((el) => io.observe(el));

    // Initial pass after React render settles
    const timer = setTimeout(observe, 100);

    // Re-observe when new .fade-up elements appear
    const mo = new MutationObserver(observe);
    mo.observe(document.body, {childList: true, subtree: true});

    return () => {
      clearTimeout(timer);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
