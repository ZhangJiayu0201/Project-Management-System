var SUPABASE_URL =
  "https://uxtheqahyfbkqxudhmnl.supabase.co";

var SUPABASE_KEY =
  "sb_publishable_VnyaE6FwxRh2cbnkYUI3zA_wcHVQa4a";

var db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

var tasks = [];
var currentUser = null;



// Login


async function login() {
  var email =
    document.getElementById("loginName").value;

  var password =
    document.getElementById("loginPass").value;

  var result =
    await db.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (result.error) {
    document.getElementById(
      "loginMsg"
    ).innerHTML =
      "Login failed";

    return;
  }

  window.location.href =
    "app.html";
}



// Register


async function registerUser() {
  var email =
    document.getElementById("regName").value;

  var password =
    document.getElementById("regPass").value;

  var role =
    document.getElementById("regRole").value;

  if (
    email === "" ||
    password === ""
  ) {
    document.getElementById(
      "regMsg"
    ).innerHTML =
      "Please enter email and password";

    return;
  }

  var result =
    await db.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: role
        }
      }
    });

  if (result.error) {
    document.getElementById(
      "regMsg"
    ).innerHTML =
      result.error.message;

    return;
  }

  document.getElementById(
    "regMsg"
  ).innerHTML =
    "Register success";
}



// Logout


async function logout() {
  await db.auth.signOut();

  window.location.href =
    "index.html";
}


// Check Sign In Page


async function checkSignInPage() {
  if (
    !document.getElementById(
      "loginName"
    )
  ) {
    return;
  }

  var result =
    await db.auth.getSession();

  if (result.data.session) {
    window.location.href =
      "app.html";
  }
}



// Check App Page


async function checkAppPage() {
  if (
    !document.getElementById(
      "taskBody"
    )
  ) {
    return false;
  }

  var result =
    await db.auth.getUser();

  if (
    result.error ||
    !result.data.user
  ) {
    window.location.href =
      "index.html";

    return false;
  }

  currentUser =
    result.data.user;

  document.getElementById(
    "currentUserText"
  ).innerHTML =
    "Current user: " +
    currentUser.email;

  return true;
}


// Load Tasks From SQL Database


async function loadTasks() {
  var result =
    await db
      .from("tasks")
      .select("*")
      .order(
        "task_id",
        {
          ascending: true
        }
      );

  if (result.error) {
    setMsg(
      result.error.message
    );

    return;
  }

  var updateResult =
    await db
      .from("task_updates")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false
        }
      );

  var updates = {};

  if (!updateResult.error) {
    for (
      var i = 0;
      i < updateResult.data.length;
      i++
    ) {
      var item =
        updateResult.data[i];

      if (
        !updates[item.task_id]
      ) {
        updates[item.task_id] =
          item.update_text;
      }
    }
  }

  tasks = [];

  for (
    var j = 0;
    j < result.data.length;
    j++
  ) {
    var task =
      result.data[j];

    tasks.push({
      id:
        task.task_id,

      title:
        task.title,

      member:
        task.assigned_member,

      done:
        task.status === "Done",

      deadline:
        task.deadline,

      update:
        updates[
          task.task_id
        ] || ""
    });
  }

  showTasks();
}



// Safe Text


function safeText(text) {
  if (
    text === null ||
    text === undefined
  ) {
    return "";
  }

  return String(text)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    );
}



// Show Tasks


function showTasks() {
  var body =
    document.getElementById(
      "taskBody"
    );

  if (!body) {
    return;
  }

  var filter =
    document.getElementById(
      "filterMember"
    ).value;

  body.innerHTML = "";

  for (
    var i = 0;
    i < tasks.length;
    i++
  ) {
    if (
      filter === "All" ||
      tasks[i].member === filter
    ) {
      var row =
        document.createElement(
          "tr"
        );

      row.innerHTML =
        "<td>" +
        tasks[i].id +
        "</td>" +

        "<td>" +
        "<input id='title" +
        tasks[i].id +
        "' value='" +
        safeText(
          tasks[i].title
        ) +
        "'>" +
        "</td>" +

        "<td>" +
        "<select id='member" +
        tasks[i].id +
        "'>" +

        "<option>Student</option>" +
        "<option>Manager</option>" +
        "<option>Worker</option>" +

        "</select>" +
        "</td>" +

        "<td>" +
        "<select id='done" +
        tasks[i].id +
        "'>" +

        "<option value='false'>" +
        "Not Done" +
        "</option>" +

        "<option value='true'>" +
        "Done" +
        "</option>" +

        "</select>" +
        "</td>" +

        "<td>" +
        safeText(
          tasks[i].deadline
        ) +
        "</td>" +

        "<td>" +
        "<input id='update" +
        tasks[i].id +
        "' value='" +
        safeText(
          tasks[i].update
        ) +
        "'>" +
        "</td>" +

        "<td>" +
        "<button onclick='editTask(" +
        tasks[i].id +
        ")'>" +
        "Save" +
        "</button>" +
        "</td>";

      body.appendChild(row);

      document.getElementById(
        "member" +
        tasks[i].id
      ).value =
        tasks[i].member;

      document.getElementById(
        "done" +
        tasks[i].id
      ).value =
        tasks[i].done
          ? "true"
          : "false";
    }
  }
}



// Add Task


async function addTask() {
  var title =
    document.getElementById(
      "newTitle"
    ).value.trim();

  var member =
    document.getElementById(
      "newMember"
    ).value;

  var deadline =
    document.getElementById(
      "newDeadline"
    ).value;

  if (
    title === "" ||
    deadline === ""
  ) {
    setMsg(
      "Please enter task title and deadline"
    );

    return;
  }

  var userResult =
    await db.auth.getUser();

  if (
    !userResult.data.user
  ) {
    window.location.href =
      "index.html";

    return;
  }

  var result =
    await db
      .from("tasks")
      .insert({
        owner_id:
          userResult
            .data
            .user
            .id,

        title:
          title,

        assigned_member:
          member,

        status:
          "Not Done",

        deadline:
          deadline
      });

  if (result.error) {
    setMsg(
      result.error.message
    );

    return;
  }

  setMsg(
    "Task added"
  );

  document.getElementById(
    "newTitle"
  ).value = "";

  document.getElementById(
    "newDeadline"
  ).value = "";

  await loadTasks();
}


// Edit Task


async function editTask(id) {
  var title =
    document.getElementById(
      "title" + id
    ).value.trim();

  var member =
    document.getElementById(
      "member" + id
    ).value;

  var done =
    document.getElementById(
      "done" + id
    ).value;

  var update =
    document.getElementById(
      "update" + id
    ).value.trim();

  var status =
    done === "true"
      ? "Done"
      : "Not Done";


  // Find the old update text
  var oldUpdate = "";

  for (
    var i = 0;
    i < tasks.length;
    i++
  ) {
    if (
      tasks[i].id === id
    ) {
      oldUpdate =
        String(
          tasks[i].update || ""
        ).trim();

      break;
    }
  }


  // Update basic task information
  var result =
    await db
      .from("tasks")
      .update({
        title:
          title,

        assigned_member:
          member,

        status:
          status
      })
      .eq(
        "task_id",
        id
      );

  if (result.error) {
    setMsg(
      result.error.message
    );

    return;
  }



  if (
    update !== "" &&
    update !== oldUpdate
  ) {
    var userResult =
      await db.auth.getUser();

    if (
      !userResult.data.user
    ) {
      window.location.href =
        "index.html";

      return;
    }

    var updateResult =
      await db
        .from(
          "task_updates"
        )
        .insert({
          task_id:
            id,

          owner_id:
            userResult
              .data
              .user
              .id,

          update_text:
            update
        });

    if (
      updateResult.error
    ) {
      setMsg(
        updateResult
          .error
          .message
      );

      return;
    }
  }

  setMsg(
    "Task saved"
  );

  await loadTasks();
}



// Progress


function showProgress() {
  var done = 0;

  for (
    var i = 0;
    i < tasks.length;
    i++
  ) {
    if (
      tasks[i].done
    ) {
      done++;
    }
  }

  setMsg(
    "Progress: " +
    done +
    " / " +
    tasks.length +
    " tasks done"
  );
}



// Delayed Tasks


function showDelayed() {
  var today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );

  var delayed = [];

  for (
    var i = 0;
    i < tasks.length;
    i++
  ) {
    if (
      !tasks[i].done &&
      tasks[i].deadline <
        today
    ) {
      delayed.push(
        tasks[i].title
      );
    }
  }

  if (
    delayed.length === 0
  ) {
    setMsg(
      "No delayed task"
    );
  } else {
    setMsg(
      "Delayed: " +
      delayed.join(", ")
    );
  }
}



// Remove Completed Tasks


async function removeCompleted() {
  var result =
    await db
      .from("tasks")
      .delete()
      .eq(
        "status",
        "Done"
      );

  if (result.error) {
    setMsg(
      result.error.message
    );

    return;
  }

  setMsg(
    "Completed tasks removed"
  );

  await loadTasks();
}



// Message


function setMsg(text) {
  var box =
    document.getElementById(
      "appMsg"
    );

  if (box) {
    box.innerHTML =
      safeText(text);
  }
}


// Automated Tests


async function runTests() {
  var resultBox =
    document.getElementById(
      "testResult"
    );

  if (!resultBox) {
    return;
  }

  resultBox.innerHTML = "";

  var passed = 0;
  var failed = 0;

  var testTaskId = null;

  function check(name, ok) {
    if (ok) {
      passed++;

      resultBox.innerHTML +=
        "<div class='pass'>" +
        "PASS: " +
        safeText(name) +
        "</div>";
    } else {
      failed++;

      resultBox.innerHTML +=
        "<div class='fail'>" +
        "FAIL: " +
        safeText(name) +
        "</div>";
    }
  }

  function showSummary() {
    resultBox.innerHTML +=
      "<h3>Summary</h3>";

    resultBox.innerHTML +=
      "<p>Passed: " +
      passed +
      "</p>";

    resultBox.innerHTML +=
      "<p>Failed: " +
      failed +
      "</p>";
  }



  // Test 1
  // Database connection


  var connectionResult =
    await db
      .from("tasks")
      .select("task_id")
      .limit(1);

  check(
    "Database connection",
    !connectionResult.error
  );



  // Test 2
  // US9 - Login
 

  var userResult =
    await db.auth.getUser();

  var user =
    userResult.data.user;

  check(
    "US9 signed in user",
    !!user
  );

  if (!user) {
    resultBox.innerHTML +=
      "<p>Please sign in before running the tests.</p>";

    showSummary();

    return;
  }



  // Test 3
  // US1 - View tasks


  var viewResult =
    await db
      .from("tasks")
      .select("*");

  check(
    "US1 view assigned tasks",
    !viewResult.error
  );



  // Test 4
  // User data protection


  var securityResult =
    await db
      .from("tasks")
      .select("owner_id")
      .neq(
        "owner_id",
        user.id
      );

  check(
    "User data protection",
    !securityResult.error &&
    securityResult.data.length === 0
  );



  // Test 5
  // US3 - Add task


  var testTitle =
    "Automatic Test Task " +
    Date.now();

  var addResult =
    await db
      .from("tasks")
      .insert({
        owner_id:
          user.id,

        title:
          testTitle,

        assigned_member:
          "Student",

        status:
          "Not Done",

        deadline:
          "2000-01-01"
      })
      .select()
      .single();

  check(
    "US3 add new task",
    !addResult.error &&
    !!addResult.data
  );

  if (
    addResult.error ||
    !addResult.data
  ) {
    showSummary();

    return;
  }

  testTaskId =
    addResult.data.task_id;



  // Test 6
  // US2 - Assign task


  var assignResult =
    await db
      .from("tasks")
      .update({
        assigned_member:
          "Manager"
      })
      .eq(
        "task_id",
        testTaskId
      )
      .select()
      .single();

  check(
    "US2 assign team task",
    !assignResult.error &&
    assignResult.data
      .assigned_member ===
      "Manager"
  );


 
  // Test 7
  // US4 - Edit task


  var editResult =
    await db
      .from("tasks")
      .update({
        title:
          "Edited Test Task"
      })
      .eq(
        "task_id",
        testTaskId
      )
      .select()
      .single();

  check(
    "US4 edit task information",
    !editResult.error &&
    editResult.data.title ===
      "Edited Test Task"
  );



  // Test 8
  // US5 - Track progress


  var progressResult =
    await db
      .from("tasks")
      .select(
        "task_id, status"
      );

  var progressFound =
    false;

  if (!progressResult.error) {
    for (
      var i = 0;
      i <
      progressResult.data.length;
      i++
    ) {
      if (
        progressResult
          .data[i]
          .task_id ===
        testTaskId
      ) {
        progressFound =
          true;
      }
    }
  }

  check(
    "US5 track project progress",
    !progressResult.error &&
    progressFound
  );



  // Test 9
  // US6 - Delayed task


  var delayedResult =
    await db
      .from("tasks")
      .select(
        "task_id, deadline"
      )
      .eq(
        "task_id",
        testTaskId
      )
      .neq(
        "status",
        "Done"
      )
      .lt(
        "deadline",
        new Date()
          .toISOString()
          .slice(
            0,
            10
          )
      );

  check(
    "US6 identify delayed task",
    !delayedResult.error &&
    delayedResult.data.length ===
      1
  );



  // Test 10
  // US8 - Save task update


  var updateResult =
    await db
      .from(
        "task_updates"
      )
      .insert({
        task_id:
          testTaskId,

        owner_id:
          user.id,

        update_text:
          "Automatic test update"
      })
      .select()
      .single();

  check(
    "US8 save task update",
    !updateResult.error &&
    !!updateResult.data
  );



  // Test 11
  // US8 - Read latest update


  var readUpdateResult =
    await db
      .from(
        "task_updates"
      )
      .select(
        "update_text"
      )
      .eq(
        "task_id",
        testTaskId
      )
      .order(
        "created_at",
        {
          ascending:
            false
        }
      )
      .limit(1)
      .single();

  check(
    "US8 show latest update",
    !readUpdateResult.error &&
    readUpdateResult
      .data
      .update_text ===
      "Automatic test update"
  );



  // Test 12
  // US4 - Change status to Done


  var doneResult =
    await db
      .from("tasks")
      .update({
        status:
          "Done"
      })
      .eq(
        "task_id",
        testTaskId
      )
      .select()
      .single();

  check(
    "US4 save Done status",
    !doneResult.error &&
    doneResult
      .data
      .status ===
      "Done"
  );



  // Test 13
  // US7 - Remove completed


  var deleteResult =
    await db
      .from("tasks")
      .delete()
      .eq(
        "task_id",
        testTaskId
      )
      .eq(
        "status",
        "Done"
      )
      .select();

  check(
    "US7 remove completed task",
    !deleteResult.error &&
    deleteResult.data.length ===
      1
  );


  // Task has already been removed
  testTaskId = null;



  // Test 14
  // Confirm cleanup


  var cleanupResult =
    await db
      .from("tasks")
      .select("task_id")
      .eq(
        "title",
        "Edited Test Task"
      );

  check(
    "Test data cleanup",
    !cleanupResult.error &&
    cleanupResult.data.length ===
      0
  );


  showSummary();
}


// Start Page


async function startPage() {
  await checkSignInPage();

  if (
    document.getElementById(
      "taskBody"
    )
  ) {
    var ok =
      await checkAppPage();

    if (ok) {
      await loadTasks();
    }
  }
}


window.addEventListener(
  "load",
  startPage
);