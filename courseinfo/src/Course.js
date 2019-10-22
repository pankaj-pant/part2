import React from 'react';

const Header = ({name}) => {
    return(
        <div>
            <h2>{name}</h2>
        </div>
    )
}

const Content = ({parts}) => {
    return(
        <div>
            {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return(
        <div>
            <p>{name} {exercises}</p>
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, p) => sum + p.exercises, 0);
    
    return(
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )
}

function Course({course}) {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course;
