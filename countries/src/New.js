import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
 

  useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
            'https://restcountries.eu/rest/v2/all',
          );
          const countries = await result.data;
          setCountries(countries);
          console.log('Inside useEffect')
      };
      fetchData();
  }, []);

  /* const fetchData = async () => {
    const result = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5ea4a910ca431288ef44af3146fd1866`,
      );
      const weatherCondition = await result.data;
      setWeather(weatherCondition);
      console.log('Inside fetchData')
  }; */
    
  const handleChange = (event) => {
    setSearch(event.target.value);
    console.log('Inside handleChange');
    
  }

  
  const filteredCountries = () => {
      const data = countries.filter(c => c.name.toString().toLowerCase().includes(search.toString().toLowerCase()) === true);
      setFiltered(data);
      
  }
  

  return (
    <div className="App">
      find countries <input type="text" value={search} onChange={handleChange}/>
      <button onClick={filteredCountries}>Search</button>
    </div>
  );
}

export default App;
