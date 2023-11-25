import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// For not running on container
// const apiURL = 'http://localhost:3001/api'; 
// For running on container?
// const apiURL = 'http://172.17.0.3:3001/api'; 
// For running composed?
const apiURL = 'http://api-server:3001/api';

export default function Task(props) {
    const [isForm, setIsForm] = useState(false)
    const [formData, setFormData] = useState({ content: props.content, complete: props.complete })

    function swapDisplay() {
        setIsForm(prev => !prev)
    }

    function deleteTask() {
        props.removeTask(props.task_id)

        const options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ task_id: props.task_id })
        }

        fetch(apiURL, options)
            .then(res => res.json()
            .then(status => console.log(status)))
    }

    function updateTask(e) {
        const {name, checked} = e.target

        console.log(name)

        const updatedTask = {
            task_id: props.task_id,
            content: formData.content,
            complete: name === "complete" ? checked : props.complete
        }

        props.updateTask(updatedTask)

        const options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        }

        fetch(apiURL, options)
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
                    checked={props.complete} 
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