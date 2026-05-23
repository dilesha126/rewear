import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const Contact = () => (
  <Container sx={{ py: 16 }}>
    <Typography variant="h2" sx={{ mb: 8 }}>
      Contact Us
    </Typography>
    <Paper sx={{ p: 6 }}>
      <Typography>Email: support@rewear.com</Typography>
      <Typography>Phone: +91 98765 43210</Typography>
    </Paper>
  </Container>
);

export default Contact;