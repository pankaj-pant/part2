import React from 'react';

function Person({key, name, number}) {
    return (
        <div>
            <p key={key}>{name} {number}</p>
        </div>
    )
}

export default Person;
