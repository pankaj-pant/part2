import React from 'react';
import Person from './Person'

function Persons({persons, deletePerson, foundPerson, searchedPerson}) {
    const rows = () =>
        searchedPerson === ""
        ? (persons.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} deletePerson={deletePerson}/>)
        ) : ( foundPerson.map(p => (<li key={p.id}> {p.name} {p.number}</li>))
        )
    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons;
