const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");

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
        line.textContent = "" + (id + 1) + " | " + content + " | " +
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
}

async function onPut(e) {
    e.preventDefault();

    // decrement index by 1 because UI is 1 extra (I know I know. But
    // people don't like looking at 0-indexed arrays okay?)
    const index = document.getElementById("indexSelector").value - 1;
    const newContent = document.getElementById("newContent").value;
    // If this works...
    // Update: It doesn't. HTML doesn't have a method of doing this...
    // There was a suggestion to include a hidden element to keep track of state...
    // React could almost certainly optimize here in that case.
    const complete = (document.getElementById("completed?").value ? true : false);

    const options = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ newContent, complete, index })
    }

    const response = await fetch('/api', options);
    const result = response.json();

    console.log(result);

    // For now, to re-update the to-do list, I'm just going to
    // Call another GET request. would rather want to update the
    // HTML here, but since I'm using a atrocious approach to that
    // I have to do this instead!
    onGet();
}

createForm.addEventListener("submit", onPost);
updateForm.addEventListener("submit", onPut);