const app = document.getElementById("app")

function Header({ title }) {
    return (
        <h1>{title ? title : 'Default Title'}</h1>
    )
}

// Do I want this function global or in some component? Feel like
// it can't be in Item...
function handleDelete() {
    
}

// Similar...
function handleEdit() {

}

function Item({ content, isChecked=false }) {
    return (
        <tr> 
        {/* Can I use keys to reference rows? 
            Or should I just convert to stylized list... */}
            <td>{content}</td>
            {/* I want this (below) to eventually just be a checkbox */}
            <td>{isChecked ? "True" : "False"}</td>
            {/* Options: Re-render item content as input form (and replace edit
                button with submit?) 
                Or prompt user input and replace */}
            <td><button onClick={handleDelete}><i class="fa-solid fa-pencil"></i> Edit</button></td>
            <td><button onClick={handleEdit}><i class="fa fa-trash"></i> Delete</button></td>
        </tr>
    )
}

function Form() {
    const [items, setItems] = React.useState([])

    function handleSubmit(e) {
        e.preventDefault();
    
        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        
        const formJson = Object.fromEntries(formData.entries())
        console.log(formJson)

        // Update item list
        setItems(
            [
                ...items,
                { content: formJson.itemContent, isChecked: false }
            ]
        )
        console.log(items)

        // Clear text input (there's gotta be a better way?!)
        document.getElementById("itemInput").value = ''
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <label>Item</label>
                <input id="itemInput" name="itemContent" type="text" />
                <button id="newItemBtn" type="submit">Submit</button>
            </form>
            <table>
            <tr>
                <th>Item </th>
                <th>Completed?</th>
            </tr>
            {items.map((item) => (
                <Item content={item.content} isChecked={item.isChecked}/>
            ))}
            </table>
        </div>
    )
}

function HomePage() {
    

    return (
        <div>
            <Header title="A rough To-Do List" />
            <Form />           
        </div>
    )
}

ReactDOM.render(<HomePage />, app)