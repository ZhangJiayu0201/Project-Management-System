# Iteration 1 Reflection Report

## Project Management System

## 1. SRP and DRY Check

### SRP Check


| Part              | Main Job                  | Result      |
| ----------------- | ------------------------- | ----------- |
| Task object       | Stores task information   | Good        |
| loadTasks()       | Loads tasks               | Good        |
| saveTasks()       | Saves tasks               | Good        |
| renderTasks()     | Shows tasks on the page   | Good        |
| showMyTasks()     | Shows only assigned tasks | Good        |
| form submit event | Adds a new task           | Mostly good |


One small problem is the form submit event does several things. It reads input, creates a task, saves it, and updates the page. In the next iteration, I will fix it.

### DRY Check


| Area                | Result            | Finding                                              |
| ------------------- | ----------------- | ---------------------------------------------------- |
| Task display        | Good              | `renderTasks()` is reused.                           |
| Save and load tasks | Good              | `loadTasks()` and `saveTasks()` avoid repeated code. |
| User role names     | Needs improvement | Role names are repeated.                             |
| Status names        | Needs improvement | Status text is repeated.                             |

In the next iteration, I will try to reduce repeated role names and status names.

---

## 2. Task and User Story Status

I used three labels:

* todo
* in-progress
* done

| ID  | User Story             | Estimate | Status      |
| --- | ---------------------- | -------: | ----------- |
| US1 | View My Assigned Tasks |   5 days | done        |
| US2 | Assign Team Tasks      |   5 days | in-progress |
| US3 | Add New Tasks          |   3 days | done        |
| US4 | Edit Task Information  |   3 days | todo        |
| US5 | Track Project Progress |   4 days | done        |
| US6 | Identify Delayed Tasks |   4 days | done        |
| US7 | Remove Completed Tasks |   2 days | todo        |
| US8 | Share Task Updates     |   3 days | todo        |

---

## 4. Completed User Stories

### US1: View My Assigned Tasks

This user story is completed.
The user can select a current user and view assigned tasks.

Completed tasks:

* Created sample task data
* Showed tasks in a table
* Added user filter
* Added Show My Tasks button
* Added Show All Tasks button

### US3: Add New Tasks

This user story is completed.
The user can add a new task with title, description, and deadline.

Completed tasks:

* Created Add New Task form
* Added title input
* Added description input
* Added deadline input
* Saved task data in browser storage
* Updated the task table

---

## 5. Unfinished User Stories

### US2: Assign Team Tasks

This user story is in-progress.
It was planned for Iteration 1, but it was not fully finished.

The next step is to create a simple task assignment function.

### Todo User Stories

These user stories are still todo:

* US4: Edit Task Information
* US5: Track Project Progress
* US6: Identify Delayed Tasks
* US7: Remove Completed Tasks
* US8: Share Task Updates

---

## 6. GitHub Pages Update

I prepared GitHub Pages content for the completed user stories.

| Page                   | Purpose                         |
| ---------------------- | ------------------------------- |
| Completed stories page | Shows completed user stories    |
| US1 page               | Explains View My Assigned Tasks |
| US3 page               | Explains Add New Tasks          |

This helps show what was completed in Iteration 1.

---

## 7. Actual Velocity

Actual velocity only counts completed user stories.

| Completed User Story        | Estimate |
| --------------------------- | -------: |
| US1: View My Assigned Tasks |   5 days |
| US3: Add New Tasks          |   3 days |

```text
Actual velocity = 5 days + 3 days = 8 days
```

So, the actual velocity of Iteration 1 is:

```text
8 days
```

Planned work for Iteration 1:

| User Story                  | Estimate |
| --------------------------- | -------: |
| US1: View My Assigned Tasks |   5 days |
| US2: Assign Team Tasks      |   5 days |
| US3: Add New Tasks          |   3 days |

```text
Planned work = 13 days
Completed work = 8 days
Completion rate = 8 / 13 = 61.5%
```

---

## 8. Personal Reflection

In this iteration, I learned that user stories need to be split into smaller tasks. At first, the stories looked simple, but after starting the work, I found each story had many small steps.

I also learned that only completed user stories should be counted in velocity. In-progress work should not be counted.

The code is still simple, but it is easy for me to understand. I think this is good for the first iteration. In the next iteration, I want to improve the code structure and finish Assign Team Tasks.

Overall, Iteration 1 was partly successful. I completed two useful user stories and created a working base for the next iteration.
::: 
