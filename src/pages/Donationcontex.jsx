import React, { createContext, useContext, useState, useEffect } from "react";

const DonationContext = createContext(null);

export function DonationProvider({ children }) {
  const [donations, setDonations] = useState(() => {
    try {
      const saved = localStorage.getItem("ReWear_donations");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ReWear_donations", JSON.stringify(donations));
  }, [donations]);

  const addDonation = ({ items, ngo, date, time, address }) => {
    const newDonation = {
      id: `#RW${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      date: date?.label || "",
      time,
      address,
      ngo: ngo?.name || "",
      city: ngo?.city || "",
      items,
      status: "scheduled",
      statusLabel: "Scheduled",
      timeline: [
        { label: "Scheduled",  time: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), done: true  },
        { label: "Picked Up",  time: "Awaiting pickup", done: false },
        { label: "In Transit", time: "—",               done: false },
        { label: "Delivered",  time: `Expected: ${date?.label}`,  done: false },
      ],
      impact: "Pending",
      certificate: false,
    };
    setDonations(prev => [newDonation, ...prev]);
    return newDonation.id;
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonations must be used inside DonationProvider");
  return ctx;
}
