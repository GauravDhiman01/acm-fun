import React, { useState } from 'react';
import '../../styles/pages/activities/weather.css'

export const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apikey = '3fa25225dd20e2011d267d90236e61cf';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

  const backgroundImage = {
    Clear: 'url(../../../assets/images/clear-bg.png)',
    Clouds: 'url(../../../assets/images/clouds-bg.png)',
    Rain: 'url(../../../assets/images/rain-bg.png)',
    Mist: 'url(../../../assets/images/mist-bg.png)',
    Drizzle: 'url(../../../assets/images/drizzle-bg.png)',
    Haze: 'url(../../../assets/images/mist-bg.png)',
    Smoke: 'url(../../../assets/images/mist-bg.png)',
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apikey}`);

      if (response.status === 404) {
        console.error('City not found');
      } else {
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        setBackground(data.weather[0].main);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setBackground = (weatherType) => {
    if (weatherType in backgroundImage) {
      document.body.style.background = backgroundImage[weatherType];
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.background = 'none';
    }
  };

  return (
    <div>
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city Name"
            spellCheck="false"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img src="../../../assets/images/search.png" alt="Search" />
          </button>
        </div>
        <div className="error">
          <p>Invalid City Name</p>
        </div>
        <div className="weather">
          <img src="../../../assets/images/snow.png" className="weather-icon" alt="Weather Icon" />
          <h1 className="temp">{weatherData ? `${weatherData.main.temp}°C` : 'Loading...'}</h1>
          <h2 className="city">{weatherData ? weatherData.name : 'City Name'}</h2>
          <div className="details">
            <div className="col">
              <img src="images/humidity.png" alt="Humidity Icon" />
              <div>
                <p className="humidity">{weatherData ? `${weatherData.main.humidity}%` : 'Loading...'}</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="images/wind.png" alt="Wind Icon" />
              <div>
                <p className="wind">{weatherData ? `${weatherData.wind.speed} km/h` : 'Loading...'}</p>
                <p>Wind Speeds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
