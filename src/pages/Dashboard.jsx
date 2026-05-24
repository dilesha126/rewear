import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Paper, Button, Avatar, Grid } from '@mui/material';
import { Logout } from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 5, maxWidth: 1100, mx: 'auto' }}>
      <Paper sx={{ p: 5, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 5 }}>
          <Avatar src={user?.avatar} sx={{ width: 90, height: 90 }} />
          <Box>
            <Typography variant="h4" fontWeight={800}>
              Welcome back, {user?.name.split('@')[0]} 👋
            </Typography>
            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f6f2' }}>
              <Typography variant="h2" color="#10B981" fontWeight={900}>12</Typography>
              <Typography>Donations Made</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f6f2' }}>
              <Typography variant="h2" color="#10B981" fontWeight={900}>8</Typography>
              <Typography>Clothes Recycled</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f8f6f2' }}>
              <Typography variant="h2" color="#10B981" fontWeight={900}>47kg</Typography>
              <Typography>CO₂ Saved</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={logout}
            size="large"
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;