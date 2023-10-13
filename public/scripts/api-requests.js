const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const deleteForm = document.getElementById("deleteForm");

// Adds content of GET request to page
async function onGet() {
    const response = await fetch('/api'); // Defaults to GET request
    const checklist = await response.json();

    // This feels wrong... but whatever. Reset field.
    document.getElementById("data").textContent = "";

    // Generate header
    const dataHeader = document.createElement('h2');
    dataHeader.textContent = "To-Do List:"
    document.getElementById('data').append(dataHeader);

    // Generate to-do list
    for (task of checklist) {
        // Each item in the list contains text content, id and completion flag
        const { content, complete, id } = task;

        const line = document.createElement('div');
        line.id = "line" + id;

        // This is gross but works for now
        // I think ideally for editing purposes
        // Would want elements in separate divs
        // Then stylize... could also eventually
        // Try and create a React component for this
        line.textContent = "" + (id) + " | " + content + " | " +
        (
            complete ? "completed" : "not completed"
        );

        document.getElementById("data").append(line);
    }

    
}

async function onPost(e) {
    e.preventDefault();
    const content = document.getElementById("newTask").value;
    console.log(content);

    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ content })
    }

    const response = await fetch('/api', options);
    const result = response.json();

    console.log(result);

    onGet();
}

async function onPut(e) {
    e.preventDefault();

    const id = Number(document.getElementById("updateSelector").value);
    const newContent = (document.getElementById("newContent").value);
    // If this works...
    // Update: It doesn't. HTML doesn't have a method of doing this...
    // There was a suggestion to include a hidden element to keep track of state...
    // React could almost certainly optimize here in that case.
    // Could just use a radio option. But that's boring.
    const complete = (document.getElementById("completed?").value ? true : false);

    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ newContent, complete, id })
    }

    const response = await fetch('/api', options);
    const result = response.json();

    console.log(result);

    // For now, to refresh the to-do list on page, I'm just going to
    // Call another GET request. would rather want to update the
    // HTML here, but since I'm using an atrocious approach to that
    // I have to do this instead!
    onGet();
}

async function onDelete(e) {
    e.preventDefault();

    id = Number(document.getElementById("deleteSelector").value);

    const options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ id })
    }

    const response = await fetch('/api', options);
    const result = response.json();

    console.log(result);

    onGet();
}

createForm.addEventListener("submit", onPost);
updateForm.addEventListener("submit", onPut);
deleteForm.addEventListener("submit", onDelete);