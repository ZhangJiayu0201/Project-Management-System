# Practical 4 Task Breakdown and Estimate Back-Check

This file applies Chapter 4 by splitting user stories into smaller development tasks. Each task has a short description, estimate, and status.

Chapter 4 explains that task estimates give more confidence than broad user story estimates, so each user story estimate is checked again using task totals.

## Summary of User Stories

| ID | User Story | Priority | Original Estimate | Task Total | Status | Back-Check |
|---|---|---:|---:|---:|---|---|
| US1 | View My Assigned Tasks | 10 | 5 days | 5 days | Done | Matches |
| US2 | Assign Team Tasks | 10 | 5 days | 5 days | Todo | Matches |
| US3 | Add New Tasks | 20 | 3 days | 3 days | Done | Matches |
| US4 | Edit Task Information | 20 | 3 days | 3 days | Todo | Matches |
| US5 | Track Project Progress | 20 | 4 days | 4 days | Todo | Matches |
| US6 | Identify Delayed Tasks | 20 | 4 days | 4 days | Todo | Matches |
| US7 | Remove Completed Tasks | 30 | 2 days | 2 days | Todo | Matches |
| US8 | Share Task Updates | 30 | 3 days | 3 days | Todo | Matches |

## Detailed Tasks

### US1: View My Assigned Tasks

**Priority:** 10  
**Original user story estimate:** 5 days  
**Task estimate total:** 5 days  
**Status:** Done

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Create sample task data | Prepare default tasks for the prototype. | 1 day | done |
| Show task table | Display title, description, assigned user, status, and deadline. | 1 day | done |
| Add user filter | Let the user select their role and view only assigned tasks. | 1 day | done |
| Add show all button | Let the user return to the full task list. | 1 day | done |
| Test viewing tasks | Check that the filter and table work correctly. | 1 day | done |

**Back-check:** The tasks total 5 days. This matches the original user story estimate of 5 days.

### US2: Assign Team Tasks

**Priority:** 10  
**Original user story estimate:** 5 days  
**Task estimate total:** 5 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Create assignment UI | Add a simple form for choosing a task and member. | 1 day | todo |
| Load task options | Show available tasks in a dropdown list. | 1 day | todo |
| Load member options | Show possible team members in a dropdown list. | 1 day | todo |
| Update assigned member | Change the task owner after the manager submits. | 1 day | todo |
| Test assignment flow | Check that the new assigned member is displayed. | 1 day | todo |

**Back-check:** The tasks total 5 days. This matches the original user story estimate of 5 days.

### US3: Add New Tasks

**Priority:** 20  
**Original user story estimate:** 3 days  
**Task estimate total:** 3 days  
**Status:** Done

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Create add task form | Create inputs for title, description, and deadline. | 1 day | done |
| Save task in browser storage | Store new tasks using localStorage. | 1 day | done |
| Refresh task table | Show the new task after the form is submitted. | 1 day | done |

**Back-check:** The tasks total 3 days. This matches the original user story estimate of 3 days.

### US4: Edit Task Information

**Priority:** 20  
**Original user story estimate:** 3 days  
**Task estimate total:** 3 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Add edit button | Place an edit option beside each task. | 1 day | todo |
| Update task details | Allow changes to title, status, and deadline. | 1 day | todo |
| Test edited task | Confirm edited data is displayed correctly. | 1 day | todo |

**Back-check:** The tasks total 3 days. This matches the original user story estimate of 3 days.

### US5: Track Project Progress

**Priority:** 20  
**Original user story estimate:** 4 days  
**Task estimate total:** 4 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Count total tasks | Calculate the number of tasks. | 1 day | todo |
| Count completed tasks | Calculate finished tasks. | 1 day | todo |
| Show progress summary | Display a simple progress number. | 1 day | todo |
| Test progress update | Check progress after task changes. | 1 day | todo |

**Back-check:** The tasks total 4 days. This matches the original user story estimate of 4 days.

### US6: Identify Delayed Tasks

**Priority:** 20  
**Original user story estimate:** 4 days  
**Task estimate total:** 4 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Read deadline value | Use each task deadline date. | 1 day | todo |
| Compare with current date | Check if a task is overdue. | 1 day | todo |
| Mark delayed tasks | Show delayed tasks clearly. | 1 day | todo |
| Test delayed examples | Check delayed and normal tasks. | 1 day | todo |

**Back-check:** The tasks total 4 days. This matches the original user story estimate of 4 days.

### US7: Remove Completed Tasks

**Priority:** 30  
**Original user story estimate:** 2 days  
**Task estimate total:** 2 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Add remove button | Add a button to delete completed tasks. | 1 day | todo |
| Test remove action | Check that the task is removed correctly. | 1 day | todo |

**Back-check:** The tasks total 2 days. This matches the original user story estimate of 2 days.

### US8: Share Task Updates

**Priority:** 30  
**Original user story estimate:** 3 days  
**Task estimate total:** 3 days  
**Status:** Todo

| Task | Description | Estimate | Label |
|---|---|---:|---|
| Add update field | Allow a short text update for a task. | 1 day | todo |
| Display latest update | Show the update under the task. | 1 day | todo |
| Test task update | Check that update text is saved and displayed. | 1 day | todo |

**Back-check:** The tasks total 3 days. This matches the original user story estimate of 3 days.
