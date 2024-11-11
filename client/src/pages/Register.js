import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message);
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <Container
      component="main"
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8e85c5, #5a6686)',
        padding: 0,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          margin: '0 16px',
        }}
      >
        <Avatar sx={{ margin: '0 auto', backgroundColor: '#3f51b5' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
          Already have an account? <a href="/login" style={{ color: '#3f51b5', textDecoration: 'none' }}>Login</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
