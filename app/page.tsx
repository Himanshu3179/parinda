'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Map from '@/components/Map';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data: markers, mutate } = useSWR('/api/location', fetcher, {
    fallbackData: [],
  });

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <div className='px-10 py-10 p flex flex-col gap-3'>
      <p>Users from different parts of the country </p>
      {latitude && longitude ? (
        <Map latitude={latitude} longitude={longitude} markers={markers} />
      ) : (
        <p>Loading map...(reload the page if not loading)</p>
      )}
    </div>
  );
}
