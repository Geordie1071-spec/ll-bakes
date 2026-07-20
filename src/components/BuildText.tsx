import { useEffect, useMemo, useState, type ElementType, type ReactNode } from 'react';
import './BuildText.css';

interface BuildTextPart {
  text: string;
  className?: string;
}

interface BuildTextProps {
  parts: BuildTextPart[];
  as?: ElementType;
  className?: string;
  startDelay?: number;
  letterDelay?: number;
}

export default function BuildText({
  parts,
  as: Tag = 'span',
  className,
  startDelay = 0.55,
  letterDelay = 0.022,
}: BuildTextProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(timer);
  }, []);

  const letters = useMemo(() => {
    let index = 0;
    const nodes: ReactNode[] = [];

    parts.forEach((part, partIdx) => {
      [...part.text].forEach((ch) => {
        const delay = startDelay + index * letterDelay;
        index += 1;
        nodes.push(
          <span
            key={`${partIdx}-${index}`}
            className={`build-char${part.className ? ` ${part.className}` : ''}`}
            style={{ transitionDelay: `${delay}s` }}
            data-ready={ready}
          >
            {ch === ' ' ? '\u00a0' : ch}
          </span>,
        );
      });
    });

    return nodes;
  }, [parts, ready, startDelay, letterDelay]);

  return (
    <Tag className={className}>
      {letters}
    </Tag>
  );
}
