//new
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const authRoutes = require('./routes/auth'); // Import auth routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Dog Breed Details Endpoint
app.get('/api/dog-breeds/details', async (req, res) => {
  try {
    const response = await axios.get('https://dogapi.p.sulu.sh/api/v2/breeds', {
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_AUTH_TOKEN}`,
      },
    });

    const breedData = response.data.data.map(breed => ({
      id: breed.id,
      name: breed.attributes.name,
      description: breed.attributes.description,
      life_span: `${breed.attributes.life.min} - ${breed.attributes.life.max} years`,
      male_weight: `${breed.attributes.male_weight.min} - ${breed.attributes.male_weight.max} kg`,
      female_weight: `${breed.attributes.female_weight.min} - ${breed.attributes.female_weight.max} kg`,
      hypoallergenic: breed.attributes.hypoallergenic ? "Yes" : "No",
    }));

    res.json({ breeds: breedData });
  } catch (error) {
    console.error('Error fetching dog breed details:', error.message);
    res.status(500).json({ error: 'Failed to fetch dog breed details' });
  }
});

// Instagram Media Details Endpoint
app.get('/api/instagram/media/:shortcode', async (req, res) => {
  const { shortcode } = req.params;
  try {
    const response = await axios.get(`https://instagram-scraper-2022.p.sulu.sh/ig/post_info/?shortcode=${shortcode}`, {
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_AUTH_TOKEN}`,
        Accept: 'application/json',
      },
    });

    const mediaData = response.data.data;
    res.json(mediaData);
  } catch (error) {
    console.error('Error fetching Instagram media:', error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram media' });
  }
});

// Generate Meal Plan Endpoint
app.get('/api/mealplan/generate', async (req, res) => {
    const { diet, exclude, targetCalories, timeFrame } = req.query;
    try {
      const response = await axios.get('https://spoonacular.p.sulu.sh/mealplanner/generate', {
        headers: {
          Authorization: `Bearer ${process.env.INSTAGRAM_AUTH_TOKEN}`, // replace with your actual Spoonacular API key
          Accept: 'application/json',
        },
        params: {
          diet: diet || 'VEG',             // default to 'VEG' if not provided
          exclude: exclude || 'EGGS',      // default to 'EGGS' if not provided
          targetCalories: targetCalories || 2000, // default to 2000 if not provided
          timeFrame: timeFrame || 'DAY',   // default to 'DAY' if not provided
        },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching meal plan:', error.message);
      res.status(500).json({ error: 'Failed to fetch meal plan' });
    }
  });
  
  


// Use authentication routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
