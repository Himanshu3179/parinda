import React from 'react'
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Map from '@/components/Map';


const fetcher = (url: string) => fetch(url).then(res => res.json());
    
const SetLocationButton = () => {
    const { data: markers, mutate } = useSWR('/api/location', fetcher, {
        fallbackData: [],
    });

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            try {
                await fetch('/api/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ latitude, longitude }),
                });
                mutate();
                setError(null);
            } catch (err) {
                setError('Failed to save location.');
            }
        });
    };

    return (
        <Button onClick={handleLocation}>Set Coordinates Automatically</Button>
    )
}

export default SetLocationButton