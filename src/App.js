import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { motion } from 'framer-motion';
import theme from './theme/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import Track from './pages/Track';
import Ngos from './pages/Ngos';
import About from './pages/About';
import Contact from './pages/Contact';
import { DonationProvider } from './pages/Donationcontex';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <Router>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1 }}
          >
            <DonationProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donor/donate" element={<Donate />} />
                <Route path="/track" element={<Track />} />
                <Route path="/ngos" element={<Ngos />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
              </Routes>
            </DonationProvider>
          </motion.main>
          <Footer />
        </Box>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;