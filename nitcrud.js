const app = document.getElementById("app")
let id_counter = 0

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

function Item({ item_id, content, isChecked=false }) {
    return (
        <tr > 
        {/* Can I use keys to reference rows? 
            Or should I just convert to stylized list... */}
            <td>{content}</td>
            {/* I want this (below) to eventually just be a checkbox */}
            <td>{isChecked ? "True" : "False"}</td>
            {/* Options: Re-render item content as input form (and replace edit
                button with submit?) 
                Or prompt user input and replace */}
            <td><button id={"delete_" + item_id} onClick={handleDelete}><i class="fa-solid fa-pencil"></i> Edit</button></td>
            <td><button id={"edit_" + item_id} onClick={handleEdit}><i class="fa fa-trash"></i> Delete</button></td>
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
                { item_id: id_counter, content: formJson.itemContent, isChecked: false }
            ]
        )
        console.log(items)
        id_counter += 1

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
                <Item item_id={item.item_id} content={item.content} isChecked={item.isChecked}/>
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