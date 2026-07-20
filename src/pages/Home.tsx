import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import SplitHeading from '../components/SplitHeading';
import BuildText from '../components/BuildText';
import cookieImg from '../assets/cookie.png';
import { getProduct } from '../lib/products';
import './Home.css';

const heroCookies = [
  { className: 'home-hero-cookie-1', width: 'clamp(120px, 16vw, 220px)', top: '8%', left: '3%', rotate: -18 },
  { className: 'home-hero-cookie-2', width: 'clamp(104px, 13vw, 180px)', top: '14%', right: '4%', rotate: 14 },
  { className: 'home-hero-cookie-3', width: 'clamp(128px, 17vw, 230px)', bottom: '12%', left: '5%', rotate: 8 },
  { className: 'home-hero-cookie-4', width: 'clamp(96px, 12vw, 165px)', bottom: '18%', right: '6%', rotate: -22 },
  { className: 'home-hero-cookie-5', width: 'clamp(88px, 11vw, 150px)', top: '40%', left: '10%', rotate: 12 },
  { className: 'home-hero-cookie-6', width: 'clamp(92px, 11vw, 155px)', top: '36%', right: '10%', rotate: -10 },
];

function HeroCookies() {
  return (
    <div className="home-hero-cookies" aria-hidden="true">
      {heroCookies.map((cookie) => (
        <img
          key={cookie.className}
          className={`home-hero-cookie ${cookie.className}`}
          src={cookieImg}
          alt=""
          style={{
            width: cookie.width,
            top: cookie.top,
            left: cookie.left,
            right: cookie.right,
            bottom: cookie.bottom,
            ['--cookie-rotate' as string]: `${cookie.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

const favIds = ['strawberry', 'choc-chip', 'croissant'] as const;
const favs = favIds.map((id) => getProduct(id)!);

const faqs = [
  { q: 'How far in advance should I order a custom cake?', a: 'For custom and celebration cakes we recommend at least 5–7 days’ notice so we can source the freshest ingredients and design something special. Wedding cakes, please reach out 4–6 weeks ahead.' },
  { q: 'Do you offer gluten-free or vegan options?', a: 'Yes! We bake a rotating selection of gluten-free and vegan cakes, cookies and pastries every week. Just ask at the counter or note it on your custom order and we’ll take care of you.' },
  { q: 'Can I place an order for pickup or delivery?', a: 'Both. Order online for same-day counter pickup, or choose local delivery at checkout for orders placed 24 hours in advance within the Rosewood District.' },
  { q: 'Are your ingredients locally sourced?', a: 'Whenever possible. We use real butter, seasonal fruit from nearby farms, and never any artificial flavours or preservatives — everything is made from scratch each morning.' },
  { q: 'Do you cater events and parties?', a: 'Absolutely. From birthday dessert tables to office spreads, tell us your headcount and vibe and we’ll build a catering menu that fits. Head to Custom Order to get started.' },
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

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => setOpen(isOpen ? null : i)} type="button">
              <span>{f.q}</span>
              <span className="faq-sign">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-answer" style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="page-overflow-clip">
      <Nav />

      <section id="hero" className="home-hero">
        <HeroCookies />
        <div className="home-hero-inner">
          <BuildText
            as="h1"
            className="home-hero-title"
            startDelay={0.58}
            letterDelay={0.02}
            parts={[
              { text: 'The ' },
              { text: 'sweet', className: 'stroke-outline' },
              { text: ' indulgence that makes diets nervous.' },
            ]}
          />
          <Link className="shop-btn home-shop-btn home-shop-btn-reveal" to="/shop">
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
        <div className="product-cards-grid">
          {favs.map((p) => (
            <div key={p.id} className="product-cards-grid-item">
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

      <Wave bg="#E83F6A" fill="#F5ECDD" />

      <section id="faq" className="home-faq">
        <div className="home-faq-inner">
          <SplitHeading as="h2" text="FAQ" className="home-faq-heading" />
          <Faq />
        </div>
      </section>

      <Wave bg="#F5ECDD" fill="#3a231d" />

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
