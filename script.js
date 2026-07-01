// ===============================
// AI Study Planner
// script.js
// ===============================

// Array to store all tasks
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

// Display tasks when page loads
window.onload = function () {
    displayTasks();
    updateProgress();
};

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {

    const subject = document.getElementById("subject").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const hours = document.getElementById("hours").value;
    const priority = document.getElementById("priority").value;

    if (subject === "" || topic === "" || hours === "") {
        alert("Please fill all fields.");
        return;
    }

    const task = {
        id: Date.now(),
        subject,
        topic,
        hours,
        priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    updateProgress();

    clearInputs();
}

// Display all tasks
function displayTasks() {

    const container = document.getElementById("taskContainer");

    container.innerHTML = "";

    if (tasks.length === 0) {

        container.innerHTML = "<p>No study tasks added yet.</p>";

        return;
    }

    tasks.forEach((task, index) => {

        const priorityClass =
            task.priority.toLowerCase();

        container.innerHTML += `

        <div class="task-card">

        <h3>${task.subject}</h3>

        <p><strong>Topic:</strong> ${task.topic}</p>

        <p><strong>Hours:</strong> ${task.hours}</p>

        <p>
        <strong>Priority:</strong>

        <span class="${priorityClass}">
        ${task.priority}
        </span>

        </p>

        <p>

        <strong>Status:</strong>

        ${task.completed ?
                "✅ Completed" :
                "📖 Pending"}

        </p>

        <div class="task-buttons">

        <button
        class="complete-btn"
        onclick="toggleComplete(${index})">

        ${task.completed ?
                "Undo" :
                "Complete"}

        </button>

        <button
        onclick="editTask(${index})">

        Edit

        </button>

        <button
        class="delete-btn"
        onclick="deleteTask(${index})">

        Delete

        </button>

        </div>

        </div>

        `;

    });

}

// Delete task
function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

        updateProgress();

    }

}

// Edit task
function editTask(index) {

    const task = tasks[index];

    document.getElementById("subject").value = task.subject;

    document.getElementById("topic").value = task.topic;

    document.getElementById("hours").value = task.hours;

    document.getElementById("priority").value = task.priority;

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

    updateProgress();

}

// Mark Complete
function toggleComplete(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();

    updateProgress();

}

// Update Progress Bar
function updateProgress() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    let percentage = 0;

    if (total > 0) {

        percentage =
            Math.round((completed / total) * 100);

    }

    document.getElementById("progressBar").value =
        percentage;

    document.getElementById("progressText").innerHTML =
        percentage + "% Completed";

}

// Clear Inputs
function clearInputs() {

    document.getElementById("subject").value = "";

    document.getElementById("topic").value = "";

    document.getElementById("hours").value = "";

    document.getElementById("priority").selectedIndex = 0;

}


