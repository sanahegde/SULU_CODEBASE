import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      alert(response.data.message);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
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
        background: 'linear-gradient(135deg, #e09, #d0e)',
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ marginTop: '20px' }}>
          Don't have an account? <a href="/register" style={{ color: '#3f51b5', textDecoration: 'none' }}>Sign Up</a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
