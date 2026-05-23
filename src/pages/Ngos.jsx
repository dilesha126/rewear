import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Search, ArrowRight, ChevronRight, CheckCircle2, Mail, Globe, X, ExternalLink, Gift,
  Building, Award,
} from "lucide-react";

/* ─── Design Tokens (matches all other pages) ─────────────────────── */
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

/* ─── NGO Data ────────────────────────────────────────────────────── */
const NGOS = [
  {
    id: 1,
    name: "Goonj Foundation",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Community",
    typeColor: "#E8F4FD",
    typeText: "#1D6FA4",
    rating: 4.9,
    reviews: 312,
    items: "1,250",
    since: 1999,
    verified: true,
    fcra: true,
    focus: ["Clothes", "Bedding", "Household"],
    desc: "Goonj converts urban surplus into rural resource material, treating dignity as core to every donation.",
    impact: "2M+ people reached",
    email: "info@goonj.org",
    website: "goonj.org",
    icon: "🌿",
  },
  {
    id: 2,
    name: "Smile Foundation",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Children",
    typeColor: "#FFF4E5",
    typeText: "#B45309",
    rating: 4.8,
    reviews: 248,
    items: "980",
    since: 2002,
    verified: true,
    fcra: true,
    focus: ["Books", "Toys", "Stationery"],
    desc: "Empowering underprivileged children through education, healthcare, and livelihood programs.",
    impact: "1.5M children served",
    email: "info@smilefoundationindia.org",
    website: "smilefoundationindia.org",
    icon: "😊",
  },
  {
    id: 3,
    name: "Akshaya Patra",
    city: "Bangalore",
    state: "Karnataka",
    type: "Food & More",
    typeColor: "#F0FDF4",
    typeText: "#166534",
    rating: 4.9,
    reviews: 503,
    items: "2,100",
    since: 2000,
    verified: true,
    fcra: true,
    focus: ["Kitchenware", "Electronics", "Clothes"],
    desc: "India's largest mid-day meal programme, reaching over 2 million children in government schools.",
    impact: "2M+ meals daily",
    email: "communications@akshayapatra.org",
    website: "akshayapatra.org",
    icon: "🍱",
  },
  {
    id: 4,
    name: "CRY India",
    city: "Delhi",
    state: "Delhi NCR",
    type: "Child Rights",
    typeColor: "#FFF1F3",
    typeText: "#9F1239",
    rating: 4.7,
    reviews: 189,
    items: "760",
    since: 1979,
    verified: true,
    fcra: true,
    focus: ["Books", "Clothes", "Toys"],
    desc: "Child Rights and You — working to ensure every child's right to education, health, and protection.",
    impact: "3M+ children impacted",
    email: "info@cry.org",
    website: "cry.org",
    icon: "🧒",
  },
  {
    id: 5,
    name: "Pratham Education",
    city: "Pune",
    state: "Maharashtra",
    type: "Education",
    typeColor: "#F5F3FF",
    typeText: "#6D28D9",
    rating: 4.8,
    reviews: 165,
    items: "530",
    since: 1995,
    verified: true,
    fcra: false,
    focus: ["Books", "Stationery", "Electronics"],
    desc: "Providing quality education to underprivileged children across India through innovative learning programs.",
    impact: "10M+ learners reached",
    email: "info@pratham.org",
    website: "pratham.org",
    icon: "📖",
  },
  {
    id: 6,
    name: "Uday Foundation",
    city: "Hyderabad",
    state: "Telangana",
    type: "Healthcare",
    typeColor: "#EFF6FF",
    typeText: "#1D4ED8",
    rating: 4.6,
    reviews: 92,
    items: "420",
    since: 2004,
    verified: true,
    fcra: false,
    focus: ["Clothes", "Bedding", "Kitchenware"],
    desc: "Supporting families of children with congenital disabilities through medical aid and community support.",
    impact: "500K+ families helped",
    email: "contact@udayfoundation.org",
    website: "udayfoundation.org",
    icon: "💙",
  },
  {
    id: 7,
    name: "HelpAge India",
    city: "Kolkata",
    state: "West Bengal",
    type: "Elderly Care",
    typeColor: "#FFFBEB",
    typeText: "#92400E",
    rating: 4.7,
    reviews: 211,
    items: "640",
    since: 1978,
    verified: true,
    fcra: true,
    focus: ["Clothes", "Bedding", "Furniture"],
    desc: "Working to improve the quality of life of disadvantaged elderly through mobile healthcare, care homes and more.",
    impact: "4M+ elders reached",
    email: "mail@helpageindia.org",
    website: "helpageindia.org",
    icon: "👴",
  },
  {
    id: 8,
    name: "Teach For India",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Education",
    typeColor: "#F5F3FF",
    typeText: "#6D28D9",
    rating: 4.8,
    reviews: 137,
    items: "380",
    since: 2008,
    verified: true,
    fcra: false,
    focus: ["Books", "Stationery", "Electronics"],
    desc: "A movement of young leaders teaching in low-income schools, building a pipeline of change agents.",
    impact: "38K+ students impacted",
    email: "info@teachforindia.org",
    website: "teachforindia.org",
    icon: "✏️",
  },
  {
    id: 9,
    name: "SOS Children's Villages",
    city: "Jaipur",
    state: "Rajasthan",
    type: "Children",
    typeColor: "#FFF4E5",
    typeText: "#B45309",
    rating: 4.9,
    reviews: 278,
    items: "910",
    since: 1964,
    verified: true,
    fcra: true,
    focus: ["Clothes", "Toys", "Books", "Bedding"],
    desc: "Providing loving homes and education to orphaned and abandoned children across India.",
    impact: "20K+ children in care",
    email: "sos@sosindia.org",
    website: "sosindia.org",
    icon: "🏡",
  },
];

const CATEGORIES = ["All", "Children", "Education", "Community", "Healthcare", "Elderly Care", "Child Rights", "Food & More"];
const CITIES = ["All Cities", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Jaipur"];

/* ─── NGO Detail Modal ────────────────────────────────────────────── */
function NgoModal({ ngo, onClose, onDonate }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(13,43,26,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24, backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: T.surface, borderRadius: 28, width: "100%", maxWidth: 520,
          maxHeight: "90vh", overflowY: "auto", position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ background: T.dark, borderRadius: "28px 28px 0 0", padding: "32px 32px 28px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 18, right: 18, width: 32, height: 32,
              borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          ><X size={14} color="rgba(255,255,255,0.6)" /></button>

          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", background: "rgba(158,224,110,0.15)",
              border: "2px solid rgba(158,224,110,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, flexShrink: 0,
            }}>{ngo.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: T.white, fontFamily: "'Syne', sans-serif" }}>{ngo.name}</h2>
                {ngo.verified && <CheckCircle2 size={16} color={T.lime} />}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                <MapPin size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />{ngo.city}, {ngo.state} · Est. {ngo.since}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { label: "Rating", value: `★ ${ngo.rating}` },
              { label: "Items", value: ngo.items },
              { label: "Impact", value: ngo.impact },
            ].map(({ label, value }) => (
              <div key={label} style={{
                flex: 1, minWidth: 90, background: "rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: T.lime, fontFamily: "'Syne', sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ margin: 0, fontSize: 14, color: T.muted, lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{ngo.desc}</p>

          {/* Badges */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ngo.fcra && (
              <span style={{ background: T.limePale, color: "#27500A", fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
                ✓ FCRA Verified
              </span>
            )}
            {ngo.verified && (
              <span style={{ background: T.limePale, color: "#27500A", fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
                ✓ NGO Darpan
              </span>
            )}
            <span style={{
              background: ngo.typeColor, color: ngo.typeText,
              fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif",
            }}>{ngo.type}</span>
          </div>

          {/* Accepts */}
          <div>
            <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Accepts</p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {ngo.focus.map(f => (
                <span key={f} style={{ background: T.bg, border: `1px solid ${T.sandDark}`, color: T.text, fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ background: T.bg, borderRadius: 16, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <a href={`mailto:${ngo.email}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <Mail size={14} color={T.greenMid} />
              <span style={{ fontSize: 13, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{ngo.email}</span>
            </a>
            <div style={{ height: 1, background: T.sandDark }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Globe size={14} color={T.greenMid} />
              <span style={{ fontSize: 13, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{ngo.website}</span>
              <ExternalLink size={11} color={T.muted} />
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 14px 36px rgba(158,224,110,0.38)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onDonate(ngo)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "15px", borderRadius: 50, background: T.dark, border: "none", cursor: "pointer",
              color: T.lime, fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Donate to {ngo.name.split(" ")[0]} <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── NGO Card ────────────────────────────────────────────────────── */
function NgoCard({ ngo, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ y: -5, boxShadow: "0 16px 48px rgba(21,94,57,0.10)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: T.surface, border: `1.5px solid ${T.sandDark}`,
        borderRadius: 22, overflow: "hidden", cursor: "pointer",
        display: "flex", flexDirection: "column",
      }}
      onClick={() => onView(ngo)}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${T.green}, ${T.lime})` }} />

      <div style={{ padding: "22px 22px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: 50, height: 50, borderRadius: "50%",
            background: T.limePale, border: `2px solid rgba(158,224,110,0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, flexShrink: 0,
          }}>{ngo.icon}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {ngo.fcra && (
              <span style={{
                background: T.limePale, color: "#27500A",
                fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                fontFamily: "'DM Sans', sans-serif",
              }}>FCRA</span>
            )}
            {ngo.verified && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                background: T.dark, color: T.lime,
                fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                fontFamily: "'DM Sans', sans-serif",
              }}><CheckCircle2 size={9} /> Verified</span>
            )}
          </div>
        </div>

        {/* Name + location */}
        <div>
          <h3 style={{ margin: "0 0 5px", fontSize: 16, fontWeight: 800, color: T.text, fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>{ngo.name}</h3>
          <p style={{ margin: 0, fontSize: 12, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>
            <MapPin size={10} style={{ verticalAlign: "middle", marginRight: 3 }} />
            {ngo.city}, {ngo.state}
          </p>
        </div>

        {/* Description */}
        <p style={{
          margin: 0, fontSize: 13, color: T.muted, lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{ngo.desc}</p>

        {/* Focus tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {ngo.focus.slice(0, 3).map(f => (
            <span key={f} style={{
              background: T.bg, border: `1px solid ${T.sandDark}`,
              fontSize: 11, fontWeight: 600, color: T.text,
              padding: "3px 10px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif",
            }}>{f}</span>
          ))}
          {ngo.focus.length > 3 && (
            <span style={{ fontSize: 11, color: T.muted, padding: "3px 6px", fontFamily: "'DM Sans', sans-serif" }}>+{ngo.focus.length - 3}</span>
          )}
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: 12, padding: "12px 0",
          borderTop: `1px solid ${T.sand}`, marginTop: "auto",
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: T.green, fontFamily: "'Syne', sans-serif" }}>★ {ngo.rating}</p>
            <p style={{ margin: "2px 0 0", fontSize: 10.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{ngo.reviews} reviews</p>
          </div>
          <div style={{ width: 1, background: T.sand }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>{ngo.items}</p>
            <p style={{ margin: "2px 0 0", fontSize: 10.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>items donated</p>
          </div>
          <div style={{ width: 1, background: T.sand }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif", lineHeight: 1.3 }}>{ngo.impact}</p>
            <p style={{ margin: "2px 0 0", fontSize: 10.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>since {ngo.since}</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: "14px 22px", borderTop: `1px solid ${T.sand}`, background: T.bg }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: ngo.typeColor, color: ngo.typeText,
            fontSize: 11, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {ngo.type}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: T.green, fontSize: 12.5, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
            View Details <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main NGOs Component ─────────────────────────────────────────── */
export default function NGOs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCity, setActiveCity] = useState("All Cities");
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [fcraOnly, setFcraOnly] = useState(false);

  const filtered = NGOS.filter(n => {
    const matchSearch = n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.city.toLowerCase().includes(search.toLowerCase()) ||
      n.focus.some(f => f.toLowerCase().includes(search.toLowerCase()));
    const matchCat = activeCategory === "All" || n.type === activeCategory;
    const matchCity = activeCity === "All Cities" || n.city === activeCity;
    const matchFcra = !fcraOnly || n.fcra;
    return matchSearch && matchCat && matchCity && matchFcra;
  });

  const handleDonate = (ngo) => {
    setSelectedNgo(null);
    navigate("/donor/donate", { state: { preselectedNgo: ngo } });
  };

  const globalStats = [
    { icon: Building, value: "183+", label: "NGO Partners" },
    { icon: CheckCircle2, value: "100%", label: "Verified" },
    { icon: MapPin, value: "42+", label: "Cities Covered" },
    { icon: Gift, value: "24.5K+", label: "Items Donated" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; }

        .ngo-search {
          width: 100%; padding: 14px 18px 14px 46px;
          border-radius: 50px; border: 1.5px solid ${T.sandDark};
          background: ${T.surface}; font-size: 14px;
          font-family: 'DM Sans', sans-serif; color: ${T.text};
          outline: none; transition: border-color 0.2s;
        }
        .ngo-search:focus { border-color: ${T.greenMid}; box-shadow: 0 0 0 3px rgba(30,138,82,0.08); }
        .ngo-search::placeholder { color: ${T.muted}; }

        .cat-pill {
          padding: 8px 18px; border-radius: 50px;
          border: 1.5px solid ${T.sandDark};
          background: ${T.surface}; font-size: 12.5px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; color: ${T.muted};
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .cat-pill:hover { border-color: ${T.greenMid}; color: ${T.text}; }
        .cat-pill.active { background: ${T.dark}; color: ${T.lime}; border-color: ${T.dark}; }

        .city-select {
          padding: 9px 36px 9px 14px; border-radius: 50px;
          border: 1.5px solid ${T.sandDark}; background: ${T.surface};
          font-size: 12.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: ${T.text}; cursor: pointer; outline: none; appearance: none;
          transition: border-color 0.2s;
        }
        .city-select:focus { border-color: ${T.greenMid}; }

        .fcra-toggle {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 50px;
          border: 1.5px solid ${T.sandDark}; background: ${T.surface};
          font-size: 12.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: ${T.muted}; cursor: pointer; transition: all 0.2s;
        }
        .fcra-toggle.active { background: ${T.limePale}; color: #27500A; border-color: rgba(158,224,110,0.5); }

        .ngos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .ngos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ngos-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .filter-bar { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Header bar ── */}
        <div style={{ background: T.dark, padding: "0 24px" }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 60,
          }}>
            <Link to="/" style={{ fontSize: 15, fontWeight: 700, color: T.lime, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em", textDecoration: "none" }}>
              ReWear
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Link to="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>Home</Link>
              <Link to="/donor/donate" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>Donate</Link>
              <Link to="/track" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>Track</Link>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>NGO Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains unchanged */}
        {/* ── Hero Banner ── */}
        <div style={{ background: T.dark, padding: "64px 24px 80px", position: "relative", overflow: "hidden" }}>
          {/* Dot pattern */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `radial-gradient(circle, rgba(158,224,110,0.10) 1px, transparent 1px)`,
            backgroundSize: "36px 36px", opacity: 0.5,
          }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(158,224,110,0.12)", border: "1px solid rgba(158,224,110,0.25)",
                  borderRadius: 50, padding: "7px 16px", marginBottom: 24,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: T.lime, fontFamily: "'DM Sans', sans-serif" }}>
                  Verified Partners
                </span>
              </motion.div>

              <h1 style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 800, color: T.white,
                margin: "0 0 16px", fontFamily: "'Syne', sans-serif", lineHeight: 1.05, letterSpacing: "-0.03em",
              }}>
                Trusted NGOs,<br />
                <span style={{ color: T.lime, fontStyle: "italic" }}>Real Impact.</span>
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 520, margin: "0 0 40px", fontFamily: "'DM Sans', sans-serif" }}>
                Every partner is FCRA-verified, NGO Darpan registered, and rated by our donor community. Your donations reach the people who need them most.
              </p>

              {/* Global stats */}
              <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 640 }}>
                {globalStats.map(({ icon: Icon, value, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16, padding: "16px 14px", textAlign: "center",
                    }}
                  >
                    <Icon size={18} color={T.lime} style={{ marginBottom: 8 }} />
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: T.white, fontFamily: "'Syne', sans-serif" }}>{value}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 10.5, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 80px" }}>

          {/* ── Search + Filters ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ marginBottom: 40 }}
          >
            {/* Search bar */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <Search size={16} color={T.muted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                className="ngo-search"
                type="text"
                placeholder="Search NGOs by name, city, or category…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: T.sand, border: "none", borderRadius: "50%", width: 22, height: 22,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                ><X size={11} color={T.muted} /></button>
              )}
            </div>

            {/* Filter bar */}
            <div className="filter-bar" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`cat-pill${activeCategory === cat ? " active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >{cat}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                {/* City select */}
                <div style={{ position: "relative" }}>
                  <select className="city-select" value={activeCity} onChange={e => setActiveCity(e.target.value)}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronRight size={12} color={T.muted} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%) rotate(90deg)", pointerEvents: "none" }} />
                </div>
                {/* FCRA toggle */}
                <button
                  className={`fcra-toggle${fcraOnly ? " active" : ""}`}
                  onClick={() => setFcraOnly(f => !f)}
                >
                  <Award size={13} />
                  FCRA Only
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 13.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>
              Showing <strong style={{ color: T.text }}>{filtered.length}</strong> of <strong style={{ color: T.text }}>{NGOS.length}</strong> partners
            </p>
            {(search || activeCategory !== "All" || activeCity !== "All Cities" || fcraOnly) && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); setActiveCity("All Cities"); setFcraOnly(false); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "6px 14px", borderRadius: 50, border: `1px solid ${T.sandDark}`,
                  background: T.surface, fontSize: 12, color: T.muted,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                }}
              >
                <X size={11} /> Clear filters
              </button>
            )}
          </div>

          {/* NGO Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="ngos-grid">
                {filtered.map((ngo, i) => (
                  <motion.div
                    key={ngo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <NgoCard ngo={ngo} onView={setSelectedNgo} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ textAlign: "center", padding: "72px 24px", background: T.surface, borderRadius: 20, border: `1.5px dashed ${T.sandDark}` }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 16, color: T.text, fontFamily: "'Syne', sans-serif" }}>No results found</p>
                <p style={{ margin: 0, fontSize: 13.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Try adjusting your search or filters.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: 72, background: T.dark, borderRadius: 28, padding: "56px 48px", position: "relative", overflow: "hidden" }}
          >
            {/* dot pattern */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `radial-gradient(circle, rgba(158,224,110,0.08) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: T.lime, fontFamily: "'DM Sans', sans-serif",
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
                }}>
                  <span style={{ display: "inline-block", width: 20, height: 2, background: T.lime }} />
                  Ready to help?
                </span>
                <h2 style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: T.white,
                  margin: "0 0 14px", fontFamily: "'Syne', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em",
                }}>
                  Donate to any of<br />
                  <span style={{ color: T.lime, fontStyle: "italic" }}>183+ verified NGOs.</span>
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, maxWidth: 440, fontFamily: "'DM Sans', sans-serif" }}>
                  Free pickup · Real-time tracking · Impact certificate — your giving journey starts here.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(158,224,110,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/donor/donate")}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "16px 36px", borderRadius: 50, background: T.lime,
                    border: "none", cursor: "pointer", color: T.dark,
                    fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Start Donating <ArrowRight size={17} />
                </motion.button>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Free Pickup", "Verified NGOs", "Impact Report"].map((b, i) => (
                    <span key={i} style={{
                      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 50, padding: "5px 13px", fontSize: 11, fontWeight: 600,
                      color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedNgo && (
          <NgoModal ngo={selectedNgo} onClose={() => setSelectedNgo(null)} onDonate={handleDonate} />
        )}
      </AnimatePresence>
    </>
  );
}