import React, { useState } from 'react';
import {
  Box, Typography, Avatar, IconButton, Chip, LinearProgress,
  Table, TableBody, TableCell, TableHead, TableRow, Badge,
  Menu, MenuItem, Divider, TextField, InputAdornment
} from '@mui/material';
import { TrendingUp, Groups, Close, Settings } from '@mui/icons-material';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Total Donations',  value: '3,842',  change: '+12%', up: true,  icon: '🎁', color: '#10B981' },
  { label: 'Active NGOs',      value: '47',     change: '+3',   up: true,  icon: '🏢', color: '#0F766E' },
  { label: 'Clothes Delivered',value: '12,560', change: '+8%',  up: true,  icon: '👕', color: '#059669' },
  { label: 'Pending Reviews',  value: '28',     change: '-5',   up: false, icon: '⏳', color: '#F59E0B' },
];

const DONATIONS = [
  { id: 'D-1021', donor: 'Aarav Shah',    items: 8,  ngo: 'Aashray NGO',    status: 'delivered',  date: '22 May 2026' },
  { id: 'D-1020', donor: 'Priya Mehta',   items: 3,  ngo: 'Green Earth',    status: 'in-transit', date: '21 May 2026' },
  { id: 'D-1019', donor: 'Rohan Verma',   items: 12, ngo: 'Seva Sadan',     status: 'pending',    date: '20 May 2026' },
  { id: 'D-1018', donor: 'Sneha Patel',   items: 5,  ngo: 'Umeed Trust',    status: 'delivered',  date: '19 May 2026' },
  { id: 'D-1017', donor: 'Kiran Joshi',   items: 7,  ngo: 'Aashray NGO',    status: 'cancelled',  date: '18 May 2026' },
  { id: 'D-1016', donor: 'Meera Iyer',    items: 2,  ngo: 'Green Earth',    status: 'in-transit', date: '17 May 2026' },
  { id: 'D-1015', donor: 'Arjun Nair',    items: 9,  ngo: 'Seva Sadan',     status: 'delivered',  date: '16 May 2026' },
];

const NGOS = [
  { name: 'Aashray NGO',  city: 'Surat',    received: 420, rating: 4.8, active: true  },
  { name: 'Green Earth',  city: 'Ahmedabad',received: 310, rating: 4.6, active: true  },
  { name: 'Seva Sadan',   city: 'Mumbai',   received: 580, rating: 4.9, active: true  },
  { name: 'Umeed Trust',  city: 'Delhi',    received: 195, rating: 4.3, active: false },
  { name: 'Asha Kiran',   city: 'Pune',     received: 260, rating: 4.5, active: true  },
];

const STATUS_CONFIG = {
  delivered:   { label: 'Delivered',   color: '#10B981', bg: 'rgba(16,185,129,0.12)', icon: <CheckCircle sx={{ fontSize: 13 }} /> },
  'in-transit':{ label: 'In Transit',  color: '#3B82F6', bg: 'rgba(59,130,246,0.12)', icon: <LocalShipping sx={{ fontSize: 13 }} /> },
  pending:     { label: 'Pending',     color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', icon: <Schedule sx={{ fontSize: 13 }} /> },
  cancelled:   { label: 'Cancelled',   color: '#EF4444', bg: 'rgba(239,68,68,0.12)',  icon: <Cancel sx={{ fontSize: 13 }} /> },
};

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',    icon: <DashboardIcon fontSize="small" /> },
  { id: 'donations', label: 'Donations',   icon: <Inventory2 fontSize="small" /> },
  { id: 'tracking',  label: 'Track Status',icon: <TrackChanges fontSize="small" /> },
  { id: 'ngos',      label: 'NGO List',    icon: <LocationOn fontSize="small" /> },
  { id: 'profile',   label: 'Profile',     icon: <Person fontSize="small" /> },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const StatusChip = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <Box sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      px: 1.5, py: 0.4, borderRadius: 50,
      bgcolor: cfg.bg, color: cfg.color,
      fontSize: '0.75rem', fontWeight: 700,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {cfg.icon} {cfg.label}
    </Box>
  );
};

// ─── Section: Overview ────────────────────────────────────────────────────────
const OverviewSection = () => (
  <Box>
    <Typography variant="h5" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 0.5 }}>
      Good morning, Admin 👋
    </Typography>
    <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mb: 4 }}>
      Here's what's happening with ReWear today.
    </Typography>

    {/* Stat cards */}
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5, mb: 4 }}>
      {STATS.map((s, i) => (
        <Box key={i} sx={{
          bgcolor: 'white', borderRadius: 4, p: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid rgba(15,118,110,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(15,118,110,0.12)' },
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography sx={{ fontSize: 28 }}>{s.icon}</Typography>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.3,
              color: s.up ? '#10B981' : '#EF4444',
              fontSize: '0.75rem', fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {s.up ? <ArrowUpward sx={{ fontSize: 12 }} /> : <ArrowDownward sx={{ fontSize: 12 }} />}
              {s.change}
            </Box>
          </Box>
          <Typography sx={{
            fontFamily: "'Lora', serif", fontWeight: 700,
            fontSize: '1.8rem', color: '#0c2a23', mt: 1, lineHeight: 1,
          }}>
            {s.value}
          </Typography>
          <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', mt: 0.5 }}>
            {s.label}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* Recent donations mini table */}
    <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(15,118,110,0.08)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', fontSize: '1.1rem' }}>
          Recent Donations
        </Typography>
        <Typography sx={{ color: '#0F766E', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
          View all →
        </Typography>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            {['ID', 'Donor', 'Items', 'NGO', 'Status', 'Date'].map(h => (
              <TableCell key={h} sx={{ color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.75rem', borderBottom: '1px solid rgba(15,118,110,0.08)', pb: 1 }}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {DONATIONS.slice(0, 5).map(d => (
            <TableRow key={d.id} sx={{ '&:hover': { bgcolor: 'rgba(15,118,110,0.03)' } }}>
              <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#0F766E', fontSize: '0.82rem', border: 'none', py: 1.2 }}>{d.id}</TableCell>
              <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', border: 'none', py: 1.2 }}>{d.donor}</TableCell>
              <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', border: 'none', py: 1.2 }}>{d.items}</TableCell>
              <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', border: 'none', py: 1.2 }}>{d.ngo}</TableCell>
              <TableCell sx={{ border: 'none', py: 1.2 }}><StatusChip status={d.status} /></TableCell>
              <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#9CA3AF', border: 'none', py: 1.2 }}>{d.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Box>
);

// ─── Section: Donations ───────────────────────────────────────────────────────
const DonationsSection = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = DONATIONS.filter(d =>
    (filter === 'all' || d.status === filter) &&
    (d.donor.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search))
  );
  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 0.5 }}>Donation History</Typography>
      <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mb: 3 }}>All donations with real-time status</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search donor or ID…"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: '#9CA3AF' }} /></InputAdornment> }}
          sx={{
            flex: 1, minWidth: 200,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3, bgcolor: 'white',
              fontFamily: "'DM Sans', sans-serif",
              '& fieldset': { borderColor: 'rgba(15,118,110,0.2)' },
              '&:hover fieldset': { borderColor: '#10B981' },
              '&.Mui-focused fieldset': { borderColor: '#0F766E' },
            },
          }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['all', 'delivered', 'in-transit', 'pending', 'cancelled'].map(f => (
            <Box key={f} onClick={() => setFilter(f)} sx={{
              px: 2, py: 0.8, borderRadius: 50, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem',
              transition: 'all 0.2s',
              bgcolor: filter === f ? '#0F766E' : 'white',
              color: filter === f ? 'white' : '#6B7280',
              border: `1px solid ${filter === f ? '#0F766E' : 'rgba(15,118,110,0.15)'}`,
              boxShadow: filter === f ? '0 4px 12px rgba(15,118,110,0.25)' : 'none',
              '&:hover': { borderColor: '#0F766E', color: filter === f ? 'white' : '#0F766E' },
            }}>
              {f === 'all' ? 'All' : STATUS_CONFIG[f]?.label}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'white', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(15,118,110,0.08)', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(15,118,110,0.04)' }}>
            <TableRow>
              {['Donation ID', 'Donor', 'Items', 'NGO', 'Status', 'Date', ''].map(h => (
                <TableCell key={h} sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '0.75rem', borderBottom: '1px solid rgba(15,118,110,0.08)', py: 1.5 }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map(d => (
              <TableRow key={d.id} sx={{ '&:hover': { bgcolor: 'rgba(15,118,110,0.03)' }, transition: 'background 0.15s' }}>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#0F766E', borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>{d.id}</TableCell>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#10B981', fontSize: '0.7rem', fontWeight: 800 }}>
                      {d.donor[0]}
                    </Avatar>
                    {d.donor}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(15,118,110,0.06)', px: 1.2, py: 0.3, borderRadius: 2, fontWeight: 700, color: '#0F766E', fontSize: '0.82rem' }}>
                    👕 {d.items}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>{d.ngo}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}><StatusChip status={d.status} /></TableCell>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#9CA3AF', borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>{d.date}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(15,118,110,0.06)', py: 1.8 }}>
                  <IconButton size="small" sx={{ color: '#9CA3AF', '&:hover': { color: '#0F766E' } }}><MoreVert fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <Box sx={{ py: 6, textAlign: 'center', color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>
            No donations found 🔍
          </Box>
        )}
      </Box>
    </Box>
  );
};

// ─── Section: Tracking ────────────────────────────────────────────────────────
const TRACK_STEPS = ['Donation Received', 'Quality Check', 'Dispatched', 'In Transit', 'Delivered'];

const TrackingSection = () => {
  const [selected, setSelected] = useState(DONATIONS[0]);

  const getStep = (status) => {
    if (status === 'pending')     return 1;
    if (status === 'in-transit')  return 3;
    if (status === 'delivered')   return 4;
    if (status === 'cancelled')   return -1;
    return 0;
  };

  const step = getStep(selected.status);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 0.5 }}>Track Donations</Typography>
      <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mb: 3 }}>Select a donation to see live tracking status</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '320px 1fr' }, gap: 3 }}>
        {/* Donation list */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {DONATIONS.map(d => (
            <Box key={d.id} onClick={() => setSelected(d)} sx={{
              p: 2.5, borderRadius: 3, cursor: 'pointer',
              bgcolor: selected.id === d.id ? 'rgba(15,118,110,0.08)' : 'white',
              border: `2px solid ${selected.id === d.id ? '#0F766E' : 'rgba(15,118,110,0.1)'}`,
              boxShadow: selected.id === d.id ? '0 4px 20px rgba(15,118,110,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
              '&:hover': { borderColor: '#10B981', transform: 'translateX(4px)' },
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#0F766E', fontSize: '0.85rem' }}>{d.id}</Typography>
                <StatusChip status={d.status} />
              </Box>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0c2a23', mt: 0.5, fontSize: '0.9rem' }}>{d.donor}</Typography>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#9CA3AF', mt: 0.3 }}>{d.ngo} • {d.items} items</Typography>
            </Box>
          ))}
        </Box>

        {/* Tracker panel */}
        <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(15,118,110,0.08)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Box>
              <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: '1.3rem', color: '#0c2a23' }}>{selected.id}</Typography>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#6B7280', mt: 0.3 }}>{selected.donor} → {selected.ngo}</Typography>
            </Box>
            <StatusChip status={selected.status} />
          </Box>

          {selected.status === 'cancelled' ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ fontSize: 48 }}>❌</Typography>
              <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#EF4444', mt: 1 }}>Donation Cancelled</Typography>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#9CA3AF', mt: 0.5 }}>This donation was cancelled and cannot be tracked.</Typography>
            </Box>
          ) : (
            <>
              {/* Progress steps */}
              <Box sx={{ position: 'relative', mb: 4 }}>
                {/* Line */}
                <Box sx={{
                  position: 'absolute', top: 20, left: 20, right: 20, height: 3,
                  bgcolor: 'rgba(15,118,110,0.1)', borderRadius: 2, zIndex: 0,
                }} />
                <Box sx={{
                  position: 'absolute', top: 20, left: 20, height: 3,
                  width: `${(step / (TRACK_STEPS.length - 1)) * (100 - (40 / 500 * 100))}%`,
                  bgcolor: '#10B981', borderRadius: 2, zIndex: 1,
                  transition: 'width 0.6s ease',
                }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                  {TRACK_STEPS.map((s, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Box sx={{
                        width: 40, height: 40, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '0.8rem',
                        transition: 'all 0.3s',
                        bgcolor: i <= step ? '#0F766E' : 'rgba(15,118,110,0.08)',
                        color: i <= step ? 'white' : '#9CA3AF',
                        boxShadow: i === step ? '0 0 0 5px rgba(16,185,129,0.2)' : 'none',
                        border: i <= step ? '2px solid #0F766E' : '2px solid rgba(15,118,110,0.15)',
                      }}>
                        {i < step ? '✓' : i + 1}
                      </Box>
                      <Typography sx={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem',
                        fontWeight: i === step ? 800 : 500,
                        color: i <= step ? '#0F766E' : '#9CA3AF',
                        textAlign: 'center', maxWidth: 70, lineHeight: 1.2,
                      }}>
                        {s}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Detail cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
                {[
                  { label: 'Items',   value: `${selected.items} clothes`, icon: '👕' },
                  { label: 'NGO',     value: selected.ngo,                icon: '🏢' },
                  { label: 'Date',    value: selected.date,               icon: '📅' },
                ].map((info, i) => (
                  <Box key={i} sx={{ bgcolor: 'rgba(15,118,110,0.04)', borderRadius: 3, p: 2, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 22, mb: 0.5 }}>{info.icon}</Typography>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: '#0c2a23', fontSize: '0.85rem' }}>{info.value}</Typography>
                    <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#9CA3AF', mt: 0.2 }}>{info.label}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// ─── Section: NGO List ────────────────────────────────────────────────────────
const NGOSection = () => (
  <Box>
    <Typography variant="h5" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 0.5 }}>NGO Directory</Typography>
    <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mb: 3 }}>All registered NGOs and their performance</Typography>

    {/* Summary bar */}
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2.5, mb: 3 }}>
      {[
        { label: 'Total NGOs',    value: '47', icon: '🏢' },
        { label: 'Active',        value: '41', icon: '✅' },
        { label: 'Cities Covered',value: '12', icon: '🗺️' },
      ].map((s, i) => (
        <Box key={i} sx={{ bgcolor: 'white', borderRadius: 3, p: 2.5, textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', border: '1px solid rgba(15,118,110,0.08)' }}>
          <Typography sx={{ fontSize: 28 }}>{s.icon}</Typography>
          <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: '1.8rem', color: '#0c2a23' }}>{s.value}</Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#6B7280' }}>{s.label}</Typography>
        </Box>
      ))}
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {NGOS.map((ngo, i) => (
        <Box key={i} sx={{
          bgcolor: 'white', borderRadius: 4, p: 3,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          border: '1px solid rgba(15,118,110,0.08)',
          display: 'flex', alignItems: 'center', gap: 3,
          transition: 'all 0.2s',
          '&:hover': { transform: 'translateX(6px)', boxShadow: '0 8px 28px rgba(15,118,110,0.12)' },
        }}>
          <Avatar sx={{
            width: 50, height: 50,
            background: 'linear-gradient(135deg, #10B981, #0F766E)',
            fontFamily: "'Lora', serif", fontWeight: 700, fontSize: '1.1rem',
          }}>
            {ngo.name[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: '#0c2a23' }}>{ngo.name}</Typography>
              <Box sx={{
                px: 1.2, py: 0.2, borderRadius: 50, fontSize: '0.7rem', fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                bgcolor: ngo.active ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                color: ngo.active ? '#10B981' : '#EF4444',
              }}>
                {ngo.active ? '● Active' : '● Inactive'}
              </Box>
            </Box>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#6B7280', mt: 0.3 }}>
              📍 {ngo.city}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: 80 }}>
            <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: '1.4rem', color: '#0F766E' }}>{ngo.received}</Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#9CA3AF' }}>items received</Typography>
          </Box>
          <Box sx={{ textAlign: 'center', minWidth: 60 }}>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, color: '#0c2a23', fontSize: '1.1rem' }}>⭐ {ngo.rating}</Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#9CA3AF' }}>rating</Typography>
          </Box>
          <Box sx={{ width: 120 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#9CA3AF' }}>Capacity</Typography>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#0F766E', fontWeight: 700 }}>{Math.round(ngo.received / 6)}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(Math.round(ngo.received / 6), 100)}
              sx={{
                height: 5, borderRadius: 3,
                bgcolor: 'rgba(15,118,110,0.1)',
                '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: 3 },
              }}
            />
          </Box>
          <IconButton size="small" sx={{ color: '#9CA3AF', '&:hover': { color: '#0F766E' } }}>
            <ChevronRight />
          </IconButton>
        </Box>
      ))}
    </Box>
  </Box>
);

// ─── Section: Profile ─────────────────────────────────────────────────────────
const ProfileSection = () => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: 'Admin User', email: 'admin@rewear.in', phone: '+91 98765 43210', city: 'Surat' });

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3, bgcolor: 'white', fontFamily: "'DM Sans', sans-serif",
      '& fieldset': { borderColor: 'rgba(15,118,110,0.2)' },
      '&:hover fieldset': { borderColor: '#10B981' },
      '&.Mui-focused fieldset': { borderColor: '#0F766E', borderWidth: 2 },
    },
    '& .MuiInputLabel-root': { fontFamily: "'DM Sans', sans-serif", '&.Mui-focused': { color: '#0F766E' } },
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 0.5 }}>Profile & Settings</Typography>
      <Typography sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mb: 3 }}>Manage your admin account</Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, gap: 3 }}>
        {/* Avatar card */}
        <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(15,118,110,0.08)', textAlign: 'center' }}>
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2.5 }}>
            <Avatar sx={{
              width: 90, height: 90,
              background: 'linear-gradient(135deg, #10B981, #059669)',
              fontSize: '2rem', fontWeight: 800, fontFamily: "'Lora', serif",
              boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
            }}>A</Avatar>
            <Box sx={{
              position: 'absolute', bottom: 4, right: 4,
              width: 16, height: 16, borderRadius: '50%',
              bgcolor: '#10B981', border: '2px solid white',
            }} />
          </Box>
          <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', fontSize: '1.2rem' }}>{form.name}</Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#6B7280', mt: 0.5, fontSize: '0.85rem' }}>{form.email}</Typography>
          <Box sx={{ mt: 2, px: 2, py: 0.8, borderRadius: 50, display: 'inline-block', bgcolor: 'rgba(15,118,110,0.1)', color: '#0F766E', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.8rem' }}>
            🛡️ Super Admin
          </Box>
          <Divider sx={{ my: 3, borderColor: 'rgba(15,118,110,0.1)' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, textAlign: 'left' }}>
            {[
              { label: 'Member Since', value: 'Jan 2024' },
              { label: 'Last Login',   value: 'Today, 9:42 AM' },
              { label: 'Permissions',  value: 'Full Access' },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#9CA3AF' }}>{item.label}</Typography>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: '#0c2a23' }}>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Edit form */}
        <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(15,118,110,0.08)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', fontSize: '1.1rem' }}>Personal Information</Typography>
            <Box onClick={() => setEditing(e => !e)} sx={{
              px: 2.5, py: 1, borderRadius: 50, cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.82rem',
              bgcolor: editing ? 'rgba(239,68,68,0.08)' : 'rgba(15,118,110,0.08)',
              color: editing ? '#EF4444' : '#0F766E',
              transition: 'all 0.2s',
            }}>
              {editing ? '✕ Cancel' : '✏️ Edit'}
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'Email',     key: 'email' },
              { label: 'Phone',     key: 'phone' },
              { label: 'City',      key: 'city' },
            ].map(f => (
              <TextField
                key={f.key}
                label={f.label}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                disabled={!editing}
                fullWidth
                sx={inputSx}
              />
            ))}
          </Box>

          {editing && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Box onClick={() => setEditing(false)} sx={{
                px: 4, py: 1.5, borderRadius: 3, cursor: 'pointer',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white', fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                boxShadow: '0 8px 24px rgba(16,185,129,0.35)',
                transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' },
              }}>
                Save Changes ✓
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3.5, borderColor: 'rgba(15,118,110,0.1)' }} />

          <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', mb: 2 }}>Security</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {['Change Password', 'Two-Factor Authentication', 'Active Sessions'].map((item, i) => (
              <Box key={i} sx={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                p: 2, borderRadius: 3, bgcolor: 'rgba(15,118,110,0.03)',
                border: '1px solid rgba(15,118,110,0.08)', cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(15,118,110,0.06)', borderColor: '#10B981' },
                transition: 'all 0.2s',
              }}>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0c2a23', fontSize: '0.9rem' }}>{item}</Typography>
                <ChevronRight sx={{ color: '#9CA3AF', fontSize: 18 }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [notifAnchor, setNotifAnchor]     = useState(null);

  const SECTIONS = {
    overview:  <OverviewSection />,
    donations: <DonationsSection />,
    tracking:  <TrackingSection />,
    ngos:      <NGOSection />,
    profile:   <ProfileSection />,
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f7f4', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <Box sx={{
        width: sidebarOpen ? 260 : 72,
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0c2a23 0%, #134e3a 60%, #0F766E 100%)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden', flexShrink: 0,
        position: 'sticky', top: 0, height: '100vh',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {/* Brand */}
        <Box sx={{ p: sidebarOpen ? 3 : 2, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 80 }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: 2, flexShrink: 0,
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: '0 4px 12px rgba(16,185,129,0.4)',
          }}>🌿</Box>
          {sidebarOpen && (
            <Box>
              <Typography sx={{ fontFamily: "'Lora', serif", fontWeight: 900, color: 'white', fontSize: '1.1rem', letterSpacing: -0.5 }}>ReWear</Typography>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', letterSpacing: 1, textTransform: 'uppercase' }}>Admin Panel</Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2, mb: 1 }} />

        {/* Nav */}
        <Box sx={{ flex: 1, px: 1.5, py: 1 }}>
          {NAV_ITEMS.map(item => (
            <Box
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{
                display: 'flex', alignItems: 'center',
                gap: 1.5, px: 2, py: 1.6,
                borderRadius: 3, cursor: 'pointer', mb: 0.5,
                transition: 'all 0.2s',
                bgcolor: activeSection === item.id ? 'rgba(16,185,129,0.18)' : 'transparent',
                color: activeSection === item.id ? '#10B981' : 'rgba(255,255,255,0.55)',
                borderLeft: activeSection === item.id ? '3px solid #10B981' : '3px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              <Box sx={{ flexShrink: 0 }}>{item.icon}</Box>
              {sidebarOpen && (
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: activeSection === item.id ? 800 : 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1.5 }} />
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 1.5,
            px: 2, py: 1.5, borderRadius: 3, cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)',
            '&:hover': { color: '#EF4444', bgcolor: 'rgba(239,68,68,0.08)' },
            transition: 'all 0.2s',
          }}>
            <Logout fontSize="small" sx={{ flexShrink: 0 }} />
            {sidebarOpen && <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.88rem' }}>Logout</Typography>}
          </Box>
        </Box>
      </Box>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* Top bar */}
        <Box sx={{
          bgcolor: 'white', px: 3, py: 1.8,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(15,118,110,0.07)',
          position: 'sticky', top: 0, zIndex: 100,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setSidebarOpen(o => !o)} sx={{ color: '#0F766E', '&:hover': { bgcolor: 'rgba(15,118,110,0.08)' } }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", color: '#9CA3AF', fontSize: '0.85rem' }}>
              Admin / <span style={{ color: '#0F766E', fontWeight: 700 }}>
                {NAV_ITEMS.find(n => n.id === activeSection)?.label}
              </span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              onClick={e => setNotifAnchor(e.currentTarget)}
              sx={{ color: '#6B7280', '&:hover': { color: '#0F766E', bgcolor: 'rgba(15,118,110,0.08)' } }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={() => setNotifAnchor(null)}
              PaperProps={{ sx: { borderRadius: 3, boxShadow: '0 16px 48px rgba(0,0,0,0.14)', mt: 1, minWidth: 280 } }}>
              {['New donation D-1022 received', '3 pending quality checks', 'Seva Sadan capacity 90%'].map((n, i) => (
                <MenuItem key={i} sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', py: 1.5, gap: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981', flexShrink: 0 }} />
                  {n}
                </MenuItem>
              ))}
            </Menu>

            <Avatar sx={{ width: 36, height: 36, background: 'linear-gradient(135deg, #10B981, #0F766E)', fontFamily: "'Lora', serif", fontWeight: 800, cursor: 'pointer' }}>
              A
            </Avatar>
          </Box>
        </Box>

        {/* Page content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          {SECTIONS[activeSection]}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;