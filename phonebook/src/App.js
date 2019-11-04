import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import listService from './services/list'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
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
    const personObject = { name: newName, number: newNumber }
    setNewName("");
    setNewNumber("");

    if (persons.some(p => p.name === newName) === true) {
      let index = persons.findIndex(p => p.name === newName);
      let id = persons[index].id;
      let checkNameDialogue = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (checkNameDialogue === true) {
        listService
          .update(id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          })
      }
    } else {
      listService
        .create(personObject)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          setNewName("");
          setNewNumber("");
        })
    }
  }

  const deletePerson = (id, name) => {
    let confirmDialogue = window.confirm(`Delete ${name}?`);
    if (confirmDialogue === true) {
      listService
        .deletePerson(id)
        .then(refreshPersons => {
          setPersons(persons.filter(p => p.id !== id)
          );
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h2>add a new contact</h2>
      <PersonForm
        submit={submit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App
