import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Heart, ShieldCheck, Leaf, Truck,
  Users, Package, Star, CheckCircle2,
  Target, Eye, Zap, Award, Globe, TrendingUp,
  ChevronRight, MapPin,
} from "lucide-react";

/* ─── Design Tokens ───────────────────────────────────────────────── */
const T = {
  bg:       "#F7F5F0",
  surface:  "#FFFFFF",
  dark:     "#0D2B1A",
  green:    "#155E39",
  greenMid: "#1E8A52",
  lime:     "#9EE06E",
  limePale: "#E8F9DB",
  sand:     "#EDE8DC",
  sandDark: "#D8CEB8",
  text:     "#1A2E1E",
  muted:    "#6B7E6F",
  white:    "#FFFFFF",
};

/*
  Breakpoints:
  xs  : < 768px   (mobile phones)
  sm  : 768–992px  (tablets)
  md  : 992–1200px (small laptops)
  lg  : > 1200px   (large desktops)
*/

/* ─── Blob ───────────────────────────────────────────────────────── */
function Blob({ color, style }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path fill={color} d="M47.3,-57.1C59.5,-46.3,66.7,-30.2,68.2,-14C69.7,2.2,65.6,18.5,56.9,31.3C48.2,44.1,34.9,53.4,19.7,59.3C4.5,65.2,-12.7,67.7,-27.8,62.2C-42.9,56.7,-55.9,43.2,-63.4,27.1C-70.9,11,-72.9,-7.7,-67.1,-23.3C-61.3,-38.9,-47.7,-51.4,-33.3,-61.4C-18.9,-71.4,-3.7,-78.9,10.2,-77.8C24.1,-76.7,35.1,-67.9,47.3,-57.1Z" transform="translate(100 100)" />
    </svg>
  );
}

/* ─── Animated Counter ───────────────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  React.useEffect(() => {
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

/* ─── Section Label ──────────────────────────────────────────────── */
function SectionLabel({ text, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ display: "inline-block", width: 24, height: 2, background: light ? T.lime : T.greenMid, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: light ? T.lime : T.greenMid, fontFamily: "'DM Sans', sans-serif" }}>
        {text}
      </span>
    </div>
  );
}

/* ─── Value Card ─────────────────────────────────────────────────── */
function ValueCard({ icon: Icon, title, desc, accent, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(21,94,57,0.1)" }}
      style={{ background: T.surface, borderRadius: 22, padding: "28px 24px", border: `1.5px solid ${T.sandDark}`, position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${accent}, ${T.lime})`, borderRadius: "22px 22px 0 0" }} />
      <div style={{ width: 50, height: 50, borderRadius: 16, background: `${accent}18`, border: `1.5px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Icon size={22} color={accent} />
      </div>
      <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
    </motion.div>
  );
}

/* ─── Team Card ──────────────────────────────────────────────────── */
function TeamCard({ name, role, emoji, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{ background: T.surface, borderRadius: 20, padding: "28px 20px", border: `1.5px solid ${T.sandDark}`, textAlign: "center" }}
    >
      <div style={{ width: 68, height: 68, borderRadius: "50%", margin: "0 auto 16px", background: `${color}18`, border: `2px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
        {emoji}
      </div>
      <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>{name}</p>
      <p style={{ margin: 0, fontSize: 12.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{role}</p>
    </motion.div>
  );
}

/* ─── Timeline Item ──────────────────────────────────────────────── */
function TimelineItem({ year, title, desc, isLast, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 20 }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.lime, border: `3px solid ${T.dark}`, flexShrink: 0, zIndex: 1 }} />
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 40, background: T.sandDark, marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 36 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.greenMid, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{year}</span>
        <p style={{ margin: "4px 0 6px", fontSize: 16, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>{title}</p>
        <p style={{ margin: 0, fontSize: 13.5, color: T.muted, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main About Component ───────────────────────────────────────── */
export default function About() {

  const stats = [
    { to: 24500, suffix: "+", label: "Items Donated"   },
    { to: 183,   suffix: "+", label: "NGO Partners"    },
    { to: 8900,  suffix: "+", label: "Families Helped" },
    { to: 42,    suffix: "",  label: "Cities Covered"  },
  ];

  const values = [
    { icon: Heart,       title: "Compassion First",    accent: "#E07A5F", desc: "Every decision starts with: how does this help the person at the end of this donation chain?" },
    { icon: ShieldCheck, title: "Radical Transparency",accent: T.green,   desc: "Every NGO is FCRA-verified. Every donation is tracked. You always know exactly where your items went." },
    { icon: Leaf,        title: "Sustainable Action",  accent: "#27AE60", desc: "Extending the life of items is one of the most impactful ways to reduce waste. We're building a circular economy." },
    { icon: Zap,         title: "Effortless Giving",   accent: "#F59E0B", desc: "Donating should never be hard. We handle logistics, verification, and reporting so you can focus on giving." },
    { icon: Globe,       title: "National Reach",      accent: "#3B82F6", desc: "From Mumbai to Guwahati, our network spans 42+ cities across India — and we're growing every month." },
    { icon: Award,       title: "Dignity Always",      accent: "#9B72CF", desc: "Items must be in good condition. Every beneficiary deserves quality, not charity. That's non-negotiable." },
  ];

  const team = [
    { name: "Ananya Sharma", role: "Co-founder & CEO",         emoji: "👩‍💼", color: T.green   },
    { name: "Rohan Mehta",   role: "Co-founder & CTO",         emoji: "👨‍💻", color: "#3B82F6" },
    { name: "Priya Nair",    role: "Head of NGO Partnerships",  emoji: "🤝",  color: "#E07A5F" },
    { name: "Karan Singh",   role: "Head of Operations",        emoji: "⚙️",  color: "#F59E0B" },
  ];

  const timeline = [
    { year: "2021", title: "The Idea",            desc: "Two friends frustrated by how hard it was to donate responsibly decided to build a better system." },
    { year: "2022", title: "First 10 NGOs",       desc: "Launched in Mumbai with 10 verified NGO partners and a small but passionate logistics team." },
    { year: "2023", title: "Scaled to 20 Cities", desc: "Expanded across Maharashtra and Karnataka. Crossed 5,000 donations and 50 NGO partners." },
    { year: "2024", title: "42 Cities, 183 NGOs", desc: "Became India's largest doorstep donation network. Reached 8,900+ families directly impacted." },
    { year: "2025", title: "What's Next",         desc: "Real-time impact certificates, AI-based NGO matching, and a target of 1 million items by 2026." },
  ];

  const howItWorks = [
    { num: "01", title: "List Your Items",   desc: "Clothes, books, furniture, electronics — anything in good condition is welcome.", icon: Package    },
    { num: "02", title: "Schedule Pickup",   desc: "Pick a date and time. Our team comes to your door across 42+ cities.",            icon: Truck      },
    { num: "03", title: "We Deliver",        desc: "Items are sorted, verified, and delivered to the right NGO partner.",              icon: Heart      },
    { num: "04", title: "Track Your Impact", desc: "Real-time updates, digital certificate, and a full impact report — always.",      icon: TrendingUp },
  ];

  return (
    <div style={{ background: T.bg, fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; }

        /* ─── Buttons ─────────────────────────────────────────── */
        .ab-btn-lime {
          display: inline-flex; align-items: center; gap: 8px;
          background: #9EE06E; color: #0D2B1A;
          padding: 14px 28px; border-radius: 50px; font-weight: 700;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          border: none; cursor: pointer; text-decoration: none;
          transition: all 0.25s ease; white-space: nowrap;
        }
        .ab-btn-lime:hover {
          background: #8DD05E; transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(158,224,110,0.4);
        }
        .ab-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.85);
          padding: 14px 24px; border-radius: 50px; font-weight: 600;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          border: 1.5px solid rgba(255,255,255,0.25); cursor: pointer;
          text-decoration: none; transition: all 0.25s ease; white-space: nowrap;
        }
        .ab-btn-outline:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.07);
        }

        /* ─── Section padding ─────────────────────────────────── */
        /* lg (>1200px) */
        .ab-section { padding: 100px 24px; }

        /* ─── Typography fluid ─────────────────────────────────── */
        .ab-hero-h1    { font-size: 4.2rem; }     /* lg default  */
        .ab-section-h2 { font-size: 2.8rem; }     /* lg default  */

        /* ─── HERO grid ───────────────────────────────────────── */
        /* lg: 2 col equal */
        .ab-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ─── STATS grid ──────────────────────────────────────── */
        /* lg: 4 col */
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .ab-stat-divider {
          position: absolute; right: 0; top: 20%; bottom: 20%;
          width: 1px; background: #D8CEB8;
        }

        /* ─── TWO col (Mission/Vision, Journey) ───────────────── */
        /* lg: 2 col */
        .ab-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .ab-journey-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        /* ─── FOUR col (How it works) ─────────────────────────── */
        /* lg: 4 col */
        .ab-four-col {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ─── THREE col (Values) ──────────────────────────────── */
        /* lg: 3 col */
        .ab-three-col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ─── FOUR col (Team) ─────────────────────────────────── */
        /* lg: 4 col */
        .ab-team-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ─── CTA inner row ───────────────────────────────────── */
        .ab-cta-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* ══════════════════════════════════════════════════════════
           md : 992px – 1200px  (small laptops / desktops)
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 1200px) {
          .ab-section       { padding: 88px 32px; }
          .ab-hero-h1       { font-size: 3.6rem; }
          .ab-section-h2    { font-size: 2.5rem; }
          .ab-hero-grid     { gap: 48px; }
          .ab-journey-grid  { gap: 56px; }
        }

        /* ══════════════════════════════════════════════════════════
           sm : 768px – 992px  (tablets)
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 992px) {
          .ab-section       { padding: 72px 28px; }
          .ab-hero-h1       { font-size: 3rem; }
          .ab-section-h2    { font-size: 2.2rem; }

          /* Hero: 2-col → 1-col stacked */
          .ab-hero-grid     { grid-template-columns: 1fr; gap: 36px; }

          /* Stats: 4-col → 2-col */
          .ab-stats-grid    { grid-template-columns: repeat(2, 1fr); }

          /* Mission/Vision: 2-col → 1-col */
          .ab-two-col       { grid-template-columns: 1fr; gap: 24px; }

          /* How it works: 4-col → 2-col */
          .ab-four-col      { grid-template-columns: repeat(2, 1fr); }

          /* Values: 3-col → 2-col */
          .ab-three-col     { grid-template-columns: repeat(2, 1fr); }

          /* Journey: 2-col → 1-col */
          .ab-journey-grid  { grid-template-columns: 1fr; gap: 36px; }

          /* Team: 4-col → 2-col */
          .ab-team-grid     { grid-template-columns: repeat(2, 1fr); }

          /* Mission card padding reduce */
          .ab-mission-pad   { padding: 36px 32px !important; }

          /* Stat dividers hidden — they look bad in 2-col */
          .ab-stat-divider  { display: none; }
        }

        /* ══════════════════════════════════════════════════════════
           xs : < 768px  (mobile phones)
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          .ab-section       { padding: 56px 16px; }
          .ab-hero-h1       { font-size: 2.4rem; }
          .ab-section-h2    { font-size: 1.9rem; }

          /* Stats: keep 2-col on mobile */
          .ab-stats-grid    { grid-template-columns: repeat(2, 1fr); }

          /* How it works: 2-col → 1-col on small mobile */
          .ab-four-col      { grid-template-columns: 1fr; }

          /* Values: 2-col → 1-col on mobile */
          .ab-three-col     { grid-template-columns: 1fr; }

          /* Team: keep 2-col on mobile */
          .ab-team-grid     { grid-template-columns: repeat(2, 1fr); }

          /* Mission card full-width comfortable padding */
          .ab-mission-pad   { padding: 28px 22px !important; }

          /* Buttons stack */
          .ab-hero-btns     { flex-direction: column !important; align-items: flex-start !important; }
          .ab-cta-btns      { flex-direction: column !important; align-items: center !important; }

          /* Buttons full-width on mobile */
          .ab-btn-lime, .ab-btn-outline {
            width: 100%; justify-content: center;
            padding: 14px 20px;
          }

          /* Quick facts card padding */
          .ab-glass-card    { padding: 20px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <div style={{
        background: T.dark, minHeight: "90vh", display: "flex",
        alignItems: "center", position: "relative", overflow: "hidden",
      }}>
        <Blob color="rgba(158,224,110,0.06)" style={{ position: "absolute", top: -80, right: -60, width: 520, height: 520, pointerEvents: "none" }} />
        <Blob color="rgba(30,138,82,0.08)"   style={{ position: "absolute", bottom: -120, left: -80, width: 400, height: 400, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(158,224,110,0.1) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.5 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 2 }}>
          <div className="ab-hero-grid">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(158,224,110,0.12)", border: "1px solid rgba(158,224,110,0.25)", borderRadius: 50, padding: "7px 16px", marginBottom: 28 }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: T.lime, fontFamily: "'DM Sans', sans-serif" }}>Our Story</span>
              </motion.div>

              <h1 className="ab-hero-h1" style={{ fontWeight: 800, lineHeight: 1.05, color: T.white, margin: "0 0 22px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}>
                We believe<br />
                <span style={{ color: T.lime }}>giving</span> should<br />
                <span style={{ color: T.sandDark, fontStyle: "italic" }}>be easy.</span>
              </h1>

              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 480, margin: "0 0 40px", fontFamily: "'DM Sans', sans-serif" }}>
                ReWear is India's largest doorstep donation network — connecting people who have more with people who need more. Free pickup. Verified NGOs. Real impact.
              </p>

              <div className="ab-hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/Donate" className="ab-btn-lime">Start Donating <ArrowRight size={16} /></Link>
                <Link to="/ngos"   className="ab-btn-outline">Our NGO Partners</Link>
              </div>
            </motion.div>

            {/* Right — glass info card */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <div className="ab-glass-card" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Quote */}
                <div style={{ background: "rgba(158,224,110,0.08)", border: "1px solid rgba(158,224,110,0.18)", borderRadius: 16, padding: "18px 20px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: T.lime, fontFamily: "'Syne', sans-serif", fontStyle: "italic", lineHeight: 1.5 }}>
                    "Your clutter is someone's treasure."
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>— The ReWear Founding Principle</p>
                </div>
                {/* Quick facts */}
                {[
                  { icon: MapPin,     label: "Headquartered in", value: "Mumbai, India" },
                  { icon: Users,      label: "Team size",         value: "48 members"   },
                  { icon: TrendingUp, label: "Founded",           value: "2021"         },
                  { icon: Globe,      label: "Cities active",     value: "42+ cities"   },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 12, gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Icon size={14} color="rgba(255,255,255,0.35)" />
                      <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.white, fontFamily: "'Syne', sans-serif" }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
          lg: 4-col | sm: 2-col | xs: 2-col
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: T.sand, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="ab-stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ textAlign: "center", padding: "28px 12px", position: "relative" }}
              >
                {/* Divider only visible lg/md — hidden sm/xs via CSS */}
                {i < 3 && <div className="ab-stat-divider" />}
                <div style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", fontWeight: 800, color: T.green, lineHeight: 1, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 500, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MISSION + VISION
          lg/md: 2-col | sm/xs: 1-col
      ══════════════════════════════════════════════════════ */}
      <div className="ab-section" style={{ background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="ab-two-col">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="ab-mission-pad"
              style={{ background: T.dark, borderRadius: 28, padding: "44px 40px", position: "relative", overflow: "hidden" }}
            >
              <Blob color="rgba(158,224,110,0.06)" style={{ position: "absolute", bottom: -60, right: -60, width: 260, height: 260, pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(158,224,110,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <Target size={24} color={T.lime} />
                </div>
                <SectionLabel text="Our Mission" light />
                <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: T.white, margin: "0 0 16px", fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>
                  Make donating as easy as throwing away.
                </h2>
                <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                  Millions of usable items end up in landfills every year in India while millions of families lack basic necessities. ReWear exists to close that gap — with free doorstep pickup, verified NGO delivery, and complete donation transparency.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.12 }}
              className="ab-mission-pad"
              style={{ background: T.limePale, borderRadius: 28, padding: "44px 40px", border: "1.5px solid rgba(158,224,110,0.3)", overflow: "hidden" }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 16, background: T.green, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <Eye size={24} color={T.white} />
              </div>
              <SectionLabel text="Our Vision" />
              <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: T.text, margin: "0 0 16px", fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>
                A circular India where nothing useful goes to waste.
              </h2>
              <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: T.muted, lineHeight: 1.75, margin: "0 0 24px", fontFamily: "'DM Sans', sans-serif" }}>
                We envision an India where every family has access to quality essentials — not through charity, but through community. Where giving is a reflex, not a chore.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["1M items donated by 2026", "All 100 major cities covered", "Carbon-neutral logistics by 2027"].map((goal, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={11} color={T.white} />
                    </div>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#27500A", fontFamily: "'DM Sans', sans-serif" }}>{goal}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
          lg/md: 4-col | sm: 2-col | xs: 1-col
      ══════════════════════════════════════════════════════ */}
      <div className="ab-section" style={{ background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel text="How ReWear Works" />
            <h2 className="ab-section-h2" style={{ fontWeight: 800, color: T.text, margin: 0, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
              Four steps to <span style={{ color: T.green, fontStyle: "italic" }}>real impact.</span>
            </h2>
          </motion.div>

          <div className="ab-four-col">
            {howItWorks.map(({ num, title, desc, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                style={{ background: T.bg, borderRadius: 20, padding: "28px 22px", border: `1px solid ${T.sandDark}`, position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: -10, right: 14, fontSize: 72, fontWeight: 900, color: T.limePale, fontFamily: "'Syne', sans-serif", lineHeight: 1, userSelect: "none" }}>{num}</div>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: T.lime, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, position: "relative" }}>
                  <Icon size={20} color={T.dark} />
                </div>
                <p style={{ fontWeight: 700, fontSize: 15, color: T.text, margin: "0 0 8px", fontFamily: "'Syne', sans-serif" }}>{title}</p>
                <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.7, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} style={{ textAlign: "center", marginTop: 44 }}>
            <Link to="/Donate" className="ab-btn-lime" style={{ background: T.dark, color: T.lime }}>
              Start Donating Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OUR VALUES
          lg: 3-col | sm: 2-col | xs: 1-col
      ══════════════════════════════════════════════════════ */}
      <div className="ab-section" style={{ background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 560, marginBottom: 52 }}>
            <SectionLabel text="Our Values" />
            <h2 className="ab-section-h2" style={{ fontWeight: 800, color: T.text, margin: 0, fontFamily: "'Syne', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              What we stand for,<br />
              <span style={{ color: T.green, fontStyle: "italic" }}>every single day.</span>
            </h2>
          </motion.div>
          <div className="ab-three-col">
            {values.map((v, i) => <ValueCard key={i} {...v} delay={i * 0.08} />)}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          OUR JOURNEY
          lg/md: 2-col | sm/xs: 1-col
      ══════════════════════════════════════════════════════ */}
      <div className="ab-section" style={{ background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="ab-journey-grid">

            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionLabel text="Our Journey" />
              <h2 className="ab-section-h2" style={{ fontWeight: 800, color: T.text, margin: "0 0 18px", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>
                From a small idea<br />
                <span style={{ color: T.green, fontStyle: "italic" }}>to national impact.</span>
              </h2>
              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.75, margin: "0 0 32px", fontFamily: "'DM Sans', sans-serif" }}>
                What started as two friends trying to donate clothes responsibly has grown into India's most trusted donation platform — with 24,500+ items donated and 183 verified NGO partners.
              </p>
              <Link to="/Donate" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: T.green, fontWeight: 700, fontSize: 14, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderBottom: `2px solid ${T.lime}`, paddingBottom: 2 }}>
                Be part of the story <ChevronRight size={14} />
              </Link>
            </motion.div>

            <div style={{ paddingTop: 8 }}>
              {timeline.map((item, i) => (
                <TimelineItem key={i} {...item} isLast={i === timeline.length - 1} delay={i * 0.1} />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TEAM
          lg: 4-col | sm: 2-col | xs: 2-col
      ══════════════════════════════════════════════════════ */}
      <div className="ab-section" style={{ background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel text="The Team" />
            <h2 className="ab-section-h2" style={{ fontWeight: 800, color: T.text, margin: 0, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
              People who care <span style={{ color: T.green, fontStyle: "italic" }}>deeply.</span>
            </h2>
          </motion.div>
          <div className="ab-team-grid">
            {team.map((m, i) => <TeamCard key={i} {...m} delay={i * 0.1} />)}
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}
          >
            …and 44 more people working behind the scenes across logistics, tech, and community outreach.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          TRUST BADGES
          All sizes: flex-wrap centered
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: T.sand, padding: "52px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 12 }}
          >
            {[
              { icon: ShieldCheck, label: "FCRA Verified NGOs"    },
              { icon: Award,       label: "ISO 9001 Certified"    },
              { icon: Star,        label: "4.9★ Donor Rating"     },
              { icon: Leaf,        label: "Carbon Conscious"      },
              { icon: Globe,       label: "NGO Darpan Registered" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: T.surface, border: `1.5px solid ${T.sandDark}`, borderRadius: 50, padding: "11px 18px" }}
              >
                <Icon size={15} color={T.green} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CTA
          All sizes: centered, buttons stack on xs
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: T.dark, padding: "96px 24px", position: "relative", overflow: "hidden" }}>
        <Blob color="rgba(158,224,110,0.05)" style={{ position: "absolute", top: -100, left: -80, width: 500, height: 500, pointerEvents: "none" }} />
        <Blob color="rgba(30,138,82,0.07)"   style={{ position: "absolute", bottom: -80, right: -60, width: 360, height: 360, pointerEvents: "none" }} />

        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 22 }}>
              <span style={{ display: "inline-block", width: 24, height: 2, background: T.lime }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.lime, fontFamily: "'DM Sans', sans-serif" }}>Join 10,000+ donors</span>
              <span style={{ display: "inline-block", width: 24, height: 2, background: T.lime }} />
            </div>

            <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)", fontWeight: 800, color: T.white, margin: "0 0 18px", fontFamily: "'Syne', sans-serif", lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              Ready to make your<br />
              <span style={{ color: T.lime, fontStyle: "italic" }}>items matter?</span>
            </h2>

            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 auto 36px", maxWidth: 460, fontFamily: "'DM Sans', sans-serif" }}>
              Schedule a free pickup today. Takes 2 minutes. Your donation goes directly to a verified NGO — and you'll see exactly who it helped.
            </p>

            <div className="ab-cta-btns" style={{ marginBottom: 24 }}>
              <Link to="/Donate" className="ab-btn-lime">Schedule a Pickup <ArrowRight size={16} /></Link>
              <Link to="/ngos"   className="ab-btn-outline">Meet Our NGOs</Link>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {["FCRA Verified", "Free Pickup", "Real-time Tracking", "2 min setup"].map((b, i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>{b}</span>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

    </div>
  );
}