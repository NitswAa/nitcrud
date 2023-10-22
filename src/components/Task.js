import React, { useState } from 'react';

export default function Task(props) {
    const [isForm, setIsForm] = useState(false)
    // Usually can refactor something like this?
    const [formData, setFormData] = useState({ content: props.content, isChecked: props.isChecked })

    function swapDisplay() {
        setIsForm(prev => !prev)
    }

    function deleteTask() {
        props.removeFunction(props.id)

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

        props.updateFunction(newTask)

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
            {!isForm && 
                <>
                    <p className="task-content" onClick={swapDisplay}>{props.content}</p>
                    <form>
                        <input 
                            name="complete"
                            type="checkbox" 
                            checked={props.isChecked} 
                            onChange={updateTask} 
                        />
                    </form>
                </>
            }
            {isForm &&
                <form onSubmit={handleSubmit}>
                    <input 
                        name="content"
                        type="text" 
                        value={formData.content}
                        onChange={handleChange} />
                    <input 
                        name="complete"
                        type="checkbox" 
                        checked={props.isChecked} 
                        onChange={updateTask} 
                    />
                </form>
            }
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}