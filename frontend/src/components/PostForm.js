import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// TODO Make this controlled, except that's useless?!
export default function PostForm(props) {
    const [formData, setFormData] = useState({ content: '' })

    function handleChange(e) {
        setFormData({ content: e.target.value })
    }

    function submitPost(e) {
        e.preventDefault()

        if(e.target[0].value === "") {
            // Implies empty input, no need for new task
            return
        }

        const newTask = {
            task_id: uuidv4(),
            content: formData.content,
            complete: false
        }

        // Add it to local state (in App)
        props.addTask(newTask)

        // Empty out input field, reset formData for no double inputs
        e.target[0].value = "" 
        setFormData({content: e.target[0].value})

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newTask)
        }

        fetch('http://localhost:3001/api', options)
            .then(res => res.json()
            .then(console.log(res)))
    }

    return (
        <div class="header">
            <h2>To-Dos</h2>
            <p>Enter a new task or click to edit an existing one!</p>
            <form className='post-form' onSubmit={submitPost}>
                <input name="user-input" type="text" onChange={handleChange} placeholder="New task" />
                <button>Create</button>
            </form>
        </div>
    )
}