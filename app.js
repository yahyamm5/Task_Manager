let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function handleTask() {
    const value = taskInput.value.trim();
    if (!value) return alert("Please enter a task!");

    if (editIndex !== null) {
        tasks[editIndex] = value;
        editIndex = null;
        addBtn.innerText = "Add Task";
        addBtn.style.backgroundColor = "#28a745";
    } else {

        tasks.push(value);
    }

    taskInput.value = "";
    saveAndRender();
}


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}


function editTask(index) {
    taskInput.value = tasks[index];
    editIndex = index;
    addBtn.innerText = "Update Task";
    addBtn.style.backgroundColor = "#ffc107";
}


function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Initial Render
renderTasks();