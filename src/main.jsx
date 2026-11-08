import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const services = [
  ["♟","Security Guard Services","Trained, disciplined and client-focused guards."],
  ["♙","Manpower Staffing","Reliable and skilled workforce for various functions."],
  ["◉","Surveillance & Monitoring","Site supervision and safety oversight."],
  ["⬡","Facility Security Management","End-to-end security support tailored to your premises."]
];
const industries = [
  ["/industry-hospital.jpg","Hospitals & Healthcare"],
  ["/industry-corporate.jpg","Corporate Companies"],
  ["/industry-manufacturing.jpg","Manufacturing Industries"],
  ["/industry-education.jpg","Educational Institutions"],
  ["/industry-residential.jpg","Residential Communities"],
  ["/industry-events.jpg","Events & Large Gatherings"]
];

function App(){
  const [form,setForm]=useState({
  name:"",
  company:"",
  email:"",
  phone:"",
  message:"",
  website:""
});
  const [status,setStatus]=useState("idle"),[notice,setNotice]=useState("");
  const update=e=>setForm({...form,[e.target.name]:e.target.value});
  async function submitForm(e){
    e.preventDefault();setStatus("sending");setNotice("");
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.error||"Unable to send your enquiry. Please try again.");
      setForm({
  name:"",
  company:"",
  email:"",
  phone:"",
  message:"",
  website:""
});
      setForm({name:"",company:"",email:"",message:"",website:""});
    }catch(err){setStatus("error");setNotice(err.message||"Something went wrong. Please try again.");}
  }
  return <>
    <header className="header">
      <a className="header-logo" href="#home" aria-label="STAR Security & Staffing home">
        <img src="/star-security-logo.png" alt="STAR Security & Staffing — official rectangular logo"/>
      </a>
      <nav className="navigation" aria-label="Main navigation">
        <a className="active" href="#home">Home</a><a href="#about">About Us</a><a href="#services">Services</a>
        <a href="#industries">Industries</a><a href="#why-star">Why STAR</a><a href="#contact">Contact</a>
      </nav>
      <a className="header-cta" href="#contact"><span>✉</span> Request a Quote</a>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">PROFESSIONAL SECURITY & MANPOWER SOLUTIONS</div>
          <h1>Confidence in<br/><em>Every Presence.</em></h1>
          <p>A professional security and staffing agency, built on 10 years of industry experience, committed to people, property and operational safety.</p>
          <div className="hero-actions"><a className="btn primary" href="#contact">Request a Quote <span>→</span></a><a className="btn secondary" href="#services">Our Services</a></div>
          <div className="hero-points">
            <div><b>♢</b><span>Trained &<br/>Verified Personnel</span></div>
            <div><b>♧</b><span>Reliable<br/>Workforce</span></div>
            <div><b>♧</b><span>Responsive<br/>Support</span></div>
            <div><b>✥</b><span>Service<br/>Excellence</span></div>
          </div>
        </div>
        <div className="hero-visual"><img src="/security-officer-hero.jpg" alt="STAR security officer wearing company uniform and insignia"/></div>
      </section>
      <section className="about-band" id="about">
        <div className="office-photo"><img src="/star-office-branding.jpg" alt="The STAR Security & Staffing sign on a portion of a glass office building"/></div>
        <div className="about-copy">
          <div className="kicker">ABOUT STAR</div>
          <h2>A New Organisation with<br/>10 Years of Industry Experience</h2>
          <p>STAR Security & Staffing is a newly established organisation backed by 10 years of industry experience, including providing security services to hospitals, corporate companies, manufacturing industries, educational institutions and other establishments.</p>
          <div className="about-highlights">
            <div><b>◎</b><span>Experienced<br/>Leadership</span></div>
            <div><b>♟</b><span>Trained &<br/>Disciplined Teams</span></div>
            <div><b>◇</b><span>Service<br/>Excellence</span></div>
          </div>
        </div>
      </section>
      <section className="services-section" id="services">
        <div className="kicker center">OUR SERVICES</div><h2 className="section-title">Comprehensive Security & Staffing Solutions</h2>
        <div className="services-grid">{services.map(([icon,title,desc])=><article className="service-card" key={title}><div className="service-icon">{icon}</div><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>
      <section className="industries-section" id="industries">
        <div className="kicker center">INDUSTRIES WE SERVE</div><h2 className="section-title">Proven Security Experience Across Key Sectors</h2>
        <p className="industry-intro">With 10 years of industry experience, we have been providing security services to a wide range of establishments, including:</p>
        <div className="industries-grid">{industries.map(([image,title])=><article className="industry-card" key={title}><img src={image} alt=""/><div><span>✦</span><strong>{title}</strong></div></article>)}</div>
      </section>
      <section className="trust-contact" id="why-star">
        <div className="why-star"><div className="kicker">WHY CHOOSE STAR</div><h2>A Trusted Security Partner<br/>for Your Organisation</h2>
          <ul><li>10 Years of Industry Experience</li><li>Professionally Trained Personnel</li><li>Background Verified Staff</li><li>Industry-Specific Security Expertise</li><li>Reliable, Disciplined and Responsive Service</li></ul>
          <div className="watermark">★</div>
        </div>
        <div className="contact-panel" id="contact"><h2>Get in Touch</h2><p>Share your requirements and our team will get back to you shortly.</p>
          <form onSubmit={submitForm}>
            <div className="form-row">
              <label>Your Name <i>*</i><input name="name" value={form.name} onChange={update} placeholder="Enter your name" required maxLength="100"/></label>
              <label>Company / Organisation <i>*</i><input name="company" value={form.company} onChange={update} placeholder="Company name" required maxLength="150"/></label>
            </div>
            <label>Email Address <i>*</i><input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required maxLength="150"/></label>
            <label>Mobile Number <i>*</i>
  <input
    name="phone"
    type="tel"
    inputMode="tel"
    value={form.phone}
    onChange={update}
    placeholder="+91 98765 43210"
    required
    maxLength="25"
    pattern="[0-9+() -]{8,25}"
    title="Please enter a valid mobile number"
  />
</label>
            <label>Your Requirements <i>*</i><textarea name="message" value={form.message} onChange={update} placeholder="Tell us about your security or staffing requirements..." rows="3" required maxLength="3000"/></label>
            <div className="hp-field" aria-hidden="true"><label>Leave empty<input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off"/></label></div>
            <button className="btn primary send-btn" type="submit" disabled={status==="sending"}>{status==="sending"?"Sending...":"✉  Send Enquiry"}</button>
            {notice&&<p className={`form-notice ${status}`} role="status">{notice}</p>}
          </form>
        </div>
      </section>
    </main>
    <footer className="footer">
      <a className="footer-logo" href="#home"><img src="/star-security-logo.png" alt="STAR Security & Staffing"/></a>
      <nav><a href="#home">Home</a><a href="#about">About Us</a><a href="#services">Services</a><a href="#industries">Industries</a><a href="#why-star">Why STAR</a><a href="#contact">Contact</a></nav>
      <div className="social"><span>Follow Us</span><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a></div>
      <div className="copyright">© {new Date().getFullYear()} STAR Security & Staffing. All Rights Reserved.</div>
    </footer>
  </>;
}
createRoot(document.getElementById("root")).render(<App/>);
