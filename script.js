// Mock data for demonstration
const tasks = [
  {
    id: 1,
    title: "Create a react project",
    time: "5:23 AM, 01/06/2022",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React",
    time: "5:22 AM, 01/06/2022",
    completed: false,
  },
  {
    id: 3,
    title: "Create a Todo App",
    time: "5:21 AM, 01/06/2022",
    completed: true,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const taskContainer = document.getElementById("taskContainer");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const filterTasks = document.getElementById("filterTasks");
  const newTaskInput = document.getElementById("newTaskInput");

  // Function to display tasks
  function displayTasks(filter = "all") {
    // taskContainer.innerHTML = "";
    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

    filteredTasks.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.className = `task ${task.completed ? "completed" : ""}`;
      taskElement.innerHTML = `
                <div>
                    <input type="checkbox" ${
                      task.completed ? "checked" : ""
                    } data-id="${task.id}">
                    <span>${task.title}</span>
                    <small>${task.time}</small>
                </div>
                <div class="task-controls">
                    <button data-id="${task.id}" class="edit">✎</button>
                    <button data-id="${task.id}" class="delete">✗</button>
                </div>
            `;
      taskContainer.appendChild(taskElement);
    });
  }

  // Initial display of tasks
  displayTasks();

  // Add task button event
  addTaskBtn.addEventListener("click", () => {
    const newTaskTitle = newTaskInput.value.trim();
    if (newTaskTitle) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        time: new Date().toLocaleString(),
        completed: false,
      };
      tasks.push(newTask);
      newTaskInput.value = ""; // Clear input field
      displayTasks(filterTasks.value);
    }
  });

  // Filter tasks event
  filterTasks.addEventListener("change", (e) => {
    displayTasks(e.target.value);
  });

  // Event delegation for task actions
  taskContainer.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    if (e.target.className === "edit") {
      const newTitle = prompt("Edit task:");
      if (newTitle) {
        const task = tasks.find((task) => task.id === id);
        task.title = newTitle;
        displayTasks(filterTasks.value);
      }
    } else if (e.target.className === "delete") {
      const taskIndex = tasks.findIndex((task) => task.id === id);
      tasks.splice(taskIndex, 1);
      displayTasks(filterTasks.value);
    } else if (e.target.type === "checkbox") {
      const task = tasks.find((task) => task.id === id);
      task.completed = e.target.checked;
      displayTasks(filterTasks.value);
    }
  });
});
