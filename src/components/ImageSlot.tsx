interface ImageSlotProps {
  shape?: 'rect' | 'circle';
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageSlot({ shape = 'rect', placeholder = 'Drop an image', className, style }: ImageSlotProps) {
  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        borderRadius: shape === 'circle' ? '50%' : 16,
        background: 'rgba(0,0,0,.04)',
        border: '1.5px dashed rgba(0,0,0,.25)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        textAlign: 'center',
        padding: 12,
        color: 'rgba(35,31,32,.4)',
        ...style,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span style={{ fontFamily: "'Boogaloo', sans-serif", fontSize: 13, letterSpacing: '.5px', textTransform: 'uppercase' }}>{placeholder}</span>
    </div>
  );
}
