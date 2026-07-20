import './Wave.css';

interface WaveProps {
  bg?: string;
  fill?: string;
  className?: string;
}

export default function Wave({ bg = '#F5ECDD', fill = '#3a231d', className = '' }: WaveProps) {
  return (
    <div className={`page-wave ${className}`.trim()} style={{ background: bg }}>
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="page-wave-svg" aria-hidden="true">
        <path
          fill={fill}
          d="M0,60 C160,100 320,20 480,60 C640,100 800,20 960,60 C1120,100 1280,20 1440,60 C1600,100 1760,20 1920,60 C2080,100 2240,20 2400,60 C2560,100 2720,20 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
