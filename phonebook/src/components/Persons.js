import React from 'react';
import Person from './Person'

function Persons({persons, deletePerson}) {
    return (
        <div>
            {persons.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} deletePerson={deletePerson}/>)}
        </div>
    )
}

export default Persons;
