import { useEffect, useRef, useState, type ElementType } from 'react';

interface SplitHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export default function SplitHeading({ text, as: Tag = 'h2', className, style }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={style}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(26px) rotate(6deg)',
            transition: 'opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1)',
            transitionDelay: `${i * 0.04}s`,
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </Tag>
  );
}
