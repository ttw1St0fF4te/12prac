import React, { useState } from 'react';

const CityList = ({ onSelectCity }) => {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const basicCities = ['New York', 'London', 'Paris', 'Tokyo', 'Beijing'];

    const handleSelectCity = (city) => {
        onSelectCity(city);
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (/[^a-zA-Z\u0400-\u04FF\s]/.test(city)) {
            setError('City name can only contain letters and spaces.');
            return;
        }
        onSelectCity(city);
        setError('');
    };

    return (
        <div className="mb-4">
            <h3 className="mb-3">Basic Cities</h3>
            <ul className="list-group mb-3">
                {basicCities.map((city, index) => (
                    <li
                        key={index}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSelectCity(city)}
                    >
                        {city}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="input-group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    placeholder="Search city..."
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
    );
};

export default CityList;
