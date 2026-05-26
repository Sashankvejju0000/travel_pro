import { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Plus,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CheckCircle,
  Info
} from 'lucide-react';

const services = [
  { title: 'Flight', description: 'Real-time flight tracking and best price guarantees', icon: 'Pj5_p2_ic1.png' },
  { title: 'Hotels', description: 'Verified accommodations with instant booking', icon: 'Pj5_p2_ic2.png' },
  { title: 'Transport', description: 'Local transport and car rentals made easy', icon: 'Pj5_p2_ic3.png' },
  { title: 'Activities', description: 'Curated experiences and local adventures', icon: 'Pj5_p2_ic4.png' }
];

const destinations = [
  { id: 'paris', title: 'Paris, France', image: '/assets/paris.png', category: 'europe' },
  { id: 'tokyo', title: 'Tokyo, Japan', image: '/assets/tokyo.png', category: 'asia' },
  { id: 'bali', title: 'Bali, Indonesia', image: '/assets/bali.png', category: 'asia' },
  { id: 'santorini', title: 'Santorini, Greece', image: '/assets/santorini.png', category: 'europe' },
  { id: 'maldives', title: 'Maldives', image: '/assets/maldives.png', category: 'exotic' },
  { id: 'dubai', title: 'Dubai, UAE', image: '/assets/dubai.png', category: 'exotic' }
];

const blogs = [
  {
    title: '7 Nights in Iceland – What I Learned',
    excerpt: 'Northern lights, hot springs, and life-changing moments under the Arctic sky...',
    image: '/assets/Pj5_p6_ic1.png',
    alt: 'Singapore Night Safari adventure'
  },
  {
    title: 'Top 5 Starry Night Destinations',
    excerpt: 'Where to find the clearest skies and most breathtaking celestial views...',
    image: '/assets/Pj5_p6_ic2.png',
    alt: 'Chasing Northern Lights in Norway'
  },
  {
    title: 'Night Photography Travel Guide',
    excerpt: 'Capture the magic of nighttime destinations with these pro and tips...',
    image: '/assets/Pj5_p6_ic1.png',
    alt: 'Marrakech night marketplace'
  },
  {
    title: 'Best City Lights Around the World',
    excerpt: 'From Tokyo\'s neon glow to Paris\'s romantic illumination and locations...',
    image: '/assets/Pj5_p6_ic1.png',
    alt: 'Stargazing at Atacama Desert'
  }
];

const faqs = [
  {
    question: 'How do I book a trip with WanderScape?',
    answer: 'Yes, all our night-focused itineraries are meticulously planned in collaboration with local authorities and certified expert guides to ensure 100% safety and security. We maintain 24/7 support for all travelers.'
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'We recommend packing light layers as temperatures drop at night, comfortable walking shoes, a reliable headlamp, and a smartphone or camera capable of night-mode photography to capture the glowing scenery.'
  },
  {
    question: 'Do you offer travel insurance?',
    answer: 'Absolutely. We offer flexible cancellation policies. You can cancel and receive a 100% refund up to 48 hours before the start of any scheduled night experience.'
  },
  {
    question: 'Is customer support available 24/7?',
    answer: 'Once you book a tour, you can download all maps, schedules, guides, and ticket vouchers offline directly inside the mobile app. It works flawlessly without cellular data or Wi-Fi.'
  }
];

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [toastList, setToastList] = useState([]);
  const [bookingData, setBookingData] = useState({ destination: '', date: '', guests: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [highlightedDestination, setHighlightedDestination] = useState(null);
  const destSectionRef = useRef(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || 0;
      setScrolled(scrollTop > 50);
      // Keep header always visible while scrolling
      setHideHeader(false);

      lastScrollRef.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal-fade').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!highlightedDestination) {
      return undefined;
    }

    const timer = window.setTimeout(() => setHighlightedDestination(null), 4000);
    return () => window.clearTimeout(timer);
  }, [highlightedDestination]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToastList((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToastList((prev) => prev.filter((toast) => toast.id !== id));
    }, 4300);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const { destination, date, guests } = bookingData;

    if (!destination || !date || !guests) {
      return;
    }

    addToast(`Searching trips to ${capitalize(destination)} starting ${date}...`);

    const destinationElement = document.querySelector(`[data-id="${destination}"]`);
    if (destSectionRef.current && destinationElement) {
      destSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.setTimeout(() => {
        setHighlightedDestination(destination);
        addToast(`Found! Premium package for ${capitalize(destination)} is highlighted below.`, 'success');
      }, 1200);
    }
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (!newsletterEmail) {
      return;
    }

    addToast(`Thank you for subscribing! Glowing deals sent to: ${newsletterEmail}`, 'success');
    setNewsletterEmail('');
  };

  const headerClassName = `header${scrolled ? ' scrolled' : ''}${hideHeader ? ' header-hidden' : ''}`;

  return (
    <>
      <div className="starry-bg" />
      <div className="glow-orb orb-1" />
      <div className="glow-orb orb-2" />
      <div className="pj5_p1_bg" />

      <header className={headerClassName}>
        <div className="container header-container">
          <a href="#" className="logo">
            <img src="/assets/Pj5_nb_logo.png" alt="pj5_nb_logo" className="logo-img-badge" />
            <img src="/assets/Pj5_nb_tt.png" alt="pj5_nb_tt" className="logo-img-text" />
          </a>

          <nav className="nav">
            <ul className="nav-list">
              <li><a href="#destinations" className="nav-link">Destinations</a></li>
              <li><a href="#packages" className="nav-link">Experiences</a></li>
              <li><a href="#blogs" className="nav-link">Deals</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <a href="#planner" className="btn-nav-img-link">
              <img src="/assets/Pj5_nb_bk.png" alt="pj5_nb_bk" className="btn-nav-bk-img" />
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle Menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <button type="button" className="close-menu" aria-label="Close Menu" onClick={() => setMobileMenuOpen(false)}>
          <X />
        </button>
        <ul className="mobile-nav-list">
          <li><a href="#destinations" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Destinations</a></li>
          <li><a href="#packages" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Experiences</a></li>
          <li><a href="#blogs" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Deals</a></li>
          <li><a href="#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          <li><a href="#contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          <li>
            <a href="#planner" className="mobile-nav-img-link" style={{ display: 'inline-block', marginTop: 20 }} onClick={() => setMobileMenuOpen(false)}>
              <img src="/assets/Pj5_nb_bk.png" alt="pj5_nb_bk" className="btn-nav-bk-img" />
            </a>
          </li>
        </ul>
      </div>

      <section className="hero-section">
        <div className="hero-globe-container">
          <img src="/assets/Pj5_p1_bg.png" alt="Travel globe silhouette" className="hero-globe-image" />
        </div>
        <div className="container hero-container">
          <h1 className="hero-title reveal-fade">
            Discover The World Beyond <br />
            <span className="glow-text">Daylight</span>
          </h1>

          <div id="planner" className="planner-widget reveal-fade delay-1">
            <h2 className="planner-title">Plan Your Perfect Trip</h2>
            <form className="planner-form" onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label htmlFor="destinationSelect">
                  <MapPin /> Destination
                </label>
                <div className="select-wrapper">
                  <select
                    id="destinationSelect"
                    required
                    value={bookingData.destination}
                    onChange={(event) => setBookingData((prev) => ({ ...prev, destination: event.target.value }))}
                  >
                    <option value="" disabled>Where to?</option>
                    <option value="paris">Paris, France</option>
                    <option value="tokyo">Tokyo, Japan</option>
                    <option value="bali">Bali, Indonesia</option>
                    <option value="santorini">Santorini, Greece</option>
                    <option value="maldives">Maldives</option>
                    <option value="dubai">Dubai, UAE</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateInput">
                  <Calendar /> Check-in/out
                </label>
                <input
                  type="date"
                  id="dateInput"
                  required
                  value={bookingData.date}
                  onChange={(event) => setBookingData((prev) => ({ ...prev, date: event.target.value }))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="travelersInput">
                  <Users /> Guests
                </label>
                <div className="select-wrapper">
                  <select
                    id="travelersInput"
                    required
                    value={bookingData.guests}
                    onChange={(event) => setBookingData((prev) => ({ ...prev, guests: event.target.value }))}
                  >
                    <option value="" disabled>How many?</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-search">
                <span>Search Now</span>
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="packages" className="services-section">
        <div className="container">
          <div className="section-header services-section-header reveal-fade">
            <h2 className="section-title">Our Place To Plan It All</h2>
            <p className="section-subtitle services-subtitle">Experience seamless travel planning with flights, stays, and local experiences all in one beautiful platform.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.title} className={`service-card reveal-fade${index > 0 ? ` delay-${index}` : ''}`}>
                <div className="service-icon-container">
                  <img src={`/assets/${service.icon}`} alt={service.title} className="service-icon-img" />
                </div>
                <h3 className="service-name">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="destinations-section" ref={destSectionRef}>
        <div className="container">
          <div className="section-header reveal-fade">
            <h2 className="section-title">Destinations That Glow In The Dark</h2>
            <p className="section-subtitle">Discover the most popular destinations chosen by our<br />community of travelers</p>
          </div>

          <div className="destinations-grid" id="destinationsGrid">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className={`destination-card reveal-fade${destination.id === highlightedDestination ? ' highlighted' : ''}`}
                data-category={destination.category}
                data-id={destination.id}
              >
                <div className="card-image-container">
                  <img src={destination.image} alt={`${destination.title} at night`} className="card-image" loading="lazy" />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{destination.title}</h3>
                  <div className="price-tag">$899</div>
                  <div className="card-meta">
                    <img src="/assets/Pj5_p3_reviews.png" alt="Reviews" className="card-reviews-img" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container quote-container">
          <blockquote className="quote-text reveal-fade">
            "Every destination tells a story — every night reveals a memory."
          </blockquote>
          <p className="quote-author reveal-fade delay-1">
            Join millions of travelers who have discovered that the journey is just as beautiful as the destination. Every trip tells a story, and yours is waiting to be written in the stars.
          </p>
        </div>
      </section>

      <section className="app-section">
        <div className="container app-container">
          <div className="app-content reveal-fade">
            <h2 className="app-title">Travel On The Go</h2>
            <p className="app-description">
              WanderScape app gives you full control of your journey. Book, explore, and discover from anywhere in the world.
            </p>

            <div className="app-buttons">
              <a href="#" className="store-btn">
                <img src="/assets/Pj5_p5_ic3.png" alt="Download on the App Store" className="store-badge-img" />
              </a>
              <a href="#" className="store-btn">
                <img src="/assets/Pj5_p5_ic4.png" alt="Get it on Google Play" className="store-badge-img" />
              </a>
            </div>

            <div className="landmarks-art">
              <img src="/assets/Pj5_p5_ic2.png" alt="Landmarks illustration" className="landmarks-img" />
            </div>
          </div>

          <div className="app-mockup reveal-fade">
            <div className="mockup-container">
              <div className="phone-glow" />
              <img src="/assets/Pj5_p5_ic1.png" alt="WanderScape app interface mockup" className="mockup-image" />
            </div>
            
          </div>
        </div>
      </section>

      <section id="blogs" className="blog-section">
        <div className="container">
          <div className="section-header reveal-fade">
            <h2 className="section-title">Travel Stories That Inspire</h2>
            <p className="section-subtitle">Read articles from seasoned travelers who have experienced the magic of the night.</p>
          </div>

          <div className="blog-grid">
            {blogs.map((blog) => (
              <article key={blog.title} className="blog-card reveal-fade">
                <div className="blog-image-wrapper">
                  <img src={blog.image} alt={blog.alt} className="blog-image" loading="lazy" />
                </div>
                <div className="blog-body">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="faq-section">
        <div className="container faq-container">
          <div className="section-header reveal-fade">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about our magical night tours.</p>
          </div>

          <div className="accordion-list">
            {faqs.map((item, index) => (
              <div key={item.question} className={`accordion-item reveal-fade${activeFaq === index ? ' active' : ''}`}>
                <button
                  type="button"
                  className="accordion-header"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <Plus className="accordion-icon" />
                </button>
                <div className="accordion-content" style={{ maxHeight: activeFaq === index ? '200px' : '0' }}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card reveal-fade">
            <div className="newsletter-glow" />
            <div className="newsletter-content">
              <h2 className="newsletter-title">Be The First To Catch Travel Deals That Glow</h2>
              <p className="newsletter-subtitle">Join our exclusive community and discover destinations<br />that shine brighter than the rest. Get early access to<br />night-time adventures and luminous experiences.</p>

              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <Mail className="mail-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email to join to glow"
                    required
                    aria-label="Email Address"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                  />
                  <button type="submit" className="btn btn-subscribe">Join Now</button>
                </div>
              </form>
            </div>

            <div className="skyline-art">
              <img src="/assets/Pj5_p8_bgi.png" alt="Skyline" className="skyline-img" />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-container">
          <div className="footer-brand reveal-fade">
            <a href="#" className="logo">
              <img src="/assets/Pj5_nb_logo.png" alt="pj5_nb_logo" className="logo-img-badge" />
              <img src="/assets/Pj5_nb_tt.png" alt="pj5_nb_tt" className="logo-img-text" />
            </a>
            <p className="brand-desc">
              Your gateway to extraordinary travel experiences that<br />glow in the dark. We believe every journey should<br />illuminate your soul and create memories that shine forever.
            </p>
            <div className="copyright">&copy; 2025 Real Estates. All rights reserved.</div>
          </div>

          <div className="footer-links reveal-fade delay-1">
            <h3 className="footer-title">Quick Navigation</h3>
            <ul className="footer-list">
              <li><a href="#destinations">Destinations</a></li>
              <li><a href="#packages">Experiences</a></li>
              <li><a href="#blogs">Deals</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact reveal-fade delay-2">
            <h3 className="footer-title">Quick Contact</h3>
            <p className="contact-item">
              <Mail /> info@glowtrotter.com
            </p>
            <p className="contact-item">
              <Users /> +1 (555) 389-4592
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><Facebook /></a>
              <a href="#" aria-label="Twitter"><Twitter /></a>
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href="#" aria-label="Youtube"><Youtube /></a>
            </div>
          </div>
        </div>
      </footer>

      <div className="toast-area">
        {toastList.map((toast) => (
          <div key={toast.id} className={`custom-toast ${toast.type}`}>
            <div className="toast-content">
              {toast.type === 'success' ? <CheckCircle size={18} /> : <Info size={18} />}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
