// src/Heatmap.tsx
import React from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 37.7749, // Example: San Francisco
  lng: -122.4194,
};

// Example heatmap data sets
const heatmapData1 = [
  new google.maps.LatLng(37.782, -122.447),
  new google.maps.LatLng(37.782, -122.445),
  // Add more LatLng objects for the first heatmap
];

const heatmapData2 = [
  new google.maps.LatLng(37.789, -122.426),
  new google.maps.LatLng(37.790, -122.420),
  // Add more LatLng objects for the second heatmap
];

const Heatmap: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        <HeatmapLayer data={heatmapData1} />
        <HeatmapLayer data={heatmapData2} />
        {/* Add more HeatmapLayer components as needed */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Heatmap;
