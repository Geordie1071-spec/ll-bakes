import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import './About.css';

const values = [
  { n: '01', title: 'From Scratch', desc: 'Every crumb starts with real butter, real fruit, and zero shortcuts.' },
  { n: '02', title: 'Small Batch', desc: 'We bake little and often so everything reaches you at its freshest.' },
  { n: '03', title: 'Made With Love', desc: 'A mom and her daughter, four hands, and a lot of heart in every single box.' },
];

export default function About() {
  return (
    <div className="page-overflow-clip">
      <Nav />

      <Reveal as="section" className="about-hero">
        <h1>
          A Mom, A Daughter,
          <br />
          <span style={{ color: '#E83F6A' }}>One Oven</span>
        </h1>
        <p>Laura and her daughter Lara bake everything from scratch, in small batches, every single morning — just butter, sugar, and a whole lot of love.</p>
      </Reveal>

      <Reveal as="section" className="about-values">
        <div className="about-values-inner">
          <h2>What We Believe</h2>
          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.n} className="about-value-card">
                <div className="about-value-n">{v.n}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="about-cta">
        <h2>Come Say Hi</h2>
        <p>Pull up a stool, grab a coffee, and let us spoil you with something sweet.</p>
        <div className="about-cta-actions">
          <Link to="/shop" className="about-cta-primary">
            Browse the Shop
          </Link>
          <Link to="/contact" className="about-cta-secondary">
            Get in Touch
          </Link>
        </div>
      </Reveal>

      <Footer />
    </div>
  );
}
