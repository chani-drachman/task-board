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
const left = document.querySelector("#left")
const emptyMsg = document.querySelector("#empty")

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let level = document.querySelector("#priority-select").value;
    let input = document.querySelector("#task-input");
    let inputTask = input.value.trim();

    if (inputTask === "") {
        errorP.hidden = false;
        errorP.textContent = "Please type a task";
        return;
    }

    const newTask = document.createElement("li");
    newTask.classList.add(`priority-${level}`);

    const taskText = document.createElement("span");
    taskText.classList.add("text");
    taskText.textContent = inputTask;

    const deleteX = document.createElement("button");
    deleteX.textContent = "x";
    deleteX.classList.add("delete");

    newTask.appendChild(taskText);
    newTask.appendChild(deleteX);
    list.appendChild(newTask);

    left.textContent = document.querySelectorAll("#task-list li:not(.done)").length;

    emptyMsg.hidden = true;

    errorP.hidden = true;
    input.value = "";
    input.focus();

    const activeFilter = document.querySelector("#filters button.active").dataset.filter;

    if (activeFilter === "done") {
        newTask.hidden = true;
    }
});


list.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();

        left.textContent = document.querySelectorAll("#task-list li:not(.done)").length;

        if (list.children.length === 0) {
            emptyMsg.hidden = false;
        }

    } else if (event.target.tagName === "LI" || event.target.classList.contains("text")) {

        const task = event.target.closest("li");

        task.classList.toggle("done");

        left.textContent = document.querySelectorAll("#task-list li:not(.done)").length;

        const activeFilter = document.querySelector("#filters button.active").dataset.filter;

        if (activeFilter === "active") {
            task.hidden = task.classList.contains("done");
        }
        else if (activeFilter === "done") {
            task.hidden = !task.classList.contains("done");
        }
    }
});


const filters = document.querySelector("#filters")

filters.addEventListener("click", function(event) {

    if (event.target.tagName !== "BUTTON") {
        return;
    }

    const filter = event.target.dataset.filter;
    const tasks = document.querySelectorAll("#task-list li");

    filters.querySelectorAll("button").forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");

    tasks.forEach(li => {

        if (filter === "all") {
            li.hidden = false;
        }
        else if (filter === "done") {
            li.hidden = !li.classList.contains("done");
        }
        else {
            li.hidden = li.classList.contains("done");
        }
    });
});


const clearBtn = document.querySelector("#clear-done")

clearBtn.addEventListener("click", function() {

    const tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
        if (task.classList.contains("done")) {
            task.remove();
        }
    });

    left.textContent = document.querySelectorAll("#task-list li:not(.done)").length;

    if (list.children.length === 0) {
        emptyMsg.hidden = false;
    }

});


