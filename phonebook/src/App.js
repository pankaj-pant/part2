import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import listService from './services/list'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    listService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const submit = (event) => {
    event.preventDefault();
    const personObject = {name: newName, number: newNumber}
    setNewName("");
    setNewNumber("");

    persons.some(item => item.name === newName) ? alert(`${newName} is already added to phonebook`) :
    listService
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
      })
  }

  const deletePerson = (id) => {
    listService
      .deletePerson(id)
      .then(refreshPersons => {
        setPersons(persons.filter(p => p.id !== id)
        );
      })
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
      <Persons persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
