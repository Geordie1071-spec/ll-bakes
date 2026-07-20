import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import './About.css';

const values = [
  {
    n: '01',
    label: 'Small Batches',
    desc: 'Small runs. No conveyor belts — just slow mixing, constant taste checks, and everything baked little and often so it reaches you at its freshest.',
  },
  {
    n: '02',
    label: 'Real Ingredients',
    desc: 'Real fruit. Fresh butter. No powders. No syrups. No shortcuts. Fruit gets chopped, spices get blended, and every crumb starts from scratch each morning.',
  },
  {
    n: '03',
    label: 'Made With Love',
    desc: 'A mom and her daughter, four hands, and a lot of heart in every single box. You can taste the care in every bite.',
  },
];

function ValuesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const p = scrolled / scrollable;
      const nextIndex = Math.min(values.length - 1, Math.floor(p * values.length));

      setProgress(p);
      setIndex(nextIndex);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToSlide = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollable = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (scrollable * i) / Math.max(values.length - 1, 1);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="about-carousel-scroll"
      style={{ ['--slide-count' as string]: values.length }}
    >
      <div className="about-carousel-sticky">
        <div className="about-carousel-track-line" aria-hidden="true" />

        <div className="about-carousel-progress" aria-hidden="true">
          <div className="about-carousel-progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>

        <div className="about-carousel-shell">
          <div className="about-carousel-viewport">
            {values.map((v, i) => (
              <article
                key={v.n}
                className={`about-carousel-slide${i === index ? ' about-carousel-slide-active' : ''}${i < index ? ' about-carousel-slide-past' : ''}`}
                aria-hidden={i !== index}
              >
                <div className="about-carousel-number">{v.n}</div>
                <div className="about-carousel-pill">&bull; {v.label.toUpperCase()} &bull;</div>
                <p>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-carousel-dots">
          {values.map((v, i) => (
            <button
              key={v.n}
              type="button"
              className={`about-carousel-dot${i === index ? ' about-carousel-dot-active' : ''}`}
              onClick={() => scrollToSlide(i)}
              aria-label={`Scroll to ${v.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="page-overflow-clip">
      <Nav />

      <Reveal as="section" className="about-hero">
        <h1>
          A Mom, A Daughter,
          <br />
          <span className="stroke-outline">One Oven</span>
        </h1>
        <p>Laura and her daughter Lara bake everything from scratch, in small batches, every single morning — just butter, sugar, and a whole lot of love.</p>
      </Reveal>

      <ValuesCarousel />

      <Reveal as="section" className="about-shop-cta">
        <h2>
          <span className="about-shop-heading-outline">Ready</span> for sweets?
        </h2>
        <Link to="/shop" className="about-shop-btn">
          <span>Go to Shop</span>
          <span className="about-shop-btn-arrow">&rarr;</span>
        </Link>
      </Reveal>

      <Footer />
    </div>
  );
}
