import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, IconButton,
  InputAdornment, Divider, MenuItem, Select, FormControl
} from '@mui/material';
import { Visibility, VisibilityOff, Close, CheckCircle } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Leaf = ({ style }) => (
  <svg viewBox="0 0 60 80" fill="none" style={{ position: 'absolute', opacity: 0.13, ...style }}>
    <path d="M30 75 C10 55, 0 35, 10 15 C20 -5, 50 -5, 50 15 C60 35, 50 55, 30 75Z" fill="#10B981" />
  </svg>
);

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳' },
  { code: '+1',  flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+971',flag: '🇦🇪' },
  { code: '+61', flag: '🇦🇺' },
];

const LoginOverlay = ({ onClose }) => {
  const { login } = useAuth();

  const [mode, setMode]         = useState('login');
  const [showPass, setShowPass] = useState(false);
  const [visible, setVisible]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState({});
  const [countryCode, setCountryCode] = useState('+91');

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@') || !form.email.includes('.')) e.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number';
    if (form.password.length < 6) e.password = 'Password must be 6+ characters';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    // ── Replace with your real API call ──
    await new Promise(r => setTimeout(r, 1200));
    login({ name: form.name || form.email.split('@')[0], email: form.email, avatar: '' });
    // ─────────────────────────────────────
    setLoading(false);
    setSuccess(true);
    setTimeout(() => onClose(), 1400);
  };

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      bgcolor: 'rgba(255,255,255,0.8)',
      fontFamily: "'DM Sans', sans-serif",
      '& fieldset': { borderColor: 'rgba(15,118,110,0.22)' },
      '&:hover fieldset': { borderColor: '#10B981' },
      '&.Mui-focused fieldset': { borderColor: '#0F766E', borderWidth: 2 },
    },
    '& .MuiInputLabel-root': {
      fontFamily: "'DM Sans', sans-serif",
      color: '#4B5563',
      '&.Mui-focused': { color: '#0F766E' },
    },
    '& .MuiFormHelperText-root': { color: '#EF4444', fontFamily: "'DM Sans', sans-serif" },
  };

  return (
    <Box sx={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.35s ease',
      opacity: visible ? 1 : 0,
    }}>
      {/* Backdrop */}
      <Box onClick={handleDismiss} sx={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #0c2a23 0%, #134e3a 50%, #0F766E 100%)',
      }} />

      {/* Leaves */}
      <Leaf style={{ width: 220, top: '5%',  left: '-2%',  transform: 'rotate(-25deg)' }} />
      <Leaf style={{ width: 160, bottom: '8%', right: '-1%', transform: 'rotate(30deg)' }} />
      <Leaf style={{ width: 100, top: '18%', right: '12%', transform: 'rotate(-10deg)' }} />
      <Leaf style={{ width: 80,  bottom: '22%', left: '10%', transform: 'rotate(55deg)' }} />

      {/* Card */}
      <Box sx={{
        position: 'relative', zIndex: 1,
        width: { xs: '92vw', sm: 420 },
        borderRadius: 5, overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.55)',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Top green strip */}
        <Box sx={{ height: 5, background: 'linear-gradient(90deg, #10B981 0%, #059669 50%, #0F766E 100%)' }} />

        <Box sx={{ bgcolor: 'rgba(248,246,242,0.97)', p: { xs: 3, sm: 4 } }}>

          {/* Close */}
          <IconButton onClick={handleDismiss} size="small" sx={{
            position: 'absolute', top: 16, right: 16, color: '#6B7280',
            '&:hover': { color: '#0F766E', bgcolor: 'rgba(16,185,129,0.1)' },
          }}>
            <Close fontSize="small" />
          </IconButton>

          {/* ── BRAND ── */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 0.5 }}>
              <Box sx={{
                width: 46, height: 46, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981, #0F766E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: '0 6px 18px rgba(16,185,129,0.35)', flexShrink: 0,
              }}>🌿</Box>
              <Typography sx={{
                fontFamily: "'Lora', serif", fontWeight: 700,
                fontSize: '1.9rem', color: '#0c2a23', letterSpacing: -1, lineHeight: 1,
              }}>
                ReWear
              </Typography>
            </Box>
            <Typography sx={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: '0.7rem', letterSpacing: 2, color: '#10B981',
              textTransform: 'uppercase', mb: 1.5,
            }}>
              Wear the Change
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: "'Lora', serif", fontWeight: 700, color: '#0c2a23', fontSize: '1.15rem' }}>
              {success ? (mode === 'login' ? 'Login Successful!' : 'Account Created!') : (mode === 'login' ? 'Welcome back' : 'Join ReWear')}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280', fontFamily: "'DM Sans', sans-serif", mt: 0.4, fontSize: '0.82rem' }}>
              {success
                ? `Welcome, ${form.name || form.email.split('@')[0]}! Redirecting…`
                : mode === 'login'
                ? 'Sign in to continue your journey'
                : 'Create your account and wear the change'}
            </Typography>
          </Box>

          {/* Success */}
          {success ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircle sx={{ fontSize: 72, color: '#10B981' }} />
            </Box>
          ) : (
            <>
              {/* Tabs */}
              <Box sx={{ display: 'flex', bgcolor: 'rgba(15,118,110,0.08)', borderRadius: 3, p: 0.5, mb: 2.5 }}>
                {['login', 'register'].map(m => (
                  <Box key={m} onClick={() => { setMode(m); setErrors({}); }} sx={{
                    flex: 1, textAlign: 'center', py: 1, borderRadius: 2.5, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem',
                    transition: 'all 0.25s',
                    bgcolor: mode === m ? '#0F766E' : 'transparent',
                    color: mode === m ? 'white' : '#6B7280',
                    boxShadow: mode === m ? '0 4px 14px rgba(15,118,110,0.3)' : 'none',
                  }}>
                    {m === 'login' ? 'Sign In' : 'Sign Up'}
                  </Box>
                ))}
              </Box>

              {/* Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {mode === 'register' && (
                  <TextField label="Full Name" name="name" value={form.name}
                    onChange={handleChange} error={!!errors.name} helperText={errors.name}
                    fullWidth size="small" sx={inputSx} />
                )}

                <TextField label="Email Address" name="email" type="email" value={form.email}
                  onChange={handleChange} error={!!errors.email} helperText={errors.email}
                  fullWidth size="small" sx={inputSx} />

                {/* Phone */}
                <Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <FormControl size="small" sx={{ width: 105, flexShrink: 0 }}>
                      <Select value={countryCode} onChange={e => setCountryCode(e.target.value)}
                        sx={{
                          borderRadius: 3, bgcolor: 'rgba(255,255,255,0.8)',
                          fontFamily: "'DM Sans', sans-serif",
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(15,118,110,0.22)' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#10B981' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0F766E', borderWidth: 2 },
                        }}>
                        {COUNTRY_CODES.map(c => (
                          <MenuItem key={c.code} value={c.code} sx={{ fontFamily: "'DM Sans', sans-serif" }}>
                            {c.flag} {c.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField label="Phone Number" name="phone" type="tel" value={form.phone}
                      onChange={handleChange} error={!!errors.phone}
                      placeholder="98765 43210"
                      fullWidth size="small" sx={{ ...inputSx, flex: 1 }} />
                  </Box>
                  {errors.phone && (
                    <Typography sx={{ color: '#EF4444', fontSize: '0.72rem', mt: 0.4, ml: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
                      {errors.phone}
                    </Typography>
                  )}
                </Box>

                {/* Password */}
                <TextField label="Password" name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  error={!!errors.password} helperText={errors.password}
                  fullWidth size="small" sx={inputSx}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(p => !p)} edge="end" size="small" sx={{ color: '#6B7280', '&:hover': { color: '#0F766E' } }}>
                          {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {mode === 'login' && (
                  <Typography variant="body2" sx={{
                    textAlign: 'right', mt: -0.5, color: '#0F766E', cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.8rem',
                    '&:hover': { textDecoration: 'underline' },
                  }}>
                    Forgot password?
                  </Typography>
                )}
              </Box>

              {/* Submit */}
              <Button fullWidth onClick={handleSubmit} disabled={loading} sx={{
                mt: 2.5, py: 1.6, borderRadius: 3,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '0.95rem',
                background: loading ? 'rgba(15,118,110,0.4)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                boxShadow: loading ? 'none' : '0 10px 28px rgba(16,185,129,0.38)',
                '&:hover:not(:disabled)': { transform: 'translateY(-3px)', boxShadow: '0 16px 36px rgba(16,185,129,0.48)' },
                transition: 'all 0.25s',
              }}>
                {loading ? (mode === 'login' ? 'Signing in…' : 'Creating account…') : (mode === 'login' ? 'Sign In 🌿' : 'Create Account 🚀')}
              </Button>

              <Divider sx={{ my: 2, '&::before,&::after': { borderColor: 'rgba(15,118,110,0.13)' } }}>
                <Typography variant="caption" sx={{ color: '#9CA3AF', fontFamily: "'DM Sans', sans-serif" }}>or</Typography>
              </Divider>

              <Button fullWidth variant="outlined" onClick={handleDismiss} sx={{
                py: 1.3, borderRadius: 3,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem',
                borderColor: 'rgba(15,118,110,0.28)', color: '#0F766E',
                '&:hover': { borderColor: '#0F766E', bgcolor: 'rgba(15,118,110,0.05)' },
              }}>
                Continue as Guest 👤
              </Button>

              <Typography variant="caption" sx={{
                display: 'block', textAlign: 'center', color: '#9CA3AF',
                mt: 2, fontFamily: "'DM Sans', sans-serif",
              }}>
                By continuing, you agree to ReWear's{' '}
                <span style={{ color: '#0F766E', cursor: 'pointer' }}>Terms</span> &{' '}
                <span style={{ color: '#0F766E', cursor: 'pointer' }}>Privacy Policy</span>
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginOverlay;