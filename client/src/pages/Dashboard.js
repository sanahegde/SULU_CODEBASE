import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Card, CardContent, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Pets, Favorite, Logout } from '@mui/icons-material';
import api from '../api/api';

const Dashboard = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchDogBreeds = async () => {
    try {
      const response = await api.get('/dog-breeds/details');
      setDogBreeds(response.data.breeds);
    } catch (error) {
      console.error('Error fetching dog breeds:', error);
    }
  };

  const addFavoriteBreed = (breed) => {
    setFavorites((prev) => [...prev, breed]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6c6068, #071b5e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container sx={{ maxWidth: '80vw', padding: '20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>Pet Haven</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
          <Card sx={{ width: 300, boxShadow: 4, borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Pets color="primary" fontSize="large" />
                <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>Dog Breeds</Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={fetchDogBreeds} fullWidth>
                Get Dog Breeds
              </Button>
              {dogBreeds.length > 0 && (
                <List>
                  {dogBreeds.map((breed) => (
                    <ListItem key={breed.id}>
                      <ListItemText primary={breed.name} />
                      <IconButton size="small" onClick={() => addFavoriteBreed(breed)}>
                        <Favorite color="error" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Box>

        <Button variant="outlined" color="secondary" onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Container>
    </Box>
  );
};

export default Dashboard;
