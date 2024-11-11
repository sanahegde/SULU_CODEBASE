import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import api from '../api/api';

function NearbyLocation() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('/nearby-locations');
        setLocations(response.data.locations);
      } catch (error) {
        console.error('Failed to fetch locations', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Nearby Locations
      </Typography>
      <List>
        {locations.map((location) => (
          <ListItem key={location.id}>
            <ListItemText primary={location.name} secondary={location.address} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default NearbyLocation;
