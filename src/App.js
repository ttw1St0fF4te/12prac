import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import CityList from './components/CityList';
import axios from 'axios';

const App = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCityByLocation = async (lat, lon) => {
            try {
                const result = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=8aef87ed913d3adcc7d0754b0323383e`);
                const city = result.data[0].name;
                setSelectedCity(city);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching city by location:', error);
                setSelectedCity('Moscow');
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchCityByLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setSelectedCity('Moscow');
                    setLoading(false);
                }
            );
        } else {
            setSelectedCity('Moscow');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="container">
            <CityList onSelectCity={setSelectedCity} />
            <CurrentWeather city={selectedCity} />
            <WeatherForecast city={selectedCity} />
        </div>
    );
};

export default App;
