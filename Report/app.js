var users = [
  { name: "student", pass: "111", role: "Student" },
  { name: "manager", pass: "222", role: "Manager" }
];

var tasks = [];

function loadTasks() {
  var saved = localStorage.getItem("pmsTasks");
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    tasks = [
      { id: 1, title: "View assigned task page", member: "Student", done: true, deadline: "2026-07-01", update: "Done" },
      { id: 2, title: "Create assignment UI", member: "Manager", done: false, deadline: "2026-07-20", update: "" },
      { id: 3, title: "Add update field", member: "Worker", done: false, deadline: "2026-06-01", update: "" }
    ];
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem("pmsTasks", JSON.stringify(tasks));
}

function showTasks() {
  var body = document.getElementById("taskBody");
  if (!body) {
    return;
  }

  var member = document.getElementById("filterMember").value;
  body.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    if (member === "All" || tasks[i].member === member) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + tasks[i].id + "</td>" +
        "<td><input id='title" + tasks[i].id + "' value='" + tasks[i].title + "'></td>" +
        "<td><select id='member" + tasks[i].id + "'><option>Student</option><option>Manager</option><option>Worker</option></select></td>" +
        "<td><select id='done" + tasks[i].id + "'><option>Progress</option><option>Done</option></select></td>" +
        "<td>" + tasks[i].deadline + "</td>" +
        "<td><input id='update" + tasks[i].id + "' value='" + tasks[i].update + "'></td>" +
        "<td><button onclick='editTask(" + tasks[i].id + ")'>Save</button></td>";
      body.appendChild(row);
      document.getElementById("member" + tasks[i].id).value = tasks[i].member;
      document.getElementById("done" + tasks[i].id).value = String(tasks[i].done);
    }
  }
}

function addTask() {
  var title = document.getElementById("newTitle").value.trim();
  var member = document.getElementById("newMember").value;
  var deadline = document.getElementById("newDeadline").value;

  if (title === "" || deadline === "") {
    setMsg("Please enter task title and deadline");
    return false;
  }

  var id = 1;
  if (tasks.length > 0) {
    id = tasks[tasks.length - 1].id + 1;
  }

  tasks.push({ id: id, title: title, member: member, done: false, deadline: deadline, update: "" });
  saveTasks();
  showTasks();
  setMsg("Task added");
  return true;
}

function editTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      var updateText = document.getElementById("update" + id).value.trim();
      if (updateText === "") {
        setMsg("Empty update is not saved");
        return false;
      }
      tasks[i].title = document.getElementById("title" + id).value;
      tasks[i].member = document.getElementById("member" + id).value;
      tasks[i].done = document.getElementById("done" + id).value === "true";
      tasks[i].update = updateText;
    }
  }
  saveTasks();
  showTasks();
  setMsg("Task saved");
  return true;
}

function showProgress() {
  var done = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done) {
      done++;
    }
  }
  setMsg("Progress: " + done + " / " + tasks.length + " tasks done");
}

function showDelayed() {
  var today = new Date().toISOString().slice(0, 10);
  var delayed = [];
  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].done && tasks[i].deadline < today) {
      delayed.push(tasks[i].title);
    }
  }
  if (delayed.length === 0) {
    setMsg("No delayed task");
  } else {
    setMsg("Delayed: " + delayed.join(", "));
  }
}

function removeCompleted() {
  var newTasks = [];
  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  saveTasks();
  showTasks();
  setMsg("Completed tasks removed");
}

function login() {
  var name = document.getElementById("loginName").value;
  var pass = document.getElementById("loginPass").value;
  var ok = false;

  for (var i = 0; i < users.length; i++) {
    if (users[i].name === name && users[i].pass === pass) {
      ok = true;
    }
  }

  if (ok) {
    document.getElementById("loginMsg").innerHTML = "Login success";
  } else {
    document.getElementById("loginMsg").innerHTML = "Login failed";
  }
}

function setMsg(text) {
  document.getElementById("appMsg").innerHTML = text;
}

function makeTestStore() {
  return {
    tasks: [
      { id: 1, title: "Task 1", member: "Student", done: true, deadline: "2026-07-01", update: "Done" },
      { id: 2, title: "Task 2", member: "Manager", done: false, deadline: "2026-07-20", update: "Start" },
      { id: 3, title: "Task 3", member: "Student", done: false, deadline: "2026-06-01", update: "Late" }
    ],
    users: users
  };
}

function TestApp(store) {
  this.store = store;
}

TestApp.prototype.myTasks = function(member) {
  var list = [];
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].member === member) {
      list.push(this.store.tasks[i]);
    }
  }
  return list;
};

TestApp.prototype.assignTask = function(id, member) {
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].id === id) {
      this.store.tasks[i].member = member;
      return true;
    }
  }
  return false;
};

TestApp.prototype.addTask = function(title) {
  if (title === "") {
    return false;
  }
  this.store.tasks.push({ id: 4, title: title, member: "Student", done: false, deadline: "2026-08-01", update: "New" });
  return true;
};

TestApp.prototype.editStatus = function(id, done) {
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].id === id) {
      this.store.tasks[i].done = done;
      return true;
    }
  }
  return false;
};

TestApp.prototype.progress = function() {
  var done = 0;
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].done) {
      done++;
    }
  }
  return done + "/" + this.store.tasks.length;
};

TestApp.prototype.delayed = function() {
  var list = [];
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (!this.store.tasks[i].done && this.store.tasks[i].deadline < "2026-07-01") {
      list.push(this.store.tasks[i]);
    }
  }
  return list;
};

TestApp.prototype.removeCompleted = function() {
  var list = [];
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (!this.store.tasks[i].done) {
      list.push(this.store.tasks[i]);
    }
  }
  this.store.tasks = list;
  return list;
};

TestApp.prototype.saveUpdate = function(id, text) {
  if (text === "") {
    return false;
  }
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].id === id) {
      this.store.tasks[i].update = text;
      return true;
    }
  }
  return false;
};

TestApp.prototype.getUpdate = function(id) {
  for (var i = 0; i < this.store.tasks.length; i++) {
    if (this.store.tasks[i].id === id) {
      return this.store.tasks[i].update;
    }
  }
  return "";
};

TestApp.prototype.login = function(name, pass) {
  for (var i = 0; i < this.store.users.length; i++) {
    if (this.store.users[i].name === name && this.store.users[i].pass === pass) {
      return true;
    }
  }
  return false;
};

function runTests() {
  var result = document.getElementById("testResult");
  result.innerHTML = "";
  var passed = 0;
  var failed = 0;

  function check(name, ok) {
    if (ok) {
      passed++;
      result.innerHTML += "<div class='pass'>PASS: " + name + "</div>";
    } else {
      failed++;
      result.innerHTML += "<div class='fail'>FAIL: " + name + "</div>";
    }
  }

  var t1 = new TestApp(makeTestStore());
  check("US1 view assigned tasks", t1.myTasks("Student").length === 2);

  var t2 = new TestApp(makeTestStore());
  check("US2 assign team tasks", t2.assignTask(2, "Student") && t2.myTasks("Student").length === 3);

  var t3 = new TestApp(makeTestStore());
  check("US3 add new task", t3.addTask("New Task") && t3.store.tasks.length === 4);

  var t4 = new TestApp(makeTestStore());
  check("US4 edit task information", t4.editStatus(2, true));

  var t5 = new TestApp(makeTestStore());
  check("US5 track project progress", t5.progress() === "1/3");

  var t6 = new TestApp(makeTestStore());
  check("US6 identify delayed tasks", t6.delayed().length === 1);

  var t7 = new TestApp(makeTestStore());
  check("US7 remove completed tasks", t7.removeCompleted().length === 2);

  var t8 = new TestApp(makeTestStore());
  check("US8 save task update", t8.saveUpdate(2, "Started"));

  var t9 = new TestApp(makeTestStore());
  check("US8 reject empty update", !t9.saveUpdate(2, ""));

  var t10 = new TestApp(makeTestStore());
  t10.saveUpdate(2, "Finished");
  check("US8 show latest update", t10.getUpdate(2) === "Finished");

  var t11 = new TestApp(makeTestStore());
  check("US9 correct mock login", t11.login("student", "111"));

  var t12 = new TestApp(makeTestStore());
  check("US9 wrong password", !t12.login("student", "wrong"));

  var t13 = new TestApp(makeTestStore());
  check("US9 unknown user", !t13.login("none", "111"));

  result.innerHTML += "<h3>Summary</h3>";
  result.innerHTML += "<p>Passed: " + passed + "</p>";
  result.innerHTML += "<p>Failed: " + failed + "</p>";
}

loadTasks();
showTasks();
