import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';

const STRIP_COUNT = 9;
const PEEL_DURATION_MS = 520;
const STRIP_STAGGER_MS = 32;
const FADE_START_MS = PEEL_DURATION_MS + (STRIP_COUNT - 1) * STRIP_STAGGER_MS;
const HIDE_MS = FADE_START_MS + 220;

export default function PageLoader() {
  const { pathname } = useLocation();
  const [key, setKey] = useState(0);
  const [phase, setPhase] = useState<'active' | 'fading' | 'hidden'>('active');

  useEffect(() => {
    setPhase('active');
    setKey((k) => k + 1);

    const fadeTimer = window.setTimeout(() => setPhase('fading'), FADE_START_MS);
    const hideTimer = window.setTimeout(() => setPhase('hidden'), HIDE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (phase === 'hidden') return null;

  const colors = ['#3a231d', '#E8823F', '#F5ECDD'];

  return (
    <div className={`page-loader${phase === 'fading' ? ' page-loader-fading' : ''}`} key={key} aria-hidden="true">
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <div key={i} style={{ background: colors[i % 3], ['--strip-i' as string]: i }} />
      ))}
    </div>
  );
}
