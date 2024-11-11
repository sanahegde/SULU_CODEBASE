import React from 'react';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        fontFamily: "'Orbitron', sans-serif", // A clean, unique font
        fontWeight: 'bold',
        color: 'transparent',
        backgroundClip: 'text',
        backgroundImage: 'linear-gradient(90deg, #00C6FF, #0072FF)', // Gradient for the text itself
        textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
        letterSpacing: '0.15em',
        userSelect: 'none',
        position: 'absolute',
        top: '20px',
        left: '40px',
      }}
    >
      PawPlanet
    </Typography>
  );
};

export default Header;
