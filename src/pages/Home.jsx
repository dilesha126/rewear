import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, Truck, ShieldCheck, Leaf, Users, Package,
  Heart, Star, ChevronRight, MapPin, Clock, CheckCircle2,
} from "lucide-react";

const T = {
  bg: "#F7F5F0", surface: "#FFFFFF", dark: "#0D2B1A",
  green: "#155E39", greenMid: "#1E8A52", lime: "#9EE06E",
  limePale: "#E8F9DB", sand: "#EDE8DC", sandDark: "#D8CEB8",
  text: "#1A2E1E", muted: "#6B7E6F", white: "#FFFFFF",
};

function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = to / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const TAGS = ["Clothes", "Books", "Toys", "Electronics", "Furniture", "Kitchenware", "Sports Gear", "Stationery", "Bedding", "Footwear"];
function Marquee() {
  return (
    <div style={{ background: T.dark, overflow: "hidden", padding: "12px 0" }}>
      <motion.div
        style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[...TAGS, ...TAGS].map((tag, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 16,
            padding: "0 28px", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: T.lime, fontFamily: "'DM Sans', sans-serif",
          }}>
            {tag}
            <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: T.sandDark, flexShrink: 0 }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Blob({ color, style }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path fill={color} d="M47.3,-57.1C59.5,-46.3,66.7,-30.2,68.2,-14C69.7,2.2,65.6,18.5,56.9,31.3C48.2,44.1,34.9,53.4,19.7,59.3C4.5,65.2,-12.7,67.7,-27.8,62.2C-42.9,56.7,-55.9,43.2,-63.4,27.1C-70.9,11,-72.9,-7.7,-67.1,-23.3C-61.3,-38.9,-47.7,-51.4,-33.3,-61.4C-18.9,-71.4,-3.7,-78.9,10.2,-77.8C24.1,-76.7,35.1,-67.9,47.3,-57.1Z" transform="translate(100 100)" />
    </svg>
  );
}

function StepCard({ num, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: T.surface, borderRadius: 20, padding: "32px 28px",
        border: `1px solid ${T.sandDark}`, position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -10, right: 16, fontSize: 80, fontWeight: 900,
        color: T.limePale, fontFamily: "'Syne', sans-serif", lineHeight: 1, userSelect: "none",
      }}>{num}</div>
      <div style={{
        width: 40, height: 40, borderRadius: 12, background: T.lime,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative",
      }}>
        <CheckCircle2 size={20} color={T.dark} />
      </div>
      <p style={{ fontWeight: 700, fontSize: 16, color: T.text, margin: "0 0 10px", fontFamily: "'Syne', sans-serif" }}>{title}</p>
      <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
    </motion.div>
  );
}

function FeatureRow({ icon: Icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${T.sand}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: T.limePale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={16} color={T.green} />
      </div>
      <span style={{ fontSize: 14, color: T.text, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{text}</span>
    </div>
  );
}

function NgoBadge({ name, city, items, to }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(to || "/ngos")}
      style={{
        background: T.surface, borderRadius: 14, padding: "14px 16px",
        border: `1px solid ${T.sand}`, display: "flex", alignItems: "center",
        gap: 12, cursor: "pointer",
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Heart size={18} color={T.lime} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 13.5, color: T.text, fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</p>
        <p style={{ margin: 0, fontSize: 12, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>
          <MapPin size={10} style={{ verticalAlign: "middle", marginRight: 3 }} />{city}
        </p>
      </div>
      <span style={{ background: T.limePale, color: "#27500A", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{items} items</span>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { to: 24500, suffix: "+", label: "Items Donated" },
    { to: 183, suffix: "+", label: "NGO Partners" },
    { to: 8900, suffix: "+", label: "Families Helped" },
    { to: 42, suffix: "", label: "Cities Covered" },
  ];

  const steps = [
    { num: "01", title: "List Your Items", desc: "Tell us what you're donating — clothes, books, furniture, anything useful." },
    { num: "02", title: "Schedule Pickup", desc: "Choose a convenient slot. Our team arrives at your doorstep, on time." },
    { num: "03", title: "We Deliver", desc: "Items go directly to verified NGOs and beneficiaries who need them most." },
    { num: "04", title: "Track Your Impact", desc: "Get real-time updates, a digital certificate, and your impact report." },
  ];

  const ngos = [
    { name: "Goonj Foundation", city: "Mumbai", items: "1,250" },
    { name: "Smile Foundation", city: "Chennai", items: "980" },
    { name: "Akshaya Patra", city: "Bangalore", items: "2,100" },
    { name: "CRY India", city: "Delhi", items: "760" },
  ];

  return (
    <div style={{ background: T.bg, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; }

        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${T.lime}; color: ${T.dark};
          padding: 15px 32px; border-radius: 50px; font-weight: 700;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.25s ease;
        }
        .hero-btn-primary:hover { background: #8DD05E; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(158,224,110,0.4); }
        .hero-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${T.surface};
          padding: 15px 28px; border-radius: 50px; font-weight: 600;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          border: 1.5px solid rgba(255,255,255,0.3); cursor: pointer;
          text-decoration: none; transition: all 0.25s ease;
        }
        .hero-btn-outline:hover { border-color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.08); }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${T.lime}; color: ${T.dark};
          padding: 16px 36px; border-radius: 50px; font-weight: 700;
          font-size: 16px; font-family: 'DM Sans', sans-serif;
          border: none; cursor: pointer; text-decoration: none; transition: all 0.25s ease;
        }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(158,224,110,0.45); }

        /* ── Large (lg): > 1200px — base/default ── */
        .hero-grid { display: grid; grid-template-columns: 1fr 420px; gap: 64px; align-items: center; }
        .hero-heading { font-size: 4.5rem; }
        .section-heading { font-size: 2.8rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: auto auto; gap: 16px; }
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 48px; flex-wrap: wrap; }
        .bento-big { grid-column: 1 / 2; grid-row: 1 / 3; min-height: 320px; }
        .bento-wide { grid-column: 2 / 4; }
        .hero-card-wrap { display: block; }
        .hero-section-pad { padding: 80px 24px; }
        .stats-section-pad { padding: 64px 24px; }
        .bento-section-pad { padding: 100px 24px; }
        .howitworks-pad { padding: 100px 24px; }
        .ngo-section-pad { padding: 100px 24px; }
        .cta-section-pad { padding: 100px 24px; }

        /* ── Medium (md): 992px – 1200px ── */
        @media (max-width: 1200px) {
          .hero-grid { grid-template-columns: 1fr 360px; gap: 48px; }
          .hero-heading { font-size: 3.8rem; }
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Small (sm): 768px – 992px ── */
        @media (max-width: 992px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-heading { font-size: 3.2rem; }
          .section-heading { font-size: 2.2rem; }
          .hero-card-wrap { display: none; }
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .bento-big { grid-column: 1 / 2; grid-row: auto; min-height: 260px; }
          .bento-wide { grid-column: 1 / 3; }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; gap: 40px; }
          .cta-inner { flex-direction: column; text-align: center; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-section-pad { padding: 60px 24px; }
          .bento-section-pad { padding: 72px 24px; }
          .howitworks-pad { padding: 72px 24px; }
          .ngo-section-pad { padding: 72px 24px; }
          .cta-section-pad { padding: 72px 24px; }
        }

        /* ── Extra Small (xs): < 768px ── */
        @media (max-width: 768px) {
          .hero-heading { font-size: 2.6rem; }
          .section-heading { font-size: 1.9rem; }
          .bento-grid { grid-template-columns: 1fr; }
          .bento-big { grid-column: auto; grid-row: auto; min-height: 220px; }
          .bento-wide { grid-column: auto; }
          .steps-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-section-pad { padding: 48px 16px; }
          .stats-section-pad { padding: 48px 16px; }
          .bento-section-pad { padding: 56px 16px; }
          .howitworks-pad { padding: 56px 16px; }
          .ngo-section-pad { padding: 56px 16px; }
          .cta-section-pad { padding: 56px 16px; }
          .hero-btn-primary, .hero-btn-outline { padding: 13px 22px; font-size: 14px; }
          .cta-btn { padding: 14px 28px; font-size: 14px; }
        }

        @media (max-width: 480px) {
          .hero-heading { font-size: 2.1rem; }
          .section-heading { font-size: 1.65rem; }
        }
      `}</style>

      <Marquee />

      {/* HERO */}
      <div ref={heroRef} style={{ background: T.dark, position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <Blob color="rgba(158,224,110,0.06)" style={{ position: "absolute", top: -80, right: -60, width: 520, height: 520, pointerEvents: "none" }} />
        <Blob color="rgba(30,138,82,0.08)" style={{ position: "absolute", bottom: -120, left: -80, width: 400, height: 400, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(circle, rgba(158,224,110,0.12) 1px, transparent 1px)`, backgroundSize: "36px 36px", opacity: 0.6 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }} className="hero-section-pad">
          <div className="hero-grid">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(158,224,110,0.12)", border: "1px solid rgba(158,224,110,0.25)", borderRadius: 50, padding: "7px 16px", marginBottom: 32 }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: T.lime, fontFamily: "'DM Sans', sans-serif" }}>India's Donation Network</span>
              </motion.div>

              <h1 className="hero-heading" style={{ fontWeight: 800, lineHeight: 1.02, color: T.white, margin: "0 0 24px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}>
                Give More.<br />
                <span style={{ color: T.lime }}>Waste Less.</span><br />
                <span style={{ color: T.sandDark, fontStyle: "italic" }}>Live Better.</span>
              </h1>

              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 500, margin: "0 0 44px", fontFamily: "'DM Sans', sans-serif" }}>
                Connect with verified NGOs across India. Free doorstep pickup. Track every donation in real time.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link to="/donor/donate" className="hero-btn-primary">Start Donating <ArrowRight size={16} /></Link>
                <Link to="/track" className="hero-btn-outline">Track Donation</Link>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                {[{ label: "View NGOs", path: "/ngos" }, { label: "How It Works", path: "#how-it-works" }].map(({ label, path }) => (
                  path.startsWith("#") ? (
                    <a key={label} href={path} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 600, borderBottom: "1px dashed rgba(255,255,255,0.2)", paddingBottom: 1 }}>
                      {label} <ChevronRight size={11} />
                    </a>
                  ) : (
                    <Link key={label} to={path} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", fontWeight: 600, borderBottom: "1px dashed rgba(255,255,255,0.2)", paddingBottom: 1 }}>
                      {label} <ChevronRight size={11} />
                    </Link>
                  )
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 36, flexWrap: "wrap" }}>
                <div style={{ display: "flex" }}>
                  {[T.lime, "#5DCAA5", "#EF9F27", "#85B7EB", "#F09595"].map((c, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: c, border: `2px solid ${T.dark}`, marginLeft: i > 0 ? -8 : 0 }} />
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={T.lime} color={T.lime} />)}
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                    Trusted by <strong style={{ color: "rgba(255,255,255,0.8)" }}>10,000+</strong> donors
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Floating card — hidden on sm/xs */}
            <motion.div className="hero-card-wrap" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ y: heroY, opacity: heroOpacity }}>
              <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "rgba(158,224,110,0.1)", border: "1px solid rgba(158,224,110,0.2)", borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.lime }} />
                    <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: "absolute", inset: 0, borderRadius: "50%", background: T.lime, opacity: 0.4 }} />
                  </div>
                  <span style={{ fontSize: 13, color: T.lime, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>3 donations scheduled today</span>
                </div>
                {[
                  { icon: Package, label: "Items donated this week", value: "284", path: "/track" },
                  { icon: Users, label: "Active NGO partners", value: "183", path: "/ngos" },
                  { icon: Clock, label: "Avg pickup time", value: "24h", path: null },
                ].map(({ icon: Icon, label, value, path }, i) => (
                  <div key={i} onClick={() => path && navigate(path)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 12, gap: 12, cursor: path ? "pointer" : "default" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon size={15} color="rgba(255,255,255,0.4)" />
                      <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: T.white, fontFamily: "'Syne', sans-serif" }}>{value}</span>
                      {path && <ChevronRight size={12} color="rgba(255,255,255,0.3)" />}
                    </div>
                  </div>
                ))}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>Monthly goal</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.lime, fontFamily: "'DM Sans', sans-serif" }}>78%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 50, background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }} style={{ height: "100%", borderRadius: 50, background: T.lime }} />
                  </div>
                </div>
                <Link to="/donor/donate" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 14, background: T.lime, textDecoration: "none", color: T.dark, fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                  Donate Now <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: T.sand }} className="stats-section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ textAlign: "center", padding: "28px 16px", position: "relative" }}>
                {i < 3 && <div style={{ position: "absolute", right: 0, top: "20%", bottom: "20%", width: 1, background: T.sandDark }} />}
                <div style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 800, color: T.green, lineHeight: 1, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* BENTO GRID */}
      <div style={{ background: T.bg }} className="bento-section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ maxWidth: 560, marginBottom: 60 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.greenMid, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ display: "inline-block", width: 24, height: 2, background: T.greenMid }} />Why ReWear 
            </span>
            <h2 className="section-heading" style={{ fontWeight: 800, color: T.text, margin: 0, fontFamily: "'Syne', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Built on trust.<br /><span style={{ color: T.green, fontStyle: "italic" }}>Driven by purpose.</span>
            </h2>
          </motion.div>

          <div className="bento-grid">
            {/* Big card */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ y: -4 }} onClick={() => navigate("/donor/donate")}
              className="bento-big"
              style={{ background: T.dark, borderRadius: 24, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", cursor: "pointer" }}>
              <Blob color="rgba(158,224,110,0.08)" style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: T.lime, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Truck size={24} color={T.dark} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: T.white, margin: "0 0 12px", fontFamily: "'Syne', sans-serif" }}>Free Doorstep Pickup</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>We come to you. Schedule at your convenience — zero travel, zero hassle. Our team handles pickup across 42+ cities.</p>
              </div>
              <div style={{ position: "relative", zIndex: 1, marginTop: 32 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(158,224,110,0.15)", border: "1px solid rgba(158,224,110,0.25)", borderRadius: 50, padding: "8px 16px" }}>
                  <MapPin size={13} color={T.lime} />
                  <span style={{ fontSize: 12.5, color: T.lime, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Schedule pickup →</span>
                </div>
              </div>
            </motion.div>

            {/* Verified NGOs */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }} whileHover={{ y: -4 }} onClick={() => navigate("/ngos")}
              style={{ background: T.limePale, borderRadius: 24, padding: 28, border: `1px solid rgba(158,224,110,0.3)`, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: T.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={22} color={T.white} />
                </div>
                <span style={{ background: T.green, color: T.white, fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 50, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Verified</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: "#173404", margin: "0 0 10px", fontFamily: "'Syne', sans-serif" }}>100% Verified NGOs</h3>
              <p style={{ fontSize: 13.5, color: "#3B6D11", lineHeight: 1.65, margin: "0 0 16px" }}>Every partner undergoes rigorous verification. Your donation always reaches the right hands.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: T.green, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>View all NGOs <ChevronRight size={13} /></div>
            </motion.div>

            {/* Sustainable */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }} whileHover={{ y: -4 }}
              style={{ background: T.surface, borderRadius: 24, padding: 28, border: `1px solid ${T.sandDark}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: T.sand, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Leaf size={22} color={T.green} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: T.text, margin: "0 0 10px", fontFamily: "'Syne', sans-serif" }}>Sustainable Impact</h3>
              <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.65, margin: 0 }}>Reduce waste, promote reuse, and protect the planet — one donation at a time.</p>
            </motion.div>

            {/* Real-time tracking */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.25 }} onClick={() => navigate("/track")}
              className="bento-wide"
              style={{ background: T.surface, borderRadius: 24, padding: 28, border: `1px solid ${T.sandDark}`, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: T.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle2 size={22} color={T.lime} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: T.text, margin: "0 0 6px", fontFamily: "'Syne', sans-serif" }}>Real-Time Tracking</h3>
                  <p style={{ fontSize: 13.5, color: T.muted, margin: 0, lineHeight: 1.6 }}>Watch your donation journey from pickup to delivery. Live status updates, every step.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {["Scheduled", "Picked Up", "Delivered"].map((s, i) => (
                    <React.Fragment key={s}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < 2 ? T.green : T.sand, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {i < 2 ? <CheckCircle2 size={13} color={T.white} /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.muted }} />}
                        </div>
                        <span style={{ fontSize: 10.5, color: i < 2 ? T.green : T.muted, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{s}</span>
                      </div>
                      {i < 2 && <div style={{ width: 32, height: 2, background: i < 1 ? T.green : T.sand, borderRadius: 2, marginBottom: 16 }} />}
                    </React.Fragment>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: T.green, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginLeft: "auto" }}>
                  Track Donations <ChevronRight size={13} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" style={{ background: T.surface }} className="howitworks-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.greenMid, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 14 }}>The Process</span>
            <h2 className="section-heading" style={{ fontWeight: 800, color: T.text, margin: "0 0 20px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
              Giving is this <span style={{ color: T.green, fontStyle: "italic" }}>simple.</span>
            </h2>
            <p style={{ fontSize: 15, color: T.muted, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Four steps. Zero friction. Real impact.</p>
          </motion.div>

          <div className="steps-grid" style={{ marginBottom: 48 }}>
            {steps.map((s, i) => <StepCard key={i} {...s} delay={i * 0.1} />)}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/donor/donate" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.dark, color: T.lime, padding: "14px 32px", borderRadius: 50, fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
              Get Started Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* NGO PARTNERS */}
      <div style={{ background: T.bg }} className="ngo-section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="features-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.greenMid, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ display: "inline-block", width: 24, height: 2, background: T.greenMid }} />Our Partners
              </span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: T.text, margin: "0 0 20px", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>
                Trusted NGOs<br />across India
              </h2>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.75, margin: "0 0 32px" }}>
                We partner only with verified, impact-driven NGOs. Every organisation is vetted for transparency, reach, and genuine community service.
              </p>
              <Link to="/ngos" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: T.green, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderBottom: `2px solid ${T.lime}`, paddingBottom: 2 }}>
                View all partners <ChevronRight size={14} />
              </Link>
              <div style={{ marginTop: 40 }}>
                {[{ icon: ShieldCheck, text: "FCRA & NGO Darpan verified" }, { icon: Users, text: "Dedicated collection teams" }, { icon: Star, text: "Rated 4.8+ by donors" }].map((f, i) => (
                  <FeatureRow key={i} icon={f.icon} text={f.text} />
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ngos.map((n, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <NgoBadge {...n} to="/ngos" />
                </motion.div>
              ))}
              <Link to="/ngos" style={{ textAlign: "center", padding: "16px", borderRadius: 14, border: `1.5px dashed ${T.sandDark}`, cursor: "pointer", textDecoration: "none", display: "block" }}>
                <span style={{ fontSize: 13, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>+179 more NGO partners →</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: T.dark, position: "relative", overflow: "hidden" }} className="cta-section-pad">
        <Blob color="rgba(158,224,110,0.05)" style={{ position: "absolute", top: -100, left: -80, width: 500, height: 500, pointerEvents: "none" }} />
        <Blob color="rgba(30,138,82,0.07)" style={{ position: "absolute", bottom: -80, right: -60, width: 360, height: 360, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="cta-inner">
              <div style={{ flex: 1, minWidth: 280 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.lime, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ display: "inline-block", width: 24, height: 2, background: T.lime }} />Join the Movement
                </span>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontWeight: 800, color: T.white, margin: "0 0 20px", fontFamily: "'Syne', sans-serif", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                  Your clutter is<br /><span style={{ color: T.lime, fontStyle: "italic" }}>someone's treasure.</span>
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0, maxWidth: 500 }}>
                  Join 10,000+ donors across India creating real, lasting change.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
                <Link to="/donor/donate" className="cta-btn">Start Donating Now <ArrowRight size={18} /></Link>
                <Link to="/track" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "rgba(255,255,255,0.65)", padding: "12px 24px", borderRadius: 50, fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)" }}>
                  Track Existing Donation <ChevronRight size={14} />
                </Link>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Free pickup · No account needed · 2 min setup</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
                  {["FCRA Verified", "ISO Certified", "4.9★ Rated"].map((badge, i) => (
                    <span key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "6px 14px", fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}