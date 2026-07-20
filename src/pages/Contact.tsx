import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './Contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const submit = () => setSent(true);
  const reset = () => {
    setSent(false);
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="page-overflow-clip">
      <Nav />

      <section className="contact-header">
        <h1>Contact</h1>
        <p>128 Sugar Lane, Rosewood District</p>
        <a href="mailto:hello@lauraandlara.com" className="contact-email">
          hello@lauraandlara.com
        </a>
      </section>

      <section className="contact-form-section">
        {sent ? (
          <div className="contact-sent">
            <div className="contact-sent-title">Yay!</div>
            <h2>Message sent</h2>
            <p>We'll be in touch within one working day.</p>
            <button onClick={reset} className="contact-sent-btn" type="button">
              Send another
            </button>
          </div>
        ) : (
          <div className="contact-form">
            <div className="contact-form-row">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message" rows={6} />
            <button
              onClick={submit}
              className="contact-submit-btn"
              type="button"
              disabled={!name || !email || !msg}
            >
              Submit
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
