import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Letters from './Letters';
import { useCart } from '../lib/CartContext';
import logoImg from '../assets/logo.png';
import './Nav.css';

interface Tab {
  label: string;
  href: string;
  key: string;
}

const TABS: Tab[] = [
  { label: 'Shop', href: '/shop', key: 'shop' },
  { label: 'About', href: '/about', key: 'about' },
  { label: 'Contact', href: '/contact', key: 'contact' },
];

function activeKeyForPath(pathname: string): string {
  if (pathname.startsWith('/shop') || pathname.startsWith('/product')) return 'shop';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  return '';
}

export default function Nav() {
  const { pathname } = useLocation();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || document.documentElement.scrollTop) > 40);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const active = activeKeyForPath(pathname);
  const compact = isMobile || scrolled;

  return (
    <div className="nav-sticky">
    <div className="nav-root">
      {/* FULL NAV */}
      <nav className={`nav-full${compact ? ' nav-hidden' : ''}`}>
        <Link to="/" className="nav-logo-link">
          <img src={logoImg} alt="Laura & Lara" className="nav-logo nav-logo-full" />
        </Link>
        <div style={{ flex: 1 }} />
        <div className="nav-tabs">
          {TABS.map((t) => (
            <Link key={t.key} className="ll-tab" to={t.href} data-on={active === t.key}>
              <span className="ll-tab-text"><Letters text={t.label} className="ltr" /></span>
              <span className="ul" dangerouslySetInnerHTML={{ __html: underlineSvg }} />
            </Link>
          ))}
          <button className="ll-tab" onClick={openCart} type="button">
            <span className="ll-tab-text"><Letters text={`Cart (${count})`} className="ltr" /></span>
            <span className="ul" dangerouslySetInnerHTML={{ __html: underlineSvg }} />
          </button>
        </div>
      </nav>

      {/* COMPACT NAV */}
      <nav className={`nav-compact${compact ? '' : ' nav-hidden'}`}>
        <Link to="/" className="nav-logo-link">
          <img src={logoImg} alt="Laura & Lara" className="nav-logo nav-logo-compact" />
        </Link>
        <div style={{ flex: 1 }} />
        <div className="nav-compact-pill">
          <Link to="/shop" className="ic-btn nav-shop-btn">
            <span>Shop</span>
          </Link>
          <button onClick={openCart} aria-label="Cart" className="ic-btn nav-icon-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && <span className="nav-cart-badge">{count}</span>}
          </button>
          <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="ic-btn nav-icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU */}
      <div className={`nav-menu${menuOpen ? ' nav-menu-open' : ''}`}>
        <div className="nav-menu-top">
          <Link to="/" className="nav-menu-logo" onClick={() => setMenuOpen(false)}>
            <img src={logoImg} alt="Laura & Lara" className="nav-logo nav-logo-menu" />
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close" className="ic-btn nav-menu-close">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M5 5l14 14" />
              <path d="M19 5L5 19" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'min(2vh,14px)' }}>
          {TABS.map((t) => (
            <Link key={t.key} className="mm-link" to={t.href} onClick={() => setMenuOpen(false)}>
              <span className="mm-link-text"><Letters text={t.label} className="mm-ltr" /></span>
            </Link>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ic-btn nav-social">
            <span>Instagram</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="ic-btn nav-social">
            <span>Facebook</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}

const underlineSvg = '<svg viewBox="0 0 120 15" preserveAspectRatio="none" width="100%" height="100%" fill="none"><path d="M3 10 C22 3 36 12 58 7 C80 2 98 12 117 6" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/></svg>';
