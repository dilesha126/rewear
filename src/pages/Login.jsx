import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, Typography, Paper, Container,
  CircularProgress, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import ReWearLogo from '../images/ReWear-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (email && password) {
        login(email, email.split('@')[0]); // Fake name from email
        navigate('/dashboard');
      } else {
        setError("Please fill all fields");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F766E 0%, #134E4A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1581092160607-4f4b8a5f8e4a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <img 
            src={ReWearLogo} 
            alt="ReWear" 
            style={{ height: 90, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }} 
          />
          <Typography 
            variant="h3" 
            sx={{ 
              mt: 3, 
              fontWeight: 900, 
              color: 'white',
              letterSpacing: -1 
            }}
          >
            ReWear
          </Typography>
          <Typography sx={{ color: '#A1E2C8', fontSize: '1.1rem' }}>
            Wear the Change ✨
          </Typography>
        </Box>

        <Paper
          elevation={10}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 5,
            background: 'rgba(248, 246, 242, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 60px rgba(15, 118, 110, 0.4)'
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight={800} color="#0F766E">
            Welcome Back
          </Typography>
          <Typography align="center" color="#455A64" sx={{ mb: 4 }}>
            Login to continue your sustainable journey
          </Typography>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#0F766E' }} />
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2.2,
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 45px rgba(16, 185, 129, 0.5)'
                }
              }}
            >
              {loading ? <CircularProgress size={28} color="inherit" /> : "Login Now"}
            </Button>
          </form>

          <Typography align="center" sx={{ mt: 4, color: '#455A64' }}>
            Don't have an account? <span style={{ color: '#10B981', cursor: 'pointer' }}>Sign Up</span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;