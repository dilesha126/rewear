import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Package, MapPin, Clock, Heart, CheckCircle2,
  Truck, ChevronDown, ArrowRight,
  Users, Gift, Circle,
  BarChart2, Leaf, RefreshCw, Home, Calendar,
} from "lucide-react";
import { useDonations } from "./Donationcontex";

const T = {
  bg: "#F7F5F0", surface: "#FFFFFF", dark: "#0D2B1A",
  green: "#155E39", greenMid: "#1E8A52", lime: "#9EE06E",
  limePale: "#E8F9DB", sand: "#EDE8DC", sandDark: "#D8CEB8",
  text: "#1A2E1E", muted: "#6B7E6F", white: "#FFFFFF",
};

const STATUS_CONFIG = {
  scheduled: { bg: "#FEF3C7", color: "#F59E0B", dot: "#F59E0B", icon: Clock, label: "Scheduled" },
  in_transit: { bg: "#EFF6FF", color: "#3B82F6", dot: "#3B82F6", icon: Truck, label: "In Transit" },
  delivered: { bg: T.limePale, color: T.green, dot: T.greenMid, icon: CheckCircle2, label: "Delivered" },
};

function TimelineStep({ step, index, isLast }) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }}
      style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 22, flexShrink: 0 }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: step.done ? T.green : T.sandDark, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {step.done ? <CheckCircle2 size={13} color={T.white} /> : <Circle size={10} color={T.muted} />}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 24, background: step.done ? T.green : T.sandDark, borderRadius: 2, marginTop: 4 }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 20 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: step.done ? T.text : T.muted, fontFamily: "'Syne', sans-serif" }}>{step.label}</p>
        <p style={{ margin: "2px 0 0", fontSize: 11.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{step.time}</p>
      </div>
    </motion.div>
  );
}

function DonationCard({ donation }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[donation.status] || STATUS_CONFIG.scheduled;
  const totalItems = donation.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: T.surface, border: `1.5px solid ${T.sandDark}`, borderRadius: 20, overflow: "hidden" }}>
      <div onClick={() => setExpanded(e => !e)} style={{ padding: "20px 22px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: T.text, fontFamily: "'Syne', sans-serif" }}>{donation.id}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />{cfg.label}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>
              <MapPin size={10} style={{ verticalAlign: "middle", marginRight: 3 }} />{donation.ngo} · {donation.city}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 11.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{donation.date}</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}
              style={{ width: 28, height: 28, borderRadius: 8, background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ChevronDown size={14} color={T.muted} />
            </motion.div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center" }}>
          {donation.items.map((item, i) => (
            <span key={i} style={{ background: T.bg, border: `1px solid ${T.sandDark}`, fontSize: 11.5, fontWeight: 600, color: T.text, padding: "4px 11px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
              {item.icon} {item.name} ×{item.quantity}
            </span>
          ))}
          <span style={{ marginLeft: "auto", background: T.dark, color: T.lime, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div key="expand" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "20px 22px 22px", borderTop: `1px solid ${T.sandDark}` }}>
              {/* Responsive expand grid */}
              <div className="card-expand-grid">
                <div>
                  <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Delivery Timeline</p>
                  {donation.timeline.map((step, i) => (
                    <TimelineStep key={i} step={step} index={i} isLast={i === donation.timeline.length - 1} />
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Pickup Info</p>
                  <div style={{ background: T.bg, borderRadius: 14, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Calendar size={13} color={T.greenMid} /><span style={{ fontSize: 12.5, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{donation.date}</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Clock size={13} color={T.greenMid} /><span style={{ fontSize: 12.5, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{donation.time}</span></div>
                    {donation.address && (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><Home size={13} color={T.greenMid} style={{ marginTop: 2, flexShrink: 0 }} /><span style={{ fontSize: 12.5, color: T.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{donation.address}</span></div>
                    )}
                  </div>
                  {donation.status === "delivered" && (
                    <div style={{ background: T.limePale, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, border: `1px solid rgba(158,224,110,0.3)` }}>
                      <Leaf size={15} color={T.green} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#27500A", fontFamily: "'DM Sans', sans-serif" }}>{donation.impact}</span>
                    </div>
                  )}
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/donate")}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 16px", borderRadius: 12, background: T.dark, border: "none", cursor: "pointer", color: T.lime, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                    <RefreshCw size={13} color={T.lime} /> Donate Again
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FilterTab({ label, active, onClick, count }) {
  return (
    <button onClick={onClick}
      style={{ padding: "9px 20px", borderRadius: 50, border: `1.5px solid ${active ? T.dark : T.sandDark}`, background: active ? T.dark : T.surface, color: active ? T.lime : T.muted, fontSize: 12.5, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, transition: "all 0.2s" }}>
      {label}
      <span style={{ background: active ? "rgba(158,224,110,0.2)" : T.sandDark, color: active ? T.lime : T.muted, fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20 }}>{count}</span>
    </button>
  );
}

export default function Track() {
  const navigate = useNavigate();
  const { donations } = useDonations();
  const [filter, setFilter] = useState("all");

  const FILTERS = [
    { key: "all", label: "All" }, { key: "scheduled", label: "Scheduled" },
    { key: "in_transit", label: "In Transit" }, { key: "delivered", label: "Delivered" },
  ];

  const filtered = filter === "all" ? donations : donations.filter(d => d.status === filter);
  const totalItems = donations.reduce((s, d) => s + d.items.reduce((a, i) => a + i.quantity, 0), 0);
  const delivered = donations.filter(d => d.status === "delivered").length;
  const ngoCount = new Set(donations.map(d => d.ngo)).size;
  const co2Saved = Math.round(totalItems * 0.5);

  const IMPACT_STATS = [
    { icon: Gift, label: "Total Items Donated", value: totalItems, unit: "items" },
    { icon: Users, label: "Donations Delivered", value: delivered, unit: "done" },
    { icon: Heart, label: "NGOs Supported", value: ngoCount, unit: "partners" },
    { icon: Leaf, label: "CO₂ Saved (est.)", value: co2Saved, unit: "kg" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }

        /* lg > 1200px */
        .impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .filters-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .card-expand-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .track-page-pad { padding: 56px 24px 80px; }
        .track-cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }

        /* md 992–1200px */
        @media (max-width: 1200px) {
          .impact-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* sm 768–992px */
        @media (max-width: 992px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr); }
          .filters-row { flex-direction: column; align-items: flex-start; }
          .card-expand-grid { grid-template-columns: 1fr; }
          .track-cta-inner { flex-direction: column; }
        }

        /* xs < 768px */
        @media (max-width: 768px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .track-page-pad { padding: 40px 16px 64px; }
          .filters-row { flex-direction: column; align-items: flex-start; gap: 10px; }
          .filter-tabs { flex-wrap: wrap; gap: 6px !important; }
          .track-cta-inner { flex-direction: column; padding: 28px 24px !important; }
        }

        @media (max-width: 480px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ background: T.dark, padding: "0 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.lime, fontFamily: "'Syne', sans-serif" }}>ReWear</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>Tracking Portal</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto" }} className="track-page-pad">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.greenMid, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ display: "inline-block", width: 22, height: 2, background: T.greenMid }} />Your Giving Journey
            </span>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, color: T.text, margin: 0, fontFamily: "'Syne', sans-serif", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
              Every item,<br /><span style={{ color: T.green, fontStyle: "italic" }}>every impact.</span>
            </h1>
          </motion.div>

          {/* Impact Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <BarChart2 size={16} color={T.greenMid} />
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>Your Impact Summary</h2>
            </div>
            <div className="impact-grid">
              {IMPACT_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}
                    style={{ background: T.surface, border: `1.5px solid ${T.sandDark}`, borderRadius: 20, padding: "22px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: T.limePale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color={T.green} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "1.9rem", fontWeight: 800, color: T.text, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                        {stat.value}<span style={{ fontSize: "0.9rem", fontWeight: 600, color: T.muted, marginLeft: 5 }}>{stat.unit}</span>
                      </p>
                      <p style={{ margin: "5px 0 0", fontSize: 12.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Donations List */}
          <div>
            <div className="filters-row" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Package size={16} color={T.greenMid} />
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>Donation History</h2>
              </div>
              <div className="filter-tabs" style={{ display: "flex", gap: 8 }}>
                {FILTERS.map(f => (
                  <FilterTab key={f.key} label={f.label} count={f.key === "all" ? donations.length : donations.filter(d => d.status === f.key).length} active={filter === f.key} onClick={() => setFilter(f.key)} />
                ))}
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {donations.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "72px 24px", background: T.surface, borderRadius: 20, border: `1.5px dashed ${T.sandDark}` }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                    <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 16, color: T.text, fontFamily: "'Syne', sans-serif" }}>No donations yet</p>
                    <p style={{ margin: "0 0 24px", fontSize: 13.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Schedule your first pickup and it will appear here.</p>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/donate")}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 50, background: T.dark, border: "none", cursor: "pointer", color: T.lime, fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                      Donate Now <ArrowRight size={15} />
                    </motion.button>
                  </motion.div>
                ) : filtered.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "48px 24px", background: T.surface, borderRadius: 20, border: `1.5px dashed ${T.sandDark}` }}>
                    <Package size={32} color={T.sandDark} style={{ marginBottom: 10 }} />
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: T.text, fontFamily: "'Syne', sans-serif" }}>Nothing in this filter</p>
                    <p style={{ margin: "5px 0 0", fontSize: 12.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Try "All" to see everything.</p>
                  </motion.div>
                ) : (
                  filtered.map((donation, i) => (
                    <motion.div key={donation.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ delay: i * 0.06 }}>
                      <DonationCard donation={donation} />
                    </motion.div>
                  ))
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ marginTop: 48, background: T.dark, borderRadius: 24, overflow: "hidden" }}>
            <div className="track-cta-inner" style={{ padding: "36px 40px" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(158,224,110,0.6)", fontFamily: "'DM Sans', sans-serif" }}>Ready to give more?</p>
                <h3 style={{ margin: 0, fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 800, color: T.white, fontFamily: "'Syne', sans-serif", lineHeight: 1.2 }}>
                  Schedule your next<br />donation pickup
                </h3>
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate("/donate")}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 50, background: T.lime, border: "none", cursor: "pointer", color: T.dark, fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
                Donate Now <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}