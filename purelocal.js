newItemForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(newItemForm);
    for (const [name,value] of data) {
      console.log(name, ":", value);
      checklist.push(new Item(value));
    }
    updateHTML();
});

let checklist = [];

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

function updateHTML() {
    checklistTable.innerHTML = "<tr><td>Item</td><td>Completed?</td></tr>"
    let i = 0;
    for (const item of checklist) {
        checklistTable.innerHTML += "<tr><td>" + item.content + '</td><td><input type="checkbox" id="completion' + i + 
        '" /></td><td><button id="edit' + i + '" onclick="updateElement(this);" /><i class="fa-solid fa-pencil"></i> Edit</button></td>' + 
        '<td><button id="delete' + i + '" onclick="deleteElement(this);" /><i class="fa fa-trash"></i> Delete</button></td></tr>';
        i++;
    }
}

function deleteElement(ele) {
    console.log(ele.id[6]);
    let id = parseInt(ele.id[6]); // This will not work for 10 or more elements
    console.log("Deleting element", id);
    checklist.splice(id, 1); // Remove element from array
    updateHTML();
}

function updateElement(ele) {
    let id = parseInt(ele.id[4]); // This will not work for 10 or more elements; consider splicing
    
    updateHTML();
}

  // Adding the HTML
  /*
checklist.innerHTML += "<tr><td>" + value + '</td><td><input type="checkbox" id="' + value + 
      '"/></td><td><button><i class="fa-solid fa-pencil"></i> Edit</button></td>' + 
      '<td><button><i class="fa fa-trash"></i> Delete</button></td></tr>';
  */