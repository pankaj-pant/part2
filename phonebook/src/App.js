import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const submit = (event) => {
    event.preventDefault();
    persons.some(item => item.name === newName) ? alert(`${newName} is already added to phonebook`) :
    setPersons([...persons, {name: newName, number: newNumber}]);
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>add a new</h2>
      <PersonForm 
        submit={submit} 
        handleNameChange={handleNameChange} 
        newName={newName} 
        handleNumberChange={handleNumberChange} 
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons}/>
      
    </div>
  )
}

export default App
