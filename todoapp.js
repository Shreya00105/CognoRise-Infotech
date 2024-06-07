document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    
    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            renderTask(task);
        });
    }

    function addTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTask(task);
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.textContent = task;
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("editBtn");
        editBtn.addEventListener("click", () => editTask(li, task));
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => deleteTask(li, task));
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function editTask(li, oldTask) {
        const newTask = prompt("Edit task:", oldTask);
        if (newTask !== null && newTask.trim() !== "") {
            li.firstChild.textContent = newTask;
            updateTask(oldTask, newTask);
        }
    }

    function updateTask(oldTask, newTask) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(oldTask);
        if (taskIndex > -1) {
            tasks[taskIndex] = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    function deleteTask(li, task) {
        taskList.removeChild(li);
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
