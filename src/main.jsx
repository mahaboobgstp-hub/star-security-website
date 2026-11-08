
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const services = [
  {
    icon: "♜",
    title: "Security Guard Services",
    desc: "Professional security personnel to protect people, property and business operations.",
    points: ["Trained security guards", "Access control and visitor management", "Premises patrolling", "Site-specific security deployment"]
  },
  {
    icon: "♙",
    title: "Manpower Staffing",
    desc: "Dependable workforce solutions to support your organisation's operational requirements.",
    points: ["Skilled and general workforce", "Workforce deployment", "Attendance coordination", "Flexible staffing requirements"]
  },
  {
    icon: "◉",
    title: "Surveillance & Monitoring",
    desc: "Active site supervision and monitoring to support a safer working environment.",
    points: ["Site supervision", "Safety oversight", "Incident reporting", "Security coordination"]
  },
  {
    icon: "⬡",
    title: "Facility Security Management",
    desc: "Organised security support tailored to your premises, workforce and operational needs.",
    points: ["Security planning", "Deployment supervision", "Access management", "Operational coordination"]
  }
];

const industries = [
  {
    image: "/industry-hospital.jpg",
    title: "Hospitals & Healthcare",
    desc: "Security support for hospitals, clinics and healthcare facilities, with attention to patients, visitors and staff."
  },
  {
    image: "/industry-corporate.jpg",
    title: "Corporate Offices",
    desc: "Professional security services for offices, business centres and corporate establishments."
  },
  {
    image: "/industry-manufacturing.jpg",
    title: "Manufacturing Industries",
    desc: "Security support for industrial premises, manufacturing facilities, employees and assets."
  },
  {
    image: "/industry-education.jpg",
    title: "Educational Institutions",
    desc: "Security personnel and access management support for schools, colleges and educational campuses."
  },
  {
    image: "/industry-residential.jpg",
    title: "Residential Communities",
    desc: "Security services for residential premises, gated communities and apartment complexes."
  },
  {
    image: "/industry-events.jpg",
    title: "Events & Large Gatherings",
    desc: "Organised security support for events, gatherings and public functions."
  }
];

const reasons = [
  {
    icon: "01",
    title: "10 Years of Experience",
    desc: "Our organisation is backed by a decade of industry experience and practical security service knowledge."
  },
  {
    icon: "02",
    title: "Professional Personnel",
    desc: "We focus on disciplined, responsible and appropriately trained personnel."
  },
  {
    icon: "03",
    title: "Industry Understanding",
    desc: "Experience across healthcare, corporate, manufacturing and educational environments."
  },
  {
    icon: "04",
    title: "Organised Deployment",
    desc: "Security deployment planned around each client's premises and operational requirements."
  },
  {
    icon: "05",
    title: "Responsive Coordination",
    desc: "A service-oriented approach with attention to communication and supervision."
  },
  {
    icon: "06",
    title: "Client-Focused Service",
    desc: "We aim to build professional relationships through dependable service and accountability."
  }
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  message: "",
  website: ""
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const closeMenu = () => setMenuOpen(false);

  async function submitForm(event) {
    event.preventDefault();

    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your enquiry. Please try again."
        );
      }

      setStatus("success");
      setNotice(
        "Thank you for contacting STAR Security. Your enquiry has been submitted successfully."
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setNotice(
        error.message || "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <header className="header">
        <a
          className="header-logo"
          href="#home"
          aria-label="STAR Security home"
          onClick={closeMenu}
        >
          <img
            src="/star-security-logo.png"
            alt="STAR Security & Staffing"
          />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          className={`navigation ${menuOpen ? "navigation-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About Us</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#industries" onClick={closeMenu}>Industries</a>
          <a href="#why-star" onClick={closeMenu}>Why STAR</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a className="header-cta" href="#contact">
          Request a Quote <span>→</span>
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              PROFESSIONAL SECURITY & MANPOWER SOLUTIONS
            </div>

            <h1>
              Confidence in
              <br />
              <em>Every Presence.</em>
            </h1>

            <p>
              A professional security and staffing organisation
              built on 10 years of industry experience,
              committed to protecting people, property and
              business operations.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#contact">
                Request a Quote <span>→</span>
              </a>
              <a className="btn secondary" href="#services">
                Explore Services
              </a>
            </div>

            <div className="hero-points">
              <div>
                <b>♢</b>
                <span>Experienced<br />Leadership</span>
              </div>
              <div>
                <b>♧</b>
                <span>Reliable<br />Workforce</span>
              </div>
              <div>
                <b>◉</b>
                <span>Responsive<br />Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="/security-officer-hero.jpg"
              alt="STAR Security professional officer"
            />
            <div className="hero-image-label">
              <span>STAR SECURITY & STAFFING</span>
              <strong>Professionalism. Protection. Trust.</strong>
            </div>
          </div>
        </section>

        {/* ABOUT US */}
        <section className="about-section" id="about">
          <div className="office-photo">
            <img
              src="/star-office-branding.jpg"
              alt="STAR Security office branding on a portion of a glass office building"
            />
          </div>

          <div className="about-copy">
            <div className="kicker">ABOUT STAR</div>

            <h2>
              A New Organisation
              <br />
              with 10 Years of
              <br />
              Industry Experience
            </h2>

            <p>
              STAR Security & Staffing is a newly established
              organisation backed by 10 years of industry
              experience. Our experience includes providing
              security services to hospitals, corporate
              companies, manufacturing industries, educational
              institutions and other establishments.
            </p>

            <p>
              We understand that every organisation has
              different security requirements. Our approach
              focuses on professional personnel, disciplined
              deployment, effective supervision and dependable
              service.
            </p>

            <div className="about-highlights">
              <div><b>◎</b><span>Experienced<br />Leadership</span></div>
              <div><b>♟</b><span>Disciplined<br />Teams</span></div>
              <div><b>◇</b><span>Client-Focused<br />Service</span></div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section" id="services">
          <div className="section-heading">
            <div className="kicker">WHAT WE DO</div>
            <h2>Comprehensive Security & Staffing Solutions</h2>
            <p>
              Professional services designed around your
              organisation's people, property and operational needs.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon">{service.icon}</div>

                <h3>{service.title}</h3>

                <p>{service.desc}</p>

                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <a href="#contact" className="card-link">
                  Discuss Your Requirement →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="industries-section" id="industries">
          <div className="section-heading">
            <div className="kicker">INDUSTRIES WE SERVE</div>
            <h2>Experience Across Key Sectors</h2>
            <p>
              Our industry experience helps us understand the
              different security environments and requirements
              of our clients.
            </p>
          </div>

          <div className="industries-grid">
            {industries.map((industry) => (
              <article className="industry-card" key={industry.title}>
                <div className="industry-image">
                  <img src={industry.image} alt={industry.title} loading="lazy" />
                  <span className="industry-number">✦</span>
                </div>

                <div className="industry-content">
                  <h3>{industry.title}</h3>
                  <p>{industry.desc}</p>
                  <a href="#contact">Enquire Now →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* WHY STAR */}
        <section className="why-section" id="why-star">
          <div className="section-heading">
            <div className="kicker">THE STAR DIFFERENCE</div>
            <h2>Why Choose STAR Security?</h2>
            <p>
              A professional approach to security, staffing
              and service coordination.
            </p>
          </div>

          <div className="reasons-grid">
            {reasons.map((reason) => (
              <article className="reason-card" key={reason.title}>
                <span className="reason-number">{reason.icon}</span>
                <h3>{reason.title}</h3>
                <p>{reason.desc}</p>
              </article>
            ))}
          </div>

          <div className="why-banner">
            <div>
              <span>YOUR ORGANISATION. OUR COMMITMENT.</span>
              <h3>Let's build a safer and more dependable workplace.</h3>
            </div>
            <a className="btn gold-btn" href="#contact">
              Talk to Our Team →
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section" id="contact">
          <div className="contact-info">
            <div className="kicker">LET'S CONNECT</div>

            <h2>
              Your Security
              <br />
              Requirements
              <br />
              Deserve the Right Partner.
            </h2>

            <p>
              Tell us about your organisation and requirements.
              Our team will get in touch with you.
            </p>

            <div className="contact-detail">
              <span>✉</span>
              <div>
                <small>EMAIL US</small>
                <a href="mailto:Admin@starsecurity.info">
                  Admin@starsecurity.info
                </a>
              </div>
            </div>

            <div className="contact-note">
              Professional security and staffing solutions,
              backed by industry experience.
            </div>
          </div>

          <div className="contact-panel">
            <h2>Get in Touch</h2>
            <p>Share your requirements and our team will respond.</p>

            <form onSubmit={submitForm}>
              <div className="form-row">
                <label>
                  Your Name <i>*</i>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateForm}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    maxLength="100"
                  />
                </label>

                <label>
                  Company / Organisation <i>*</i>
                  <input
                    name="company"
                    value={form.company}
                    onChange={updateForm}
                    placeholder="Company name"
                    autoComplete="organization"
                    required
                    maxLength="150"
                  />
                </label>
              </div>

              <label>
                Email Address <i>*</i>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateForm}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  maxLength="150"
                />
              </label>

              <label>
                Your Requirements <i>*</i>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateForm}
                  placeholder="Tell us about your security or staffing requirements..."
                  rows="5"
                  required
                  maxLength="3000"
                />
              </label>

              <div className="hp-field" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input
                    name="website"
                    value={form.website}
                    onChange={updateForm}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </label>
              </div>

              <button
                className="btn primary send-btn"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Sending Enquiry..."
                  : "✉  Send Enquiry"}
              </button>

              {notice && (
                <p className={`form-notice ${status}`} role="status">
                  {notice}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a className="footer-logo" href="#home">
          <img src="/star-security-logo.png" alt="STAR Security & Staffing" />
        </a>

        <nav aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#industries">Industries</a>
          <a href="#why-star">Why STAR</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-contact">
          <span>CONTACT</span>
          <a href="mailto:Admin@starsecurity.info">
            Admin@starsecurity.info
          </a>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} STAR Security & Staffing.
          All Rights Reserved.
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
