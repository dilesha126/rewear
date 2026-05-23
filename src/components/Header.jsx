import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem
} from '@mui/material';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import ReWearLogo from '../images/ReWear-logo.png';
import LoginOverlay from './LoginOverlay'; // ← NEW

const Header = () => {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeLink, setActiveLink]   = useState('/');
  const [showLogin, setShowLogin]     = useState(false); // ← controls overlay

  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  // ── Show login overlay once on first visit (session-based) ──────────────
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('rw_login_shown');
    if (!alreadySeen && !user) {
      // Small delay so the page renders first, then the login appears
      const t = setTimeout(() => setShowLogin(true), 400);
      return () => clearTimeout(t);
    }
  }, [user]);

  const handleCloseLogin = () => {
    sessionStorage.setItem('rw_login_shown', 'true');
    setShowLogin(false);
  };

  // ── Active link tracker ─────────────────────────────────────────────────
  useEffect(() => { setActiveLink(location.pathname); }, [location.pathname]);

  // ── Scroll shadow ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home',   path: '/' },
    { name: 'Donate', path: '/donor/donate' },
    { name: 'Track',  path: '/track' },
    { name: 'NGOs',   path: '/ngos' },
    { name: 'About',  path: '/about' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu  = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ── Mobile Drawer ───────────────────────────────────────────────────────
  const drawer = (
    <Box sx={{ width: 300 }}>
      {/* Drawer header */}
      <Box
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, #0F766E 0%, #10B981 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src={ReWearLogo}
            alt="ReWear Logo"
            style={{ height: 48, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
              ReWear
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Wear the Change ✨
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ p: 2 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              px: 3, py: 2.5, mx: 1, my: 0.5, borderRadius: 3,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(16, 185, 129, 0.08)',
                transform: 'translateX(12px)',
              },
              backgroundColor:
                activeLink === item.path ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
            }}
          >
            <ListItemText
              primary={item.name}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: activeLink === item.path ? 800 : 600,
                  color: activeLink === item.path ? '#0F766E' : 'inherit',
                },
              }}
            />
          </ListItem>
        ))}

        {/* Login / Avatar in mobile drawer */}
        <Box sx={{ px: 2, pt: 2 }}>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Avatar src={user.avatar} sx={{ width: 36, height: 36 }} />
              <Typography sx={{ fontWeight: 700, color: '#0F766E' }}>
                {user.name.split('@')[0]}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => { logout(); handleDrawerToggle(); }}
                sx={{ ml: 'auto', borderColor: '#EF4444', color: '#EF4444', borderRadius: 50 }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => { setShowLogin(true); handleDrawerToggle(); }}
              sx={{
                mb: 2, py: 1.5, borderRadius: 3,
                borderColor: '#0F766E', color: '#0F766E',
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(15,118,110,0.06)' },
              }}
            >
              Login / Register
            </Button>
          )}
        </Box>

        <Box sx={{ px: 2, pb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/donor/donate"
            size="large"
            onClick={handleDrawerToggle}
            sx={{
              py: 2, borderRadius: 4,
              fontSize: '1.1rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #10B981, #059669)',
              boxShadow: '0 12px 35px rgba(16, 185, 129, 0.35)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 20px 45px rgba(16, 185, 129, 0.45)',
              },
            }}
          >
            Start Donating Now 🚀
          </Button>
        </Box>
      </List>
    </Box>
  );

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Login Overlay (shown on first load or when user clicks Login) ── */}
      {showLogin && <LoginOverlay onClose={handleCloseLogin} />}

      <AppBar
        position="sticky"
        sx={{
          bgcolor: scrolled ? 'rgba(248, 246, 242, 0.97)' : '#f8f6f2',
          backdropFilter: 'blur(24px)',
          boxShadow: scrolled
            ? '0 10px 40px rgba(0,0,0,0.08)'
            : '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 85 }}>

          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex', alignItems: 'center',
              textDecoration: 'none',
              '&:hover': { transform: 'scale(1.08)' },
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={ReWearLogo}
              alt="ReWear"
              style={{
                height: 42,
                filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.2))',
              }}
            />
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 2, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{
                  position: 'relative',
                  color: activeLink === item.path ? '#0F766E' : '#2C3E50',
                  fontWeight: 700,
                  px: 3.5, py: 1.5,
                  borderRadius: 50,
                  fontSize: '1.02rem',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(16, 185, 129, 0.08)',
                    color: '#0F766E',
                    transform: 'translateY(-2px)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2, left: '50%',
                    width: activeLink === item.path ? '65%' : '0%',
                    height: 3,
                    bgcolor: '#10B981',
                    borderRadius: '3px',
                    transition: 'all 0.4s',
                    transform: 'translateX(-50%)',
                  },
                }}
              >
                {item.name}
              </Button>
            ))}

            {/* ── User Avatar / Login Button ── */}
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontWeight: 600, color: '#0F766E' }}>
                    {user.name.split('@')[0]}
                  </Typography>
                  <IconButton onClick={handleMenu}>
                    <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                  </IconButton>
                </Box>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem
                    component={RouterLink}
                    to="/dashboard"
                    onClick={handleClose}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => { logout(); handleClose(); }}
                    sx={{ color: 'error.main' }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setShowLogin(true)}   // ← opens overlay
                sx={{
                  borderRadius: 50, px: 4,
                  fontWeight: 700,
                  borderColor: '#0F766E',
                  color: '#0F766E',
                  '&:hover': {
                    bgcolor: 'rgba(15,118,110,0.06)',
                    borderColor: '#0F766E',
                  },
                }}
              >
                Login
              </Button>
            )}

            {/* Donate CTA */}
            <Button
              variant="contained"
              component={RouterLink}
              to="/donor/donate"
              sx={{
                borderRadius: 50,
                px: 5, py: 1.6,
                fontWeight: 800,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.03)',
                  boxShadow: '0 20px 45px rgba(16, 185, 129, 0.5)',
                },
              }}
            >
              Donate Now 🌱
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { lg: 'none' },
              color: '#0F766E',
              width: 58, height: 58,
              border: '2px solid rgba(16, 185, 129, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(16, 185, 129, 0.1)',
                transform: 'rotate(90deg)',
              },
            }}
          >
            {mobileOpen ? <Close fontSize="large" /> : <MenuIcon fontSize="large" />}
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', lg: 'none' } }}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            border: 'none',
            boxShadow: '-25px 0 70px rgba(0,0,0,0.18)',
            width: 300,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;