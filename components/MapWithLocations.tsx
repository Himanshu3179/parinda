// app/components/MapWithLocations.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Location } from '@/types/location';
const MapWithLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/locations');
            const data = await response.json();
            setLocations(data);
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        if (locations.length > 0 && mapRef.current) {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: locations[0].latitude, lng: locations[0].longitude },
                zoom: 12,
            });

            locations.forEach((location) => {
                new google.maps.Marker({
                    position: { lat: location.latitude, lng: location.longitude },
                    map,
                });
            });
        }
    }, [locations]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapWithLocations;
