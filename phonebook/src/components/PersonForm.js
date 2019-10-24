import React from 'react';

function PersonForm({submit, handleNameChange, newName, handleNumberChange, newNumber}) {
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name: <input onChange={handleNameChange} value={newName}/>
                    number: <input onChange={handleNumberChange} value={newNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;
