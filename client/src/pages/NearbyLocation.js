// src/pages/NearbyPlaces.js
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Typography } from '@mui/material';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FuYTIwIiwiYSI6ImNtM2N3bW93czFkMWYya3NhMXIyMHkzMmEifQ.cKBB5W2vw0BBKm_w4vFw0g';

const NearbyPlaces = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  //Added functionality for pet shops
  const [petServices, setPetServices] = useState([
    { name: "Pet Shop 1", latitude: 53.349805, longitude: -6.26031 }, 
    { name: "Pet Shop 2", latitude: 53.344, longitude: -6.267 },
    // Add more pet services here
  ]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.26031, 53.349805],
      zoom: 10,
    });

    // Added markers for each pet service location
    petServices.forEach(service => {
      new mapboxgl.Marker()
        .setLngLat([service.longitude, service.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // Add popups
          .setText(service.name))
        .addTo(map.current);
    });
  }, [petServices]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Nearby Pet Services
      </Typography>
      <div ref={mapContainer} style={{ height: '500px', borderRadius: '8px', overflow: 'hidden' }} />
    </div>
  );
};

export default NearbyPlaces;
