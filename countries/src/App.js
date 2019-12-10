import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')
  //const [weather, setWeather] = useState(null)


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const Weather = ({ country }) => {
    const [weather, setWeather] = useState("");
  
    let capital = country.capital;
  
    useEffect(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=5ea4a910ca431288ef44af3146fd1866`
        )
        .then(response => {
          const data = response.data;
          const weatherObject = {
            temperature: data.main.temp,
            windDirection: data.wind.deg,
            windSpeed: data.wind.speed,
            weatherImage: data.weather[0].icon
          };
          setWeather(weatherObject);
        });
    }, [capital]);

    return (
      <div>
        <h3>Weather in {capital}</h3>
        <b>temperature:</b> {weather.temperature} Celcius
        <br />
        <img src={`http://openweathermap.org/img/wn/${weather.weatherImage}@2x.png`} alt="weatherImage" />
        <br />
        <b> wind:</b> {weather.windSpeed} kph direction {weather.windDirection} degrees
      </div>
    )
  }
    

  const handleChange = (event) => {
    setFiltered(event.target.value)
  }

  const display = countries.filter(c => c.name.toString().toLowerCase().includes(filtered.toString().toLowerCase()) === true)

  const handleClick = name => {
    setFiltered(name)
  }

  let text;
  if(filtered === "") {
    text = <p>Search for country</p>
  } else if (display.length > 10) {
    text = <p>Too many matches</p>
  } else if (display.length > 1) {      
    text = display.map(d => 
      <p key={d.alpha3Code}>
        {d.name}
        <button onClick={() => handleClick(d.name)}>show</button>
      </p>)
  } else {
    text = display.map(d => 
      <div key={d.alpha3Code}>
        <h2>{d.name}</h2>
        <p>capital {d.capital}</p>
        <p>population {d.population}</p>
        <h2>languages</h2>
        <ul>
          {d.languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img src={d.flag} height='200px' width='400px' alt='flag'/>
        <Weather country={d} />
      </div>
      )
    
  }

  return (
    <div className="App">
      find countries <input type="text" value={filtered} onChange={handleChange}/>
      {text}
    </div>
  );
}

export default App;
