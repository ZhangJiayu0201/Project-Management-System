const STORAGE_KEY = "iteration1Tasks";

const defaultTasks = [
  {
    title: "Create project task list",
    description: "Prepare the first task list for the project.",
    assignedTo: "Student Team Member",
    status: "In Progress",
    deadline: "2026-06-12"
  },
  {
    title: "Assign team responsibilities",
    description: "Decide who is responsible for each project task.",
    assignedTo: "Project Manager",
    status: "Not Started",
    deadline: "2026-06-13"
  },
  {
    title: "Share task progress update",
    description: "Share a short update with the team.",
    assignedTo: "Workplace Team Member",
    status: "Not Started",
    deadline: "2026-06-14"
  }
];

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  }
  return JSON.parse(saved);
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks(tasks) {
  const tableBody = document.getElementById("taskTableBody");
  tableBody.innerHTML = "";

  if (tasks.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">No tasks found.</td>`;
    tableBody.appendChild(row);
    return;
  }

  tasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.assignedTo}</td>
      <td class="status">${task.status}</td>
      <td>${task.deadline}</td>
    `;
    tableBody.appendChild(row);
  });
}

function showAllTasks() {
  renderTasks(loadTasks());
}

function showMyTasks() {
  const user = document.getElementById("currentUser").value;
  const tasks = loadTasks().filter(task => task.assignedTo === user);
  renderTasks(tasks);
}

document.getElementById("taskForm").addEventListener("submit", event => {
  event.preventDefault();

  const currentUser = document.getElementById("currentUser").value;
  const task = {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDescription").value.trim(),
    assignedTo: currentUser,
    status: "Not Started",
    deadline: document.getElementById("taskDeadline").value
  };

  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
  event.target.reset();
  renderTasks(tasks);
});

document.getElementById("filterBtn").addEventListener("click", showMyTasks);
document.getElementById("showAllBtn").addEventListener("click", showAllTasks);

showAllTasks();
