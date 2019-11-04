import React from 'react';

function Person({id, name, number, deletePerson}) {
    return (
        <div>
            <p>
                {name} {' '}
                {number} {' '}
                <button onClick={() => deletePerson(id, name)}>delete</button>
            </p>
            
        </div>
    )
}

export default Person;
