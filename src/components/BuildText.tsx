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

  const content = useMemo(() => {
    let index = 0;
    const nodes: ReactNode[] = [];

    parts.forEach((part, partIdx) => {
      const words = part.text.split(/(\s+)/);

      words.forEach((segment, segIdx) => {
        if (!segment) return;

        if (/^\s+$/.test(segment)) {
          nodes.push(<span key={`${partIdx}-space-${segIdx}`} className="build-space"> </span>);
          return;
        }

        const letters = [...segment].map((ch) => {
          const delay = startDelay + index * letterDelay;
          index += 1;
          return (
            <span
              key={`${partIdx}-${segIdx}-${index}`}
              className="build-char"
              style={{ transitionDelay: `${delay}s` }}
              data-ready={ready}
            >
              {ch}
            </span>
          );
        });

        nodes.push(
          <span key={`${partIdx}-word-${segIdx}`} className={`build-word${part.className ? ` ${part.className}` : ''}`}>
            {letters}
          </span>,
        );
      });
    });

    return nodes;
  }, [parts, ready, startDelay, letterDelay]);

  return (
    <Tag className={className}>
      {content}
    </Tag>
  );
}
