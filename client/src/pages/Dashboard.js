import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, TextField, Card, CardContent, IconButton, List, ListItem, ListItemText, Modal, MenuItem, Select } from '@mui/material';
import { Pets, Restaurant, Favorite, Logout } from '@mui/icons-material';
import api from '../api/api';
import NearbyLocation from './NearbyLocation';

const Dashboard = () => {
  const [dogBreeds, setDogBreeds] = useState([]);
  const [mealPlan, setMealPlan] = useState(null);
  const [diet, setDiet] = useState('Vegetarian');
  const [targetCalories, setTargetCalories] = useState(2000);
  const [instagramCaption, setInstagramCaption] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [favorites, setFavorites] = useState({ breeds: [], meals: [] });
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [petProfiles, setPetProfiles] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetBreed, setNewPetBreed] = useState('');

  const navigate = useNavigate();

  const fetchDogBreeds = async () => {
    try {
      const response = await api.get('/dog-breeds/details');
      setDogBreeds(response.data.breeds);
    } catch (error) {
      console.error('Error fetching dog breeds:', error);
    }
  };

  const generateMealPlan = async () => {
    try {
      const response = await api.get('/mealplan/generate', {
        params: { targetCalories, diet, timeFrame: 'day' },
      });
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    }
  };

  const fetchInstagramCaption = async () => {
    try {
      const response = await api.get(`/instagram/media/${shortcode}`);
      const mediaData = response.data?.xdt_api__v1__media__shortcode__web_info?.items?.[0];
      setInstagramCaption(mediaData?.caption?.text || 'No caption available');
    } catch (error) {
      console.error('Error fetching Instagram caption:', error);
      setInstagramCaption('Failed to fetch caption');
    }
  };

  const addFavoriteBreed = (breed) => {
    setFavorites((prev) => ({
      ...prev,
      breeds: prev.breeds.find((fav) => fav.id === breed.id) ? prev.breeds : [...prev.breeds, breed],
    }));
  };

  const addFavoriteMeal = (meal) => {
    setFavorites((prev) => ({
      ...prev,
      meals: prev.meals.find((fav) => fav.id === meal.id) ? prev.meals : [...prev.meals, meal],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleOpenModal = (breed) => {
    setSelectedBreed(breed);
  };

  const handleCloseModal = () => {
    setSelectedBreed(null);
  };

  const addPetProfile = () => {
    if (newPetName && newPetBreed) {
      const newProfile = { name: newPetName, breed: newPetBreed };
      setPetProfiles((prev) => [...prev, newProfile]);
      setNewPetName('');
      setNewPetBreed('');
      setShowProfileModal(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6c6068, #071b5e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button variant="outlined" color="secondary" onClick={handleLogout} startIcon={<Logout />}>
          Logout
        </Button>
      </Box>

      <Container sx={{ maxWidth: '80vw', padding: '20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>Dashboard</Typography>

        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
          {['Dashboard', 'Favorites', 'Pet Profiles', 'Nearby Places'].map((tab) => (
            <Button key={tab} onClick={() => setActiveTab(tab)} sx={{ fontWeight: activeTab === tab ? 'bold' : 'normal', textDecoration: activeTab === tab ? 'underline' : 'none' }}>
              {tab.toUpperCase()}
            </Button>
          ))}
        </Box>

        {/* Dashboard Tab */}
        {activeTab === 'Dashboard' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
            {/* Dog Breeds Section */}
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
                      <ListItem key={breed.id} button onClick={() => handleOpenModal(breed)}>
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

            {/* Meal Plan Section */}
            <Card sx={{ width: 300, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Restaurant color="secondary" fontSize="large" />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>Meal Plan</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Select value={diet} onChange={(e) => setDiet(e.target.value)} fullWidth>
                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="Vegan">Vegan</MenuItem>
                    <MenuItem value="Keto">Keto</MenuItem>
                  </Select>
                  <TextField label="Target Calories" type="number" value={targetCalories} onChange={(e) => setTargetCalories(e.target.value)} fullWidth />
                </Box>
                <Button variant="contained" color="secondary" onClick={generateMealPlan} fullWidth>
                  Generate Meal Plan
                </Button>
                {mealPlan && (
                  <Box sx={{ mt: 2 }}>
                    <Typography>Target Calories: {mealPlan.nutrients.calories}</Typography>
                    <List>
                      {mealPlan.meals.map((meal) => (
                        <ListItem key={meal.id} button onClick={() => addFavoriteMeal(meal)}>
                          <ListItemText primary={meal.title} />
                          <IconButton size="small">
                            <Favorite color="error" />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Instagram Caption Section */}
            <Card sx={{ width: 300, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Instagram Caption</Typography>
                <TextField label="Enter Instagram Shortcode" value={shortcode} onChange={(e) => setShortcode(e.target.value)} fullWidth sx={{ mt: 2 }} />
                <Button variant="contained" color="primary" onClick={fetchInstagramCaption} fullWidth sx={{ mt: 2 }}>
                  Fetch Caption
                </Button>
                {instagramCaption && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1"><strong>Caption:</strong> {instagramCaption}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Favorites Tab */}
        {activeTab === 'Favorites' && (
          <Box sx={{ mt: 4, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Favorite Dog Breeds Card */}
            <Card sx={{ width: 300, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Pets color="primary" fontSize="large" />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>Favorite Dog Breeds</Typography>
                </Box>
                <List>
                  {favorites.breeds.length > 0 ? (
                    favorites.breeds.map((breed) => (
                      <ListItem key={breed.id}>
                        <ListItemText primary={breed.name} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No favorite dog breeds added.</Typography>
                  )}
                </List>
              </CardContent>
            </Card>

            {/* Favorite Meals Card */}
            <Card sx={{ width: 300, boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Restaurant color="secondary" fontSize="large" />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 1 }}>Favorite Meals</Typography>
                </Box>
                <List>
                  {favorites.meals.length > 0 ? (
                    favorites.meals.map((meal) => (
                      <ListItem key={meal.id}>
                        <ListItemText primary={meal.title} />
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No favorite meals added.</Typography>
                  )}
                </List>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Pet Profiles Tab */}
        {activeTab === 'Pet Profiles' && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">Pet Profiles</Typography>
            <Button onClick={() => setShowProfileModal(true)}>Add Profile</Button>
            <List>
              {petProfiles.length > 0 ? (
                petProfiles.map((profile, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${profile.name} - ${profile.breed}`} />
                  </ListItem>
                ))
              ) : (
                <Typography>No pet profiles added.</Typography>
              )}
            </List>
          </Box>
        )}

        {/* Nearby Places Tab */}
        {activeTab === 'Nearby Places' && <NearbyLocation />}
      </Container>

      {/* Dog Breed Info Modal */}
      <Modal open={Boolean(selectedBreed)} onClose={handleCloseModal}>
        <Box
          sx={{
            maxWidth: '90%',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            mt: '10%',
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>{selectedBreed?.name}</Typography>
          <Typography>Life Span: {selectedBreed?.life_span}</Typography>
          <Typography>Male Weight: {selectedBreed?.male_weight}</Typography>
          <Typography>Female Weight: {selectedBreed?.female_weight}</Typography>
          <Typography>Hypoallergenic: {selectedBreed?.hypoallergenic}</Typography>
          <Button onClick={handleCloseModal} variant="outlined" sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>

      {/* Add Pet Profile Modal */}
      <Modal open={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <Box
          sx={{
            maxWidth: '90%',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            mt: '10%',
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>Add Pet Profile</Typography>
          <TextField label="Pet Name" fullWidth sx={{ mt: 2 }} value={newPetName} onChange={(e) => setNewPetName(e.target.value)} />
          <TextField label="Pet Breed" fullWidth sx={{ mt: 2 }} value={newPetBreed} onChange={(e) => setNewPetBreed(e.target.value)} />
          <Button onClick={addPetProfile} variant="contained" sx={{ mt: 2 }}>Add Profile</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
