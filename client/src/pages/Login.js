import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Avatar, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      alert('Login successful');
      localStorage.setItem('token', response.data.token);
      navigate('/adventure'); // Redirect to the adventure selection page
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e09, #d0e)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: '20px',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
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
      </Box>
    </Container>
  );
};

export default Login;
