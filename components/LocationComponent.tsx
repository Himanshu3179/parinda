"use client"
import React, { useState } from 'react';


interface Location {
    latitude: number | null;
    longitude: number | null;
}

const LocationComponent: React.FC = () => {
    const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                // saveLocation({ latitude, longitude });
            },
                (error) => {
                    console.error("Error Code = " + error.code + " - " + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const saveLocation = async (loc: Location) => {
        try {
            //   await axios.post('http://localhost:5000/api/location', loc);
            // use fetch 
            const response = await fetch('http://localhost:5000/api/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loc),
            });
            const data = await response.json();
            console.log(data);

            alert('Location saved successfully!');
        } catch (error) {
            console.error('Error saving location:', error);
            alert('Failed to save location.');
        }
    };

    return (
        <div>
            <h1>Get Current Location</h1>
            <button onClick={getLocation} className='bg-blue-500 '>Get Current Location</button>
            <div>
                <h2>Current Location:</h2>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                {

                    location.latitude && location.longitude &&
                    <p>
                        Full Location look on maps : <a href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}>Click here</a>
                    </p>
                }
            </div>
        </div>
    );
};

export default LocationComponent;
