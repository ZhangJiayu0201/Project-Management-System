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
| US2 | Assign Team Tasks      |   5 days | done        |
| US3 | Add New Tasks          |   3 days | done        |
| US4 | Edit Task Information  |   3 days | in-progress |
| US5 | Track Project Progress |   4 days | done        |
| US6 | Identify Delayed Tasks |   4 days | done        |
| US7 | Remove Completed Tasks |   2 days | todo        |
| US8 | Share Task Updates     |   3 days | todo        |

# 3. Completed vs Unfinished User Stories

## Completed User Stories

| ID  | User Story             |Estimate|Status|
|---  |------------------------|--------|------|
| US1 | View My Assigned Tasks | 5 days | done |
| US2 | Assign Team Tasks      | 5 days | done |
| US3 | Add New Tasks          | 3 days | done |
| US5 | Track Project Progress | 4 days | done |
| US6 | Identify Delayed Tasks | 4 days | done |

## Unfinished User Stories

| ID  | User Story             |Estimate| Status      |
|-----|------------------------|--------|-------------|
| US4 | Edit Task Information  | 3 days | in-progress |
| US7 | Remove Completed Tasks | 2 days | todo        |
| US8 | Share Task Updates     | 3 days | todo        |

