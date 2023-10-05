/*
A user must be able to create new checklist items.
    The UI must have a method for the user to add a new item.
    The backend must accept a request from the UI to save the new item.
A user must be able to read existing checklist items.
    Existing checklist items must be presented to the user when the page is loaded.
    This includes any new items that had been added beyond the initial state.
    The backend must accept a request from the UI to retrieve all checklist items and their state.
A user must be able to update existing checklist items.
    Checklist items must be able to be marked complete in the UI.
    The text of a checklist item must be able to be modified.
    ‘a’ and ‘b’ above can be either a single request or two separate requests.
A user must be able to delete existing checklist items.
    The UI must have a method for the user to delete an existing checklist item.
    The backend must accept a request from the UI to delete a checklist item.
*/
// requires
//import fs from "fs";

// TODO Click functionality?
// Initialize array of checklist items by loading file
// TODO How to make this independent for each user?
// Also note doesn't come in as Item object... but is that really even necessary?
// Obviously could just convert them all, potentially a better way but idk it
import data from './checklist.json'
console.log(data);
let checklist = data;
for (let i = 0; i < checklist.length; i++) {
    checklist[i] = new Item(checklist[i].content);
}

// TODO could conceivably try to give good ids and update appropriately to optimize... but this works for now
function displayChecklist() {
    document.getElementById("checklist").innerHTML = "<h2>To-Do:</h2><table><tr><td>Item</td><td>Completed?</td></tr>";
    for(let i = 0; i < checklist.length; i++) {
        document.getElementById("checklist").innerHTML += "<tr><td>" + checklist[i].content + "</td><td>"; 
        if (checklist[i].isComplete) {
            document.getElementById("checklist").innerHTML += "Y</td></tr>"
        } else {
            document.getElementById("checklist").innerHTML += "N</td></tr>"
        }
    }
}

// Constructor for checklist items
function Item(content) {
    this.content = content;
    this.isComplete = false;
    // Probably a useless function
    this.checkOff = function() {
        this.isComplete = true;
    }
    this.checkOn = function() { // Split into two functions because boolean? or set.
        this.isComplete = false;
    }
    this.setContent = function(newContent) {
        this.content = newContent;
    }
}

// TODO add error handling
function addItem(content, loc) {
    // Basic err catch
    if (loc > checklist.length)
        loc = checklist.length;
    checklist[loc] = new Item(content);
}

// Save to JSON file on system... can probably somewhat optimize this in the sense of
// not having it be run every time something updates? but for now it works
/*
function save() {
    fs.writeFile('checklist.json', JSON.stringify(checklist), (error) => {
        if (error) throw error;
    });
}
*/


addItem("Check this off!", 0);
addItem("Don't check this off yet!", 1);
checklist[0].checkOff();
console.log(checklist);

//save();