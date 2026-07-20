import { Link } from 'react-router-dom';
import Letters from './Letters';
import logoImg from '../assets/logo.png';
import './Footer.css';

const links = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: '<svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: '<svg viewBox="0 0 24 24" width="46" height="46" fill="currentColor"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.5 2 14.3 2 11.6 2 10 3.6 10 6.4v2.1H7.5V12H10v10h3.5V12h2.6l.4-3.5H14z"/></svg>',
  },
];

const geLogo =
  '<svg width="54" height="39" viewBox="0 0 97 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M96.3335 64.9553L95.9819 11.4843L80.8094 24.9538L80.9852 51.6892L96.3335 64.9553Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M77.6584 49.9992L77.5007 26L69.0406 32.0564L69.1195 44.056L77.6584 49.9992Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M50.1437 69.9319L96.042 66.7156L78.9822 51.8726L60.5043 53.1674L50.1437 69.9319Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M95.3477 9.71416L50.3687 1.18916e-06L62.6296 19.0116L80.7374 22.9224L95.3477 9.71416Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.00192142 64.9553L0.353438 11.4843L15.526 24.9538L15.3502 51.6892L0.00192142 64.9553Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M46.1916 69.9319L0.293277 66.7156L17.3531 51.8726L35.831 53.1674L46.1916 69.9319Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M60.2326 39.2472L47.7292 68.7034L37.3439 52.2225L42.3776 40.364L60.2326 39.2472Z" fill="#fff"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0.987621 9.71416L45.9666 1.18916e-06L33.7057 19.0116L15.5979 22.9224L0.987621 9.71416Z" fill="#fff"/></svg>';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={logoImg} alt="Laura &amp; Lara" className="footer-logo-img" />
        </div>

        <div className="footer-links">
          {links.map((l, i) => (
            <Link key={i} className="ft-tab" to={l.href}>
              <Letters text={l.label} className="ft-ltr" />
            </Link>
          ))}
        </div>

        <div className="footer-socials">
          {socials.map((s) => (
            <a key={s.name} className="ft-soc" href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
              <span className="ft-soc-icon" dangerouslySetInnerHTML={{ __html: s.icon }} />
              <span className="ft-soc-name">{s.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">&copy; {new Date().getFullYear()} Laura &amp; Lara Bakery. All rights reserved.</div>
        <a className="ge-credit" href="#" onClick={(e) => e.preventDefault()}>
          <span style={{ opacity: 0.65 }}>Website by</span>
          <span className="ge-credit-wrap">
            <span className="ge-name">Geordie Ellis</span>
            <span className="ge-logo" dangerouslySetInnerHTML={{ __html: geLogo }} />
          </span>
        </a>
      </div>
    </footer>
  );
}
