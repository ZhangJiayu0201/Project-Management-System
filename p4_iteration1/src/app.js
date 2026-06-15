// Simple beginner JavaScript for Practical 4

let tasks = [
    {
        id: 1,
        title: "Prepare project plan",
        assignedTo: "Alex",
        status: "In Progress",
        deadline: "2026-06-20"
    },
    {
        id: 2,
        title: "Create task list page",
        assignedTo: "Bella",
        status: "Done",
        deadline: "2026-06-18"
    },
    {
        id: 3,
        title: "Test task assignment",
        assignedTo: "Chris",
        status: "Todo",
        deadline: "2026-06-22"
    }
];

function loadTaskOptions() {
    let taskSelect = document.getElementById("taskSelect");
    taskSelect.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let option = document.createElement("option");
        option.value = tasks[i].id;
        option.textContent = tasks[i].title;
        taskSelect.appendChild(option);
    }
}

function showTasks() {
    let filter = document.getElementById("memberFilter").value;
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        if (filter === "All" || tasks[i].assignedTo === filter) {
            let div = document.createElement("div");
            div.className = "task";

            div.innerHTML =
                "<strong>" + tasks[i].title + "</strong><br>" +
                "Assigned To: " + tasks[i].assignedTo + "<br>" +
                "Status: " + tasks[i].status + "<br>" +
                "Deadline: " + tasks[i].deadline;

            taskList.appendChild(div);
        }
    }
}

function assignTask() {
    let taskId = Number(document.getElementById("taskSelect").value);
    let member = document.getElementById("memberSelect").value;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            tasks[i].assignedTo = member;
        }
    }

    document.getElementById("message").textContent = "Task assigned successfully.";
    showTasks();
}

loadTaskOptions();
showTasks();
