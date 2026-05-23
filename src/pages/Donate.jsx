import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, CheckCircle2, Package, MapPin,
  Clock, Heart, ShieldCheck, Plus, Minus, Trash2, Calendar,
  Home, X
} from "lucide-react";
import { useDonations } from "./Donationcontex";

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

/* ─── Data ────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 1, icon: "👕", name: "Clothes",     desc: "Shirts, pants, jackets" },
  { id: 2, icon: "📚", name: "Books",       desc: "Textbooks, novels, comics" },
  { id: 3, icon: "🧸", name: "Toys",        desc: "Games, puzzles, plush" },
  { id: 4, icon: "💻", name: "Electronics", desc: "Phones, laptops, gadgets" },
  { id: 5, icon: "🪑", name: "Furniture",   desc: "Chairs, tables, shelves" },
  { id: 6, icon: "🍳", name: "Kitchenware", desc: "Utensils, cookware, cups" },
  { id: 7, icon: "⚽", name: "Sports Gear", desc: "Bats, balls, equipment" },
  { id: 8, icon: "🛏️", name: "Bedding",     desc: "Sheets, pillows, blankets" },
];

const NGOS = [
  { id: 1, name: "Goonj Foundation",  city: "Mumbai",    type: "Community",    rating: 4.9, items: "1,250", verified: true  },
  { id: 2, name: "Smile Foundation",  city: "Chennai",   type: "Children",     rating: 4.8, items: "980",   verified: true  },
  { id: 3, name: "Akshaya Patra",     city: "Bangalore", type: "Food & More",  rating: 4.9, items: "2,100", verified: true  },
  { id: 4, name: "CRY India",         city: "Delhi",     type: "Child Rights", rating: 4.7, items: "760",   verified: true  },
  { id: 5, name: "Pratham Education", city: "Pune",      type: "Education",    rating: 4.8, items: "530",   verified: true  },
  { id: 6, name: "Uday Foundation",   city: "Hyderabad", type: "Healthcare",   rating: 4.6, items: "420",   verified: false },
];

const TIME_SLOTS = [
  "Morning  (9 AM – 11 AM)",
  "Midday   (11 AM – 1 PM)",
  "Afternoon (2 PM – 4 PM)",
  "Evening  (5 PM – 7 PM)",
];

const PICKUP_DATES = (() => {
  const today = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      value: d.toISOString().split("T")[0],
    };
  });
})();

/* ─── Step Indicator ──────────────────────────────────────────────── */
const STEPS = ["Items", "NGO", "Schedule", "Confirm"];

function StepBar({ active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 48 }}>
      {STEPS.map((label, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <motion.div
                animate={{
                  background: done ? T.green : current ? T.lime : T.sand,
                  borderColor: done ? T.green : current ? T.lime : T.sandDark,
                }}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "2px solid", display: "flex", alignItems: "center",
                  justifyContent: "center", fontWeight: 700, fontSize: 13,
                  color: done ? T.white : current ? T.dark : T.muted,
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {done ? <CheckCircle2 size={16} /> : i + 1}
              </motion.div>
              <span style={{
                fontSize: 11, fontWeight: current ? 700 : 500, letterSpacing: "0.08em",
                textTransform: "uppercase", color: current ? T.text : T.muted,
                fontFamily: "'DM Sans', sans-serif",
              }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginBottom: 20,
                background: i < active ? T.green : T.sandDark,
                borderRadius: 2, transition: "background 0.4s",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ─── Category Card ───────────────────────────────────────────────── */
function CategoryCard({ cat, onAdd }) {
  const [pop, setPop] = useState(false);
  const handleClick = () => {
    onAdd(cat);
    setPop(true);
    setTimeout(() => setPop(false), 300);
  };
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(21,94,57,0.12)` }}
      animate={pop ? { scale: [1, 1.08, 1] } : {}}
      style={{
        background: T.surface, border: `1.5px solid ${T.sandDark}`,
        borderRadius: 18, padding: "22px 16px", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 8, textAlign: "center", width: "100%", transition: "border-color 0.2s",
      }}
    >
      <span style={{ fontSize: 32, lineHeight: 1 }}>{cat.icon}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>{cat.name}</span>
      <span style={{ fontSize: 11, color: T.muted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{cat.desc}</span>
      <div style={{
        marginTop: 4, width: 28, height: 28, borderRadius: "50%",
        background: T.limePale, display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Plus size={14} color={T.green} />
      </div>
    </motion.button>
  );
}

/* ─── Item Row ────────────────────────────────────────────────────── */
function ItemRow({ item, onUpdate, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: T.bg, borderRadius: 14, padding: "14px 18px",
        border: `1px solid ${T.sandDark}`, gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
        <span style={{ fontSize: 22 }}>{item.icon}</span>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: T.text, fontFamily: "'Syne', sans-serif" }}>{item.name}</p>
          <p style={{ margin: 0, fontSize: 11.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>Qty: {item.quantity}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => item.quantity > 1 && onUpdate(item.uid, item.quantity - 1)}
          style={{
            width: 28, height: 28, borderRadius: 8, border: `1px solid ${T.sandDark}`,
            background: T.surface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><Minus size={13} color={T.muted} /></button>
        <span style={{ fontSize: 15, fontWeight: 700, color: T.text, minWidth: 20, textAlign: "center", fontFamily: "'Syne', sans-serif" }}>{item.quantity}</span>
        <button
          onClick={() => onUpdate(item.uid, item.quantity + 1)}
          style={{
            width: 28, height: 28, borderRadius: 8, border: `1px solid ${T.sandDark}`,
            background: T.surface, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><Plus size={13} color={T.muted} /></button>
        <button
          onClick={() => onRemove(item.uid)}
          style={{
            width: 28, height: 28, borderRadius: 8, border: "none",
            background: "#FFF0F0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            marginLeft: 4,
          }}
        ><Trash2 size={13} color="#DC3545" /></button>
      </div>
    </motion.div>
  );
}

/* ─── NGO Card ────────────────────────────────────────────────────── */
function NgoCard({ ngo, selected, onSelect }) {
  return (
    <motion.div
      onClick={() => onSelect(ngo)}
      whileHover={{ y: -3 }}
      style={{
        background: selected ? T.dark : T.surface,
        border: `2px solid ${selected ? T.lime : T.sandDark}`,
        borderRadius: 18, padding: "20px", cursor: "pointer",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: selected ? "rgba(158,224,110,0.2)" : T.limePale,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Heart size={20} color={selected ? T.lime : T.green} />
        </div>
        {ngo.verified && (
          <span style={{
            background: selected ? "rgba(158,224,110,0.15)" : T.limePale,
            color: selected ? T.lime : T.green,
            fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20,
            letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
          }}>✓ Verified</span>
        )}
      </div>
      <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 15, color: selected ? T.white : T.text, fontFamily: "'Syne', sans-serif" }}>{ngo.name}</p>
      <p style={{ margin: "0 0 10px", fontSize: 12, color: selected ? "rgba(255,255,255,0.55)" : T.muted, fontFamily: "'DM Sans', sans-serif" }}>
        <MapPin size={10} style={{ verticalAlign: "middle", marginRight: 3 }} />{ngo.city} · {ngo.type}
      </p>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 11.5, color: selected ? T.lime : T.greenMid, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
          ★ {ngo.rating}
        </span>
        <span style={{ width: 3, height: 3, borderRadius: "50%", background: selected ? "rgba(255,255,255,0.3)" : T.sandDark }} />
        <span style={{ fontSize: 11.5, color: selected ? "rgba(255,255,255,0.5)" : T.muted, fontFamily: "'DM Sans', sans-serif" }}>
          {ngo.items} items donated
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Success Modal ───────────────────────────────────────────────── */
function SuccessModal({ data, donationId, onClose, onTrack }) {
  const totalItems = data.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, background: "rgba(13,43,26,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24, backdropFilter: "blur(6px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        style={{
          background: T.surface, borderRadius: 28, padding: "48px 40px",
          maxWidth: 460, width: "100%", position: "relative", textAlign: "center",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 18, width: 32, height: 32,
            borderRadius: "50%", border: `1px solid ${T.sandDark}`, background: T.bg,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}
        ><X size={14} color={T.muted} /></button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260 }}
          style={{
            width: 80, height: 80, borderRadius: "50%", background: T.limePale,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <CheckCircle2 size={40} color={T.green} />
        </motion.div>

        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: T.text, margin: "0 0 10px", fontFamily: "'Syne', sans-serif" }}>
          Donation Scheduled!
        </h2>
        <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, margin: "0 0 28px", fontFamily: "'DM Sans', sans-serif" }}>
          Your items are on their way to making a difference. We'll send a confirmation to your inbox.
        </p>

        <div style={{ background: T.bg, borderRadius: 16, padding: "20px 24px", textAlign: "left", marginBottom: 28 }}>
          {[
            ["Donation ID", donationId],
            ["Total Items", `${totalItems} item${totalItems > 1 ? "s" : ""}`],
            ["NGO", data.ngo?.name],
            ["Pickup", `${data.date?.label}, ${data.time}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${T.sandDark}` }}>
              <span style={{ fontSize: 12.5, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{k}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Two buttons: Track + Close */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "13px", borderRadius: 50,
              background: T.bg, color: T.muted,
              fontWeight: 600, fontSize: 14, border: `1.5px solid ${T.sandDark}`,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Done
          </button>
          <motion.button
            onClick={onTrack}
            whileHover={{ scale: 1.03, boxShadow: "0 14px 36px rgba(158,224,110,0.38)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 2, padding: "13px", borderRadius: 50, background: T.dark,
              color: T.lime, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
            }}
          >
            Track My Donation <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Donate Component ───────────────────────────────────────── */
export default function Donate() {
  const navigate = useNavigate();
  const { addDonation } = useDonations();

  const [step, setStep] = useState(0);
  const [items, setItems] = useState([]);
  const [ngo, setNgo] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmedId, setConfirmedId] = useState("");

  const addItem = (cat) => {
    const existing = items.find(i => i.id === cat.id);
    if (existing) {
      setItems(prev => prev.map(i => i.uid === existing.uid ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setItems(prev => [...prev, { ...cat, uid: Date.now(), quantity: 1 }]);
    }
  };
  const updateQty = (uid, qty) => setItems(prev => prev.map(i => i.uid === uid ? { ...i, quantity: qty } : i));
  const removeItem = (uid) => setItems(prev => prev.filter(i => i.uid !== uid));

  const canProceed = [
    items.length > 0,
    !!ngo,
    !!date && !!time && address.trim().length > 5,
    true,
  ][step];

  const handleConfirm = () => {
    const id = addDonation({ items, ngo, date, time, address });
    setConfirmedId(id);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setShowSuccess(false);
    setStep(0);
    setItems([]);
    setNgo(null);
    setDate(null);
    setTime("");
    setAddress("");
    setConfirmedId("");
  };

  const handleGoTrack = () => {
    handleReset();
    navigate("/track");
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const pageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -30 },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .donate-input {
          width: 100%; padding: 14px 18px; border-radius: 14px;
          border: 1.5px solid ${T.sandDark}; background: ${T.surface};
          font-size: 14px; font-family: 'DM Sans', sans-serif; color: ${T.text};
          outline: none; transition: border-color 0.2s;
        }
        .donate-input:focus { border-color: ${T.greenMid}; }
        .donate-input::placeholder { color: ${T.muted}; }
        .date-chip {
          padding: 10px 18px; border-radius: 50px; border: 1.5px solid ${T.sandDark};
          background: ${T.surface}; font-size: 12.5px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; color: ${T.muted}; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .date-chip:hover { border-color: ${T.greenMid}; color: ${T.text}; }
        .date-chip.active { background: ${T.dark}; color: ${T.lime}; border-color: ${T.dark}; }
        .time-chip {
          padding: 12px 18px; border-radius: 14px; border: 1.5px solid ${T.sandDark};
          background: ${T.surface}; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; color: ${T.muted}; cursor: pointer;
          transition: all 0.2s; text-align: left;
        }
        .time-chip:hover { border-color: ${T.greenMid}; color: ${T.text}; }
        .time-chip.active { background: ${T.limePale}; color: ${T.green}; border-color: ${T.green}; font-weight: 700; }
        .ngo-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .items-cats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        @media (max-width: 640px) {
          .ngo-grid { grid-template-columns: 1fr !important; }
          .items-cats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* Header bar */}
        <div style={{ background: T.dark, padding: "0 24px" }}>
          <div style={{
            maxWidth: 820, margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 60,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: T.lime, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
              ReWear
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.lime }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>Donation Portal</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 80px" }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: T.greenMid, fontFamily: "'DM Sans', sans-serif",
              display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
            }}>
              <span style={{ display: "inline-block", width: 22, height: 2, background: T.greenMid }} />
              Schedule a Pickup
            </span>
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: T.text,
              margin: 0, fontFamily: "'Syne', sans-serif", lineHeight: 1.05, letterSpacing: "-0.025em",
            }}>
              Your clutter,<br />
              <span style={{ color: T.green, fontStyle: "italic" }}>their treasure.</span>
            </h1>
          </motion.div>

          <StepBar active={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── STEP 0: Items ── */}
              {step === 0 && (
                <div>
                  <p style={{ fontSize: 15, color: T.muted, margin: "0 0 28px", fontFamily: "'DM Sans', sans-serif" }}>
                    Tap a category to add items. You can adjust quantities below.
                  </p>
                  <div className="items-cats" style={{ marginBottom: 32 }}>
                    {CATEGORIES.map(cat => (
                      <CategoryCard key={cat.id} cat={cat} onAdd={addItem} />
                    ))}
                  </div>
                  <AnimatePresence>
                    {items.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>Selected Items</h3>
                          <span style={{ background: T.dark, color: T.lime, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif" }}>
                            {totalItems} item{totalItems > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <AnimatePresence>
                            {items.map(item => (
                              <ItemRow key={item.uid} item={item} onUpdate={updateQty} onRemove={removeItem} />
                            ))}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── STEP 1: NGO ── */}
              {step === 1 && (
                <div>
                  <p style={{ fontSize: 15, color: T.muted, margin: "0 0 24px", fontFamily: "'DM Sans', sans-serif" }}>
                    Choose a verified NGO. Your donation will go directly to them.
                  </p>
                  <div className="ngo-grid">
                    {NGOS.map(n => (
                      <NgoCard key={n.id} ngo={n} selected={ngo?.id === n.id} onSelect={setNgo} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Schedule ── */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>
                      <Calendar size={15} color={T.greenMid} /> Pickup Date
                    </label>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {PICKUP_DATES.map(d => (
                        <button key={d.value} className={`date-chip${date?.value === d.value ? " active" : ""}`} onClick={() => setDate(d)}>{d.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>
                      <Clock size={15} color={T.greenMid} /> Pickup Time
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                      {TIME_SLOTS.map(slot => (
                        <button key={slot} className={`time-chip${time === slot ? " active" : ""}`} onClick={() => setTime(slot)}>{slot}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Syne', sans-serif" }}>
                      <Home size={15} color={T.greenMid} /> Pickup Address
                    </label>
                    <textarea className="donate-input" rows={3} placeholder="Flat no., building name, street, area, city, pincode…" value={address} onChange={e => setAddress(e.target.value)} style={{ resize: "vertical" }} />
                  </div>
                </div>
              )}

              {/* ── STEP 3: Confirm ── */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <p style={{ fontSize: 15, color: T.muted, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                    Review your donation details before confirming.
                  </p>
                  {[
                    {
                      title: "Items", icon: Package, content: (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {items.map(item => (
                            <span key={item.uid} style={{ background: T.limePale, color: "#27500A", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>
                              {item.icon} {item.name} ×{item.quantity}
                            </span>
                          ))}
                        </div>
                      )
                    },
                    {
                      title: "NGO Partner", icon: Heart, content: (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.dark, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Heart size={16} color={T.lime} />
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: T.text, fontFamily: "'Syne', sans-serif" }}>{ngo?.name}</p>
                            <p style={{ margin: 0, fontSize: 12, color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>
                              <MapPin size={10} style={{ verticalAlign: "middle", marginRight: 3 }} />{ngo?.city}
                            </p>
                          </div>
                          {ngo?.verified && (
                            <span style={{ marginLeft: "auto", background: T.limePale, color: T.green, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "'DM Sans', sans-serif" }}>✓ Verified</span>
                          )}
                        </div>
                      )
                    },
                    {
                      title: "Pickup Details", icon: Clock, content: (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Calendar size={14} color={T.greenMid} />
                            <span style={{ fontSize: 13.5, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{date?.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Clock size={14} color={T.greenMid} />
                            <span style={{ fontSize: 13.5, color: T.text, fontFamily: "'DM Sans', sans-serif" }}>{time}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            <MapPin size={14} color={T.greenMid} style={{ marginTop: 2, flexShrink: 0 }} />
                            <span style={{ fontSize: 13.5, color: T.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{address}</span>
                          </div>
                        </div>
                      )
                    },
                  ].map(({ title, icon: Icon, content }) => (
                    <div key={title} style={{ background: T.surface, border: `1px solid ${T.sandDark}`, borderRadius: 18, overflow: "hidden" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: `1px solid ${T.sandDark}`, background: T.bg }}>
                        <Icon size={15} color={T.greenMid} />
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, fontFamily: "'DM Sans', sans-serif" }}>{title}</span>
                      </div>
                      <div style={{ padding: "16px 20px" }}>{content}</div>
                    </div>
                  ))}
                  <div style={{ background: T.limePale, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, border: `1px solid rgba(158,224,110,0.3)` }}>
                    <ShieldCheck size={18} color={T.green} style={{ flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: 13, color: "#27500A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                      Your donation is covered under our <strong>Verified Delivery Guarantee</strong>. You'll receive real-time updates and a digital impact certificate.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48 }}>
            <button
              onClick={() => step > 0 && setStep(s => s - 1)}
              disabled={step === 0}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 24px", borderRadius: 50,
                border: `1.5px solid ${T.sandDark}`, background: "transparent",
                color: step === 0 ? T.sandDark : T.muted, fontWeight: 600, fontSize: 14,
                fontFamily: "'DM Sans', sans-serif", cursor: step === 0 ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>

            <motion.button
              onClick={step === 3 ? handleConfirm : () => setStep(s => s + 1)}
              disabled={!canProceed}
              whileHover={canProceed ? { scale: 1.03, boxShadow: "0 14px 36px rgba(158,224,110,0.38)" } : {}}
              whileTap={canProceed ? { scale: 0.97 } : {}}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 32px", borderRadius: 50,
                background: canProceed ? T.lime : T.sandDark,
                color: canProceed ? T.dark : T.muted,
                fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                border: "none", cursor: canProceed ? "pointer" : "not-allowed",
                transition: "background 0.25s, color 0.25s",
              }}
            >
              {step === 3 ? "Confirm Donation" : "Continue"} <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            data={{ items, ngo, date, time, address }}
            donationId={confirmedId}
            onClose={handleReset}
            onTrack={handleGoTrack}
          />
        )}
      </AnimatePresence>
    </>
  );
}