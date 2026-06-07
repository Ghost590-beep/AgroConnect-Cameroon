import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

/* ── Image imports — place these files in src/assets/ ── */
import heroBg  from "../../assets/hero-bg.jpg";
import member1 from "../../assets/member1.jpg";
import member2 from "../../assets/member2.jpg";
import member3 from "../../assets/member3.jpg";
import member4 from "../../assets/member4.jpg";
import member5 from "../../assets/member5.jpg";

/* ─── TYPES ─── */
interface Member {
  id: number;
  img: string;
  name: string;
  role: string;
  bio: string;
}

interface Service {
  icon: string;
  title: string;
  desc: string;
}

interface Value {
  emoji: string;
  title: string;
  desc: string;
}

interface Stat {
  number: string;
  label: string;
}

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface SectionHeadingProps {
  label: string;
  title?: string;
  subtitle?: string;
}

interface MemberCardProps {
  member: Member;
}

/* ─── DATA ─── */
const MEMBERS: Member[] = [
  {
    id: 1,
    img:  member1,
    name: "JOHN MC KNIGHT LIYOU",
    role: "Scrum Master",
    bio:  "Passionate about sustainable agriculture and connecting farmers with markets.",
  },
  {
    id: 2,
    img:  member2,
    name: "KOLE EBANG RYAN",
    role: "Logistics Manager",
    bio:  "Expert in supply chain and delivery of fresh produce across the region.",
  },
  {
    id: 3,
    img:  member3,
    name: "NJEDOCK MADIEU BULL PARFAIT",
    role: "Marketing Lead",
    bio:  "Creative mind behind our brand and community outreach programs.",
  },
  {
    id: 4,
    img:  member4,
    name: "TATAPONG PRINCESS MEGHEHEN",
    role: "Finance Officer",
    bio:  "Manages budgets and ensures our farmers get fair and prompt payments.",
  },
  {
    id: 5,
    img:  member5,
    name: "AZIBON TEKOUGOU IVAN LEE",
    role: "Field Coordinator",
    bio:  "On-ground liaison who works directly with farmers and cooperatives.",
  },
];

const SERVICES: Service[] = [
  { icon: "🌾", title: "Fresh Produce",  desc: "Direct farm-to-table supply of grains, vegetables, and fruits." },
  { icon: "🚜", title: "Farm Equipment", desc: "Rentals and sales of modern farming tools and machinery." },
  { icon: "🌱", title: "Agro Inputs",    desc: "Quality seeds, fertilizers, and pesticides at fair prices." },
  { icon: "📦", title: "Bulk Trading",   desc: "Large-scale commodity trading for cooperatives and businesses." },
  { icon: "🤝", title: "Farmer Support", desc: "Training, financing, and advisory for smallholder farmers." },
  { icon: "🚚", title: "Logistics",      desc: "Reliable transport and cold-chain storage for perishables." },
];

const VALUES: Value[] = [
  { emoji: "🤝", title: "Integrity",      desc: "We operate with full transparency and honesty in every transaction." },
  { emoji: "🌿", title: "Sustainability", desc: "We champion eco-friendly farming practices for a better planet." },
  { emoji: "👥", title: "Community",      desc: "We grow together — farmers, traders, and consumers as one." },
  { emoji: "💡", title: "Innovation",     desc: "We harness technology to modernize agriculture in our region." },
];

const STATS: Stat[] = [
  { number: "500+", label: "Farmers Served"        },
  { number: "12",   label: "Regions Covered"       },
  { number: "95%",  label: "Customer Satisfaction" },
  { number: "2020", label: "Year Founded"          },
];

const CONTACT_ITEMS: ContactItem[] = [
  { icon: "📧", label: "Email",    value: "info@agroconnect.cm" },
  { icon: "📞", label: "Phone",    value: "+237 600 000 000"    },
  { icon: "📍", label: "Location", value: "Yaoundé, Cameroon"  },
  { icon: "🌐", label: "Website",  value: "www.agroconnect.cm" },
];

const FOOTER_LINKS = ["Home", "About Us", "Services", "Blog", "Contact"];

/* ─── REUSABLE COMPONENTS ─── */
const SectionHeading: React.FC<SectionHeadingProps> = ({ label, title, subtitle }) => (
  <div className="section-heading">
    <span className="section-label">{label}</span>
    {title    && <h2 className="section-title">{title}</h2>}
    {subtitle && <p  className="section-subtitle">{subtitle}</p>}
  </div>
);

const MemberCard: React.FC<MemberCardProps> = ({ member }) => (
  <div className="member-card">
    <div className="member-avatar-ring">
      <img src={member.img} alt={member.name} className="member-avatar-img" />
    </div>
    <div className="member-name">{member.name}</div>
    <div className="member-role">{member.role}</div>
    <p className="member-bio">{member.bio}</p>
  </div>
);

/* ─── MAIN COMPONENT ─── */
const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* ══ HERO ══ */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(10,22,8,.72), rgba(10,22,8,.88)), url(${heroBg})`,
        }}
      >
        <div className="hero-texture" aria-hidden="true" />

        <div className="hero-badge">🌿 Agro Market</div>

        <h1 className="hero-title">
          Rooted in <span className="text-accent">Nature,</span><br />
          Built for <span className="text-accent">Community</span>
        </h1>

        <p className="hero-sub">
          We are a passionate team of agro-entrepreneurs connecting farmers,
          traders, and consumers for a sustainable food future.
        </p>

        <div className="hero-actions">
          <a className="btn-primary" href="#team-section">Meet the Team ↓</a>
          <a className="btn-outline" href="#about-section">Our Story ↓</a>
        </div>

        <div className="stats-row">
          {STATS.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT US ══ */}
      <section className="section" id="about-section">
        <SectionHeading label="About Us" />
        <div className="about-grid">
          <div className="about-block">
            <h3 className="block-title">Who We Are</h3>
            <p className="body-text">
              <strong className="text-accent">Agro Market</strong> is a student-led agricultural
              enterprise founded in 2020 by a group of passionate young professionals committed to
              transforming how food moves from farms to tables. We bridge the gap between smallholder
              farmers and urban consumers through a reliable, transparent marketplace.
            </p>
            <p className="body-text mt">
              Our team combines expertise in logistics, finance, agronomy, and marketing to build
              a platform that truly serves every actor in the agricultural value chain.
            </p>
          </div>

          <div className="about-block">
            <h3 className="block-title">Our Mission</h3>
            <p className="body-text">
              To democratize access to agricultural markets by empowering farmers with fair prices,
              reducing food waste through smart logistics, and making fresh, affordable produce
              available to every household in our region.
            </p>
            <div className="vision-box">
              <div className="vision-label">🌾 Our Vision</div>
              <p className="vision-text">
                To become the leading agro-market platform in Central Africa, creating sustainable
                livelihoods and food security for millions of people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="section section--dark" id="team-section">
        <SectionHeading
          label="Meet the Team"
          title="The People Behind Agro Market"
          subtitle="Five passionate individuals working together for a sustainable food future."
        />
        <div className="team-grid">
          {MEMBERS.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="section">
        <SectionHeading
          label="What We Offer"
          title="Our Services"
          subtitle="Everything your agro-business needs, under one roof."
        />
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="section section--dark">
        <SectionHeading label="What Drives Us" title="Our Core Values" />
        <div className="values-grid">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card">
              <div className="value-emoji">{v.emoji}</div>
              <div className="value-title">{v.title}</div>
              <div className="value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section className="section">
        <SectionHeading label="Get In Touch" title="Contact Us" />
        <div className="contact-grid">
          {CONTACT_ITEMS.map((c) => (
            <div key={c.label} className="contact-card">
              <span className="contact-icon">{c.icon}</span>
              <div className="contact-label">{c.label}</div>
              <div className="contact-value">{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="about-footer">
        <div className="footer-brand">🌾 AgroConnect</div>
        <p className="footer-tagline">
          Putting sustainable agriculture in the hands of those who care.
        </p>
        <div className="footer-links">
          {FOOTER_LINKS.map((l) => (
            <span
              key={l}
              className="footer-link"
              onClick={() => {
                if (l === "Home") navigate("/landing");
                else if (l === "About Us") navigate("/about");
                else if (l === "Contact") navigate("/contact");
              }}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="footer-copy">© 2025 AgroConnect. All rights reserved.</div>
      </footer>

    </div>
  );
};

export default About;
