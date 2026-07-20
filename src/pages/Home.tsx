import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SplitHeading from '../components/SplitHeading';
import './Home.css';

const favs = [
  { id: 'strawberry', name: 'Strawberry Dream Cake', sub: 'Best seller', price: 48, cardBg: '#F0568C', placeholder: 'Drop cake photo' },
  { id: 'brown-butter-cookies', name: 'Brown Butter Cookies', sub: 'Box of six', price: 18, cardBg: '#E8823F', placeholder: 'Drop cookie photo' },
  { id: 'almond-croissant', name: 'Almond Croissant', sub: 'Baked at dawn', price: 6, cardBg: '#F4B740', placeholder: 'Drop pastry photo' },
];

const testimonials = [
  { headline: 'Tastes as good as it looks.', quote: 'Finally found a bakery where the cake actually tastes as good as it looks. We’re officially regulars.', name: 'Marissa T.' },
  { headline: 'Best cake in the city.', quote: 'Best strawberry cake in the city, hands down. Light, fresh, and never too sweet.', name: 'Deshawn R.' },
  { headline: 'Exactly how we dreamed it.', quote: 'They designed our wedding cake exactly how we dreamed it. Absolute magic from start to finish.', name: 'Priya & Sam' },
  { headline: 'Gone before I get home.', quote: 'The cookie boxes are dangerous. Chewy, buttery, gone before I get home. Ordering again already.', name: 'Leo M.' },
  { headline: 'Love in every single bite.', quote: 'Every pastry tastes handmade because it is. You can feel the love in every single bite.', name: 'Hana K.' },
];
const reviewsLoop = [...testimonials, ...testimonials];

function ReviewsCarousel() {
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dz = dragRef.current;
    if (!dz) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let scroll = 0;
    let hover = false;
    const half = () => dz.scrollWidth / 2;

    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      startX = e.clientX;
      scroll = dz.scrollLeft;
      dz.setPointerCapture(e.pointerId);
      dz.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      dz.scrollLeft = scroll - dx;
    };
    const onUp = () => {
      down = false;
      dz.style.cursor = 'grab';
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) e.preventDefault();
    };
    dz.addEventListener('pointerdown', onDown);
    dz.addEventListener('pointermove', onMove);
    dz.addEventListener('pointerup', onUp);
    dz.addEventListener('pointercancel', onUp);
    dz.addEventListener('pointerenter', () => (hover = true));
    dz.addEventListener('pointerleave', () => {
      hover = false;
      onUp();
    });
    dz.addEventListener('click', onClickCapture, true);

    let raf = 0;
    const step = () => {
      if (!down && !hover) {
        dz.scrollLeft += 0.5;
        if (dz.scrollLeft >= half()) dz.scrollLeft -= half();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      dz.removeEventListener('pointerdown', onDown);
      dz.removeEventListener('pointermove', onMove);
      dz.removeEventListener('pointerup', onUp);
      dz.removeEventListener('pointercancel', onUp);
      dz.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return (
    <div ref={dragRef} className="reviews-drag no-scrollbar" data-lenis-prevent>
      <div className="reviews-track">
        {reviewsLoop.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-card-head">
              <span className="review-dot" />
              <span>{r.name}</span>
              <span className="review-dot" />
            </div>
            <div className="review-card-body">
              <div className="review-quote-mark">&ldquo;</div>
              <h3>{r.headline}</h3>
              <p>{r.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-overflow-clip">
      <Nav />

      <section id="hero" className="home-hero">
        <div className="home-hero-inner">
          <h1>
            The <span className="stroke-outline">sweet</span> indulgence that makes diets nervous.
          </h1>
          <Link className="shop-btn home-shop-btn" to="/shop">
            Shop Now{' '}
            <span className="arr">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <div style={{ height: 26, background: '#F5ECDD' }} />

      <section id="favourites" className="home-favourites">
        <div className="home-favourites-grid">
          {favs.map((p) => (
            <div key={p.id} className="home-fav-item">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>

      <Wave bg="#F5ECDD" fill="#E83F6A" />

      <section id="testimonials" className="home-testimonials">
        <div className="home-testimonials-head">
          <SplitHeading as="h2" text="Reviews" className="home-reviews-heading" />
        </div>
        <ReviewsCarousel />
      </section>

      <Wave bg="#E83F6A" fill="#3a231d" />

      <Footer />
    </div>
  );
}

function Wave({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div className="home-wave" style={{ background: bg }}>
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="home-wave-svg">
        <path
          fill={fill}
          d="M0,60 C160,100 320,20 480,60 C640,100 800,20 960,60 C1120,100 1280,20 1440,60 C1600,100 1760,20 1920,60 C2080,100 2240,20 2400,60 C2560,100 2720,20 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
