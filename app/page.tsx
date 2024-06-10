'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Map from '@/components/Map';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data: markers, mutate } = useSWR('/api/location', fetcher, {
    fallbackData: [],
  });

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

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

  const handleUpdateLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);

      try {
        await fetch('/api/location', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        });
        mutate();
        setError(null);
      } catch (err) {
        setError('Failed to update location.');
      }
    });
  };

  return (
    <div className='px-10 py-10 p flex flex-col gap-3'>
      <div className='flex gap-3'> 
      <Button onClick={handleLocation}>Take My Location</Button>
      <Button onClick={handleUpdateLocation}>Update My Location</Button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {latitude && longitude ? (
        <Map latitude={latitude} longitude={longitude} markers={markers} />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}
