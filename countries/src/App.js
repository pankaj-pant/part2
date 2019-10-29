import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFiltered(event.target.value)
  }

  const display = countries.filter(c => c.name.toString().toLowerCase().includes(filtered.toString().toLowerCase()) === true)

  let text;
  if(filtered === "") {
    text = <p>Search for country</p>
  } else if (display.length > 10) {
    text = <p>Too many matches</p>
  } else if (display.length > 1) {
    text = display.map(d => <p key={d.alpha3Code}>{d.name}</p>)
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
        <img src={d.flag} height='200px' width='400px' />
      </div>)
  }

  return (
    <div className="App">
      find countries <input type="text" value={filtered} onChange={handleChange}/>
{/*       {filtered == "" ? <p>Search for country</p> : (display.length > 10 ? <p>Too many matches</p> : display.map(d => <p key={d.alpha3Code}>{d.name}</p>))} */}
  {text}
      
      
    

      
    </div>
  );
}

export default App;
