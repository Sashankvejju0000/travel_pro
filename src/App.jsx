import { useEffect, useState } from 'react';
import {
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  Search,
  Users,
  X,
} from 'lucide-react';

const navItems = [
  ['Destinations', '#destinations'],
  ['Experiences', '#experiences'],
  ['Deals', '#stories'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

const services = [
  ['Flights', 'World-class airlines and flexible routes around the globe.', 'assets/Pj5_p2_ic1.png'],
  ['Hotels', 'Verified hotels and dreamy stays that feel effortless.', 'assets/Pj5_p2_ic2.png'],
  ['Transport', 'Local rides, transfers, and rentals for smooth arrivals.', 'assets/Pj5_p2_ic3.png'],
  ['Activities', 'Curated night tours, skyline views, and local adventures.', 'assets/Pj5_p2_ic4.png'],
];

const destinations = [
  ['Paris, France', '$899', 'assets/paris.png'],
  ['Tokyo, Japan', '$899', 'assets/tokyo.png'],
  ['Bali, Indonesia', '$899', 'assets/bali.png'],
  ['Santorini, Greece', '$899', 'assets/santorini.png'],
  ['Maldives', '$899', 'assets/maldives.png'],
  ['Dubai, UAE', '$899', 'assets/dubai.png'],
];

const stories = [
  ['7 Nights in Iceland - What I Learned', 'Northern lights, hot springs, and quiet midnight roads.', 'Dec 8, 2025', '4 min read', 'assets/Pj5_p6_ic1.png'],
  ['Top 5 Starry Night Destinations', 'Where to find the clearest skies and unforgettable views.', 'Jan 15, 2026', '5 min read', 'assets/Pj5_p6_ic2.png'],
  ['Night Photography Travel Guide', 'Capture glowing streets, stars, and city lights like a pro.', 'Feb 2, 2026', '6 min read', 'assets/Pj5_p6_ic1.png'],
  ['Best City Lights Around The World', 'From neon avenues to romantic river reflections.', 'Mar 9, 2026', '5 min read', 'assets/Pj5_p6_ic2.png'],
];

const faqs = [
  ['How do I book a trip with WanderScape?', 'Choose a destination, date, and guest count in the planner. We will show matched packages and night-friendly experiences.'],
  ['Can I cancel or modify my booking?', 'Yes. Most packages include flexible changes and cancellation options up to 48 hours before departure.'],
  ['Do you offer travel insurance?', 'Yes. You can add travel protection during checkout for medical, delay, and luggage coverage.'],
  ['Is customer support available 24/7?', 'Our support team is available day and night through the app, email, and phone.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="WanderScape home">
          <img src="assets/Pj5_nb_logo.png" alt="" />
          <img className="brand-wordmark" src="assets/Pj5_nb_tt.png" alt="WanderScape" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <a className="book-image-link" href="#planner">
          <img src="assets/Pj5_nb_bk.png" alt="Book now" />
        </a>
        <button className="icon-button menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      <aside className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="icon-button close-button" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#planner" onClick={() => setOpen(false)}>
          <img src="assets/Pj5_nb_bk.png" alt="Book now" />
        </a>
      </aside>
    </>
  );
}

function Planner() {
  const [toast, setToast] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    setToast('Searching glowing travel packages...');
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => setToast(''), 3200);
  }

  return (
    <>
      <form className="planner-card" id="planner" onSubmit={onSubmit}>
        <h2>Plan Your Perfect Trip</h2>
        <label>
          <span><MapPin size={14} /> Destination</span>
          <div className="field">
            <select defaultValue="" required>
              <option value="" disabled>Where to?</option>
              {destinations.map(([name]) => <option key={name}>{name}</option>)}
            </select>
            <ChevronDown size={14} />
          </div>
        </label>
        <label>
          <span><Calendar size={14} /> Check-in / Date</span>
          <div className="field">
            <input type="date" required />
          </div>
        </label>
        <label>
          <span><Users size={14} /> Guests</span>
          <div className="field">
            <select defaultValue="" required>
              <option value="" disabled>How many?</option>
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </label>
        <button className="gradient-button" type="submit">
          <Search size={15} /> Search Now
        </button>
      </form>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function App() {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <main id="top">
      <Header />
      <section className="hero">
        <div className="hero-art" />
        <h1>Discover The World Beyond <span>Daylight</span></h1>
        <Planner />
      </section>

      <section className="services" id="experiences">
        <SectionTitle
          title="One Place To Plan It All"
          subtitle="Experience seamless travel planning with flights, stays, and local experiences."
        />
        <div className="service-grid">
          {services.map(([title, text, icon]) => (
            <article className="service-card" key={title}>
              <img src={icon} alt="" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="destinations" id="destinations">
        <SectionTitle
          title="Destinations That Glow In The Dark"
          subtitle="Discover the most popular places chosen by our community of travelers."
        />
        <div className="destination-grid">
          {destinations.map(([name, price, image]) => (
            <article className="destination-card" key={name}>
              <img src={image} alt={name} />
              <div>
                <h3>{name}</h3>
                <strong>{price}</strong>
                <img className="reviews" src="assets/Pj5_p3_reviews.png" alt="Five star reviews" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="quote">
        <h2>"Every Destination Tells A Story - Every Night Reveals A Memory."</h2>
        <p>Join millions of travelers who have discovered that every trip can be beautiful after dark.</p>
      </section>

      <section className="app-promo">
        <div className="app-copy">
          <h2>Travel On The Go</h2>
          <p>WanderScape app gives you full control of your journey. Book, explore, and discover from anywhere in the world.</p>
          <div className="store-row">
            <img src="assets/Pj5_p5_ic3.png" alt="Get it on Google Play" />
            <img src="assets/Pj5_p5_ic4.png" alt="Download on the App Store" />
          </div>
          <img className="landmarks" src="assets/Pj5_p5_ic2.png" alt="Travel landmarks" />
        </div>
        <img className="phone" src="assets/Pj5_p5_ic1.png" alt="WanderScape mobile app screens" />
      </section>

      <section className="stories" id="stories">
        <SectionTitle
          title="Travel Stories That Inspire"
          subtitle="Discover notes from travelers and local experts around the world."
        />
        <div className="story-grid">
          {stories.map(([title, text, date, read, image]) => (
            <article className="story-card" key={title}>
              <img src={image} alt="" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{date}</span>
                <span>{read}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="faq" id="about">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about WanderScape."
        />
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className={`faq-item ${activeFaq === index ? 'open' : ''}`} key={question}>
              <button onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                {question}
                <Plus size={18} />
              </button>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-panel">
          <h2>Be The First To Catch Travel Deals That Glow</h2>
          <p>Join our exclusive community and discover destinations that shine brighter than the rest.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <Mail size={16} />
            <input type="email" placeholder="Enter your email to join to glow" required />
            <button type="submit">Join Now</button>
          </form>
          <img src="assets/Pj5_p8_bgi.png" alt="" />
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-brand">
          <a className="brand" href="#top">
            <img src="assets/Pj5_nb_logo.png" alt="" />
            <img className="brand-wordmark" src="assets/Pj5_nb_tt.png" alt="WanderScape" />
          </a>
          <p>Your gateway to extraordinary travel experiences that glow in the dark.</p>
        </div>
        <div>
          <h3>Quick Navigation</h3>
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </div>
        <div>
          <h3>Quick Contact</h3>
          <p><Mail size={15} /> info@glowtrotter.com</p>
          <p><Phone size={15} /> +1 (555) 389-4592</p>
          <div className="socials">
            <span>f</span>
            <span>x</span>
            <span>ig</span>
            <span>yt</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
