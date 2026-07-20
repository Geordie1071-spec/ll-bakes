import { useCallback } from 'react';
import flourImg from '../assets/shop-flour.png';
import sugarImg from '../assets/shop-sugar.png';
import chocolateImg from '../assets/shop-chocolate.png';
import './ShopHeaderDecor.css';

interface DecorItem {
  className: string;
  src: string;
  width: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
}

const decorItems: DecorItem[] = [
  {
    className: 'shop-decor-flour',
    src: flourImg,
    width: 'clamp(120px, 16vw, 220px)',
    top: '8%',
    left: '4%',
    rotate: -14,
  },
  {
    className: 'shop-decor-sugar',
    src: sugarImg,
    width: 'clamp(110px, 14vw, 200px)',
    top: '12%',
    right: '5%',
    rotate: 10,
  },
  {
    className: 'shop-decor-chocolate',
    src: chocolateImg,
    width: 'clamp(130px, 17vw, 240px)',
    bottom: '6%',
    left: '8%',
    rotate: -8,
  },
];

export default function ShopHeaderDecor() {
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--hover-x', `${x * 18}px`);
    el.style.setProperty('--hover-y', `${y * 18}px`);
    el.dataset.hovered = 'true';
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--hover-x', '0px');
    el.style.setProperty('--hover-y', '0px');
    el.dataset.hovered = 'false';
  }, []);

  return (
    <div className="shop-header-decor" aria-hidden="true">
      {decorItems.map((item) => (
        <div
          key={item.className}
          className={`shop-decor-item ${item.className}`}
          style={{
            width: item.width,
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            ['--decor-rotate' as string]: `${item.rotate}deg`,
          }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div className="shop-decor-float">
            <img src={item.src} alt="" draggable={false} />
          </div>
        </div>
      ))}
    </div>
  );
}
