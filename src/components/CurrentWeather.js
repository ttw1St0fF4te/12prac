import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrentWeather = ({ city }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8aef87ed913d3adcc7d0754b0323383e&units=metric`);
                setWeather(result.data);
                document.body.className = getWeatherClass(result.data.weather[0].main.toLowerCase());
                setError('');
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError('City not found. Please try again.');
                    setWeather(null);
                }
            }
        };
        fetchWeather();
    }, [city]);

    const getWeatherClass = (weather) => {
        switch (weather) {
            case 'thunderstorm':
                return 'thunderstorm';
            case 'clear':
                return 'clear';
            case 'rain':
                return 'rain';
            case 'snow':
                return 'snow';
            case 'clouds':
                return 'clouds';
            default:
                return '';
        }
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {weather && (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{weather.name}</h2>
                        <p className="card-text">{weather.weather[0].description}</p>
                        <p className="card-text">Temperature: {weather.main.temp}°C</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;
