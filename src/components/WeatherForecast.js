import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = ({ city }) => {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const fetchForecast = async () => {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8aef87ed913d3adcc7d0754b0323383e&units=metric`);
            setForecast(result.data.list);
        };
        fetchForecast();
    }, [city]);

    return (
        <div>
            <h2 className="forecast-city">7-Day Forecast</h2>
            <div className="forecast">
                {forecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                        <p>{new Date(day.dt_txt).toDateString()}</p>
                        <p>{day.weather[0].description}</p>
                        <p>Temp: {day.main.temp}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
