import React from "react";
import "./About.css";
import heroBg from "../../assets/hero-bg.jpg";

/* ─── REUSABLE COMPONENTS ─── */
/* ─── MAIN COMPONENT ─── */
const About: React.FC = () => {
  return (
    <div className="about-page">
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(10,22,8,.72), rgba(10,22,8,.88)), url(${heroBg})`,
        }}
      >
        <div className="hero-texture" aria-hidden="true" />

        <div className="hero-badge">🌿 Agro Market</div>

        <h1 className="hero-title">
          Rooted in <span className="text-accent">Nature,</span>
          <br />
          Built by <span className="text-accent">NJEDOCK</span>
        </h1>

        <p className="hero-sub">
          I am NJEDOCK MADIEU BULL PARFAIT, Marketing Lead and the creative mind
          behind our brand and community outreach programs. I am the only one
          changing this project, leading every UI update, and delivering an
          impressive user experience.
        </p>

        <div className="hero-actions">
          <a className="btn-primary" href="#agile-section">
            My Agile Approach
          </a>
          <a className="btn-outline" href="#profile-section">
            Personal Profile
          </a>
        </div>
      </section>

      <section className="section" id="profile-section">
        <div className="profile-card">
          <span className="section-label">Personal Profile</span>
          <h2 className="section-title">NJEDOCK MADIEU BULL PARFAIT</h2>
          <p className="profile-role">Marketing Lead</p>
          <p className="body-text">
            Creative mind behind our brand and community outreach programs. I
            own the project vision, lead every design decision, and build an
            impressive UI through focused, agile execution.
          </p>
          <ul className="agile-list">
            <li>
              Single-point ownership for brand consistency and polished results.
            </li>
            <li>
              Agile mindset: rapid iterations, feedback loops, and data-informed
              refinement.
            </li>
            <li>
              Community-first outreach that turns users into loyal advocates.
            </li>
            <li>
              Every improvement is made by me to elevate the user experience.
            </li>
          </ul>
        </div>
      </section>

      <section className="section section--dark" id="agile-section">
        <span className="section-label">Agile Mindset</span>
        <h2 className="section-title">
          Designed to move fast, iterate intelligently, and impress.
        </h2>
        <p className="body-text">
          Every change is crafted by me with a strong agile discipline:
          prioritize impact, validate quickly, and refine continuously. This
          project is not a team exercise—it is my personal commitment to an
          outstanding product experience.
        </p>
        <div className="agile-grid">
          <div className="agile-card">
            <h3>Iterative Design</h3>
            <p>
              Launch faster, review often, and evolve the interface until it
              feels effortless.
            </p>
          </div>
          <div className="agile-card">
            <h3>Brand Power</h3>
            <p>
              Strong visual identity and meaningful outreach are the center of
              every experience.
            </p>
          </div>
          <div className="agile-card">
            <h3>User Focus</h3>
            <p>
              Every pixel is chosen to communicate confidence, clarity, and a
              premium brand story.
            </p>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <div className="footer-brand">NJEDOCK MADIEU BULL PARFAIT</div>
        <p className="footer-tagline">
          Solo creative force and agile marketing lead shaping the UI and brand
          experience.
        </p>
      </footer>
    </div>
  );
};

export default About;
