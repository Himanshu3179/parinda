"use client";
import { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface MapProps {
  latitude: number;
  longitude: number;
  markers: { lat: number; lng: number }[];
}

const Map = ({ latitude, longitude, markers }: MapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  };

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(marker => bounds.extend(new google.maps.LatLng(marker.lat, marker.lng)));
      mapRef.current.fitBounds(bounds);
    }
  }, [markers]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: latitude, lng: longitude }} // Initial center, will be adjusted by fitBounds
        zoom={10}
        onLoad={onLoad}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
