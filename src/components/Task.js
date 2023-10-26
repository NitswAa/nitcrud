import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Task(props) {
    const [isForm, setIsForm] = useState(false)
    // Usually can refactor something like this?
    // Except in this case, we want to fill the form in with
    // data from the database for later editing...
    const [formData, setFormData] = useState({ content: props.content, isChecked: props.isChecked })

    function swapDisplay() {
        setIsForm(prev => !prev)

    }

    function deleteTask() {
        // Remove item from parent state
        props.removeFromList(props.id)

        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ id: props.id })
        }

        fetch('http://localhost:3001/api', options)
            .then(res => res.json()
            .then(status => console.log(status)))
    }

    function updateTask(e) {
        const {name, checked} = e.target

        console.log(name)

        const newTask = {
            id: props.id,
            content: formData.content,
            isChecked: name === "complete" ? checked : props.isChecked
        }

        // Update parent state
        props.updateList(newTask)

        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newTask)
        }

        fetch('http://localhost:3001/api', options)
            .then(res => res.json()
            .then(status => console.log(status)))
    }

    function handleChange(e) {
        setFormData(prev => {
            return {
                ...prev,
                content: e.target.value
            }
        })
    }

    // Unique because we want to reset the
    // form data to reflect no committed change
    function handleMouseOut(e) {
        swapDisplay()
        setFormData(prev => {
            return {
                ...prev,
                content: props.content
            }
        })
    }

    // Submitting this form is an UPDATE
    // However, can make the API call w/out
    // using an effect hook, since wrapped in
    // a function
    function handleSubmit(e) {
        e.preventDefault()
        swapDisplay()
        updateTask(e)
    }

    return (
        <div className="task-main">
            <form className="task-checkbox-form">
                <input 
                    className="task-checkbox"
                    name="complete"
                    type="checkbox" 
                    checked={props.isChecked} 
                    onChange={updateTask} 
                />
            </form>

            {!isForm && 
                <p    
                    className="task-content" 
                    onClick={swapDisplay}
                >
                    {props.content}
                </p>
            }

            {isForm && 
                <form className="task-form" onSubmit={handleSubmit}>
                    <input 
                        name="content"
                        type="text" 
                        value={formData.content}
                        onChange={handleChange} 
                        onMouseOut={handleMouseOut}
                    />
                </form>
            }
            
            <button onClick={deleteTask}>
                <FontAwesomeIcon icon={faTrashCan} style={{color: "#fff",}} />
            </button>
        </div>
    )
}