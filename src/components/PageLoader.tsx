import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';

export default function PageLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setVisible(true);
    setKey((k) => k + 1);
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  const colors = ['#3a231d', '#E8823F', '#F5ECDD'];

  return (
    <div className="page-loader" key={key} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ background: colors[i % 3], animationDelay: `${i * 0.09}s` }} />
      ))}
    </div>
  );
}
