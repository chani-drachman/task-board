// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test


// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")

const form = document.querySelector("#task-form")
const list = document.querySelector("#task-list")
const errorP = document.querySelector("#error")
const left=document.querySelector("#left")
let counter=0;
const emptyMsg=document.querySelector("#empty")

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let level = document.querySelector("#priority-select").value;
    let inputTask = document.querySelector("#task-input").value.trim();

    if (inputTask === "") {
        errorP.hidden = false;
        errorP.textContent = "Please type a task";
        return;
    }
    

    const newTask = document.createElement("li");
    newTask.classList.add(`priority-${level}`);

    counter++;
    left.textContent=counter
      if(counter!==0){
        emptyMsg.hidden=true
    }

    const taskText = document.createElement("span");
    taskText.classList.add("text");
    taskText.textContent = inputTask;

    const deleteX = document.createElement("span");
    deleteX.textContent = "X";
    deleteX.style.color = "red";
    deleteX.classList.add("delete-btn");

    newTask.appendChild(taskText);
    newTask.appendChild(deleteX);
    list.appendChild(newTask);

    errorP.hidden = true;
    document.querySelector("#task-input").value = "";
 
});
 

list.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove(); 
        counter--;
        left.textContent=counter
          if(counter===0){
        emptyMsg.hidden=false;
    }

    } else if (event.target.classList.contains("text")) {
        event.target.parentElement.classList.toggle("done");
    }
});


const filters=document.querySelector("#filters")

filters.addEventListener("click", function(event){
    if(event.target.tagName!=="BUTTON"){
        return;
    }
    const filter=event.target.dataset.filter;
    const tasks=document.querySelectorAll("li")
console.log(filter)
console.log(tasks)

    tasks.forEach(li => {
        if(filter==="all"){
            li.hidden=false;
        }
        else if(filter==="done"){
                li.hidden=!li.classList.contains("done");
        }
        else{
                li.hidden=li.classList.contains("done");

        }
    });
    
})

const clearBtn=document.querySelector("#clear-done")

clearBtn.addEventListener("click", function(){
    const tasks=document.querySelectorAll("li")
     tasks.forEach(task => {
        if (task.classList.contains("done")) {
            task.remove();
        }
    });

})
