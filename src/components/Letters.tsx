interface LettersProps {
  text: string;
  className?: string;
}

export default function Letters({ text, className }: LettersProps) {
  return (
    <>
      {[...text.toUpperCase()].map((ch, i) => (
        <span key={i} className={className} style={{ transitionDelay: `${i * 42}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  );
}
