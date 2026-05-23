import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Mail, Phone, ArrowRight } from "lucide-react";

const T = {
  bg: "#F7F5F0", surface: "#FFFFFF", dark: "#0D2B1A",
  green: "#155E39", greenMid: "#1E8A52", lime: "#9EE06E",
  limePale: "#E8F9DB", sand: "#EDE8DC", sandDark: "#D8CEB8",
  text: "#1A2E1E", muted: "#6B7E6F",
};

const LINKS = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "How It Works", path: "#how-it-works" },
    { label: "Our NGOs", path: "/ngos" },
    { label: "Contact", path: "/contact" },
  ],
  donor: [
   { label: "Donate Items", path: "/donor/donate" } ,       // ← Updated
    { label: "Track Donation", path: "/track" },
    { label: "Schedule Pickup", path: "/donate" },        // ← Updated
    { label: "Impact Report", path: "/track" },
  ],
  support: [
    { label: "FAQs", path: "/about" },
    { label: "Privacy Policy", path: "/about" },
    { label: "Terms of Use", path: "/about" },
    { label: "Partner with Us", path: "/contact" },
  ],
};

// === NEW SOCIALS WITH INLINE SVGs ===
const SOCIALS = [
  {
    href: "#",
    label: "Instagram",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  {
    href: "#",
    label: "Twitter/X",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    href: "#",
    label: "Facebook",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  {
    href: "#",
    label: "YouTube",
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    )
  },
];

export default function Footer() {
  return (
    <footer style={{ background: T.dark, color: T.surface, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 48px;
        }
        .footer-link {
          display: block;
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          padding: 5px 0;
          transition: color 0.2s;
        }
        .footer-link:hover { color: ${T.lime}; }
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-family: 'DM Sans', sans-serif;
          margin: 0 0 20px;
        }
        .social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
          text-decoration: none;
        }
        .social-btn:hover {
          background: rgba(158,224,110,0.15);
          border-color: rgba(158,224,110,0.3);
        }
        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: white;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus { border-color: rgba(158,224,110,0.5); }
        .newsletter-btn {
          padding: 12px 20px;
          border-radius: 50px;
          background: ${T.lime};
          color: ${T.dark};
          font-weight: 700;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s; white-space: nowrap;
        }
        .newsletter-btn:hover {
          background: #b5f082;
          transform: translateY(-1px);
        }
        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 6px 14px;
          font-size: 11.5px; font-weight: 600;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>

      {/* TOP STRIP */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "14px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["FCRA Verified", "ISO Certified", "4.9★ Rated", "42+ Cities"].map((b, i) => (
              <span key={i} className="badge">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.lime, flexShrink: 0 }} />
                {b}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            India's most trusted donation network
          </span>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 48px" }}>
        <div className="footer-grid">

          {/* Col 1 — Brand */}
          <div>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.lime, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Heart size={16} color={T.dark} fill={T.dark} />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: T.lime, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
                ReWear
              </span>
            </Link>

            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: "0 0 24px", maxWidth: 280 }}>
              Connecting donors with verified NGOs across India. Free doorstep pickup. Real impact, every donation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                { icon: MapPin, text: "Mumbai, Maharashtra, India" },
                { icon: Mail, text: "hello@ReWear.in" },
                { icon: Phone, text: "+91 98765 43210" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Icon size={13} color={T.lime} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Updated Social Icons */}
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="social-btn" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <p className="footer-col-title">Company</p>
            {LINKS.company.map(({ label, path }) => (
              path.startsWith("#")
                ? <a key={label} href={path} className="footer-link">{label}</a>
                : <Link key={label} to={path} className="footer-link">{label}</Link>
            ))}
          </div>

          {/* Col 3 — For Donors */}
          <div>
            <p className="footer-col-title">For Donors</p>
            {LINKS.donor.map(({ label, path }) => (
              <Link key={label} to={path} className="footer-link">{label}</Link>
            ))}
          </div>

          {/* Col 4 — Support */}
          <div>
            <p className="footer-col-title">Support</p>
            {LINKS.support.map(({ label, path }) => (
              <Link key={label} to={path} className="footer-link">{label}</Link>
            ))}

            {/* Newsletter */}
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "'Syne', sans-serif", margin: "0 0 12px" }}>
                Stay Updated
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}>
            © 2025 ReWear. Made with{" "}
            <Heart size={11} color={T.lime} style={{ verticalAlign: "middle", display: "inline" }} fill={T.lime} />{" "}
            in India. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t, i) => (
              <Link key={i} to="/about" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = T.lime}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 