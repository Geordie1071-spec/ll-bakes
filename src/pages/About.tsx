import { useEffect, useState } from 'react';
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % values.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (next: number) => {
    setIndex((next + values.length) % values.length);
  };

  return (
    <section
      className="about-carousel-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="about-carousel-track-line" aria-hidden="true" />

      <div className="about-carousel-shell">
        <button type="button" className="about-carousel-arrow about-carousel-arrow-prev" onClick={() => go(index - 1)} aria-label="Previous">
          &larr;
        </button>

        <div className="about-carousel-viewport">
          {values.map((v, i) => (
            <article
              key={v.n}
              className={`about-carousel-slide${i === index ? ' about-carousel-slide-active' : ''}`}
              aria-hidden={i !== index}
            >
              <div className="about-carousel-number">{v.n}</div>
              <div className="about-carousel-pill">&bull; {v.label.toUpperCase()} &bull;</div>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>

        <button type="button" className="about-carousel-arrow about-carousel-arrow-next" onClick={() => go(index + 1)} aria-label="Next">
          &rarr;
        </button>
      </div>

      <div className="about-carousel-dots">
        {values.map((v, i) => (
          <button
            key={v.n}
            type="button"
            className={`about-carousel-dot${i === index ? ' about-carousel-dot-active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Show ${v.label}`}
          />
        ))}
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
