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

        const postData = {
            id: uuidv4(),
            content: formData.content,
            isChecked: false
        }

        // Add it to local state (in App)
        // TODO Add id and isChecked functionality HERE instead
        props.addFunction(formData)

        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postData)
        }

        // Should be fine, since contained in a submit function
        fetch('http://localhost:3001/api', options)
            .then(res => res.json()
            .then(console.log(res)))
    }

    return (
    <form className='post-form' onSubmit={submitPost}>
        <input type="text" onChange={handleChange} placeholder="New task" />
        <button>Create</button>
    </form>
    )
}