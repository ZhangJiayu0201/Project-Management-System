
## Selected User Stories

- US1: View My Assigned Tasks
- US2: Assign Team Tasks
- US3: Add New Tasks
- US4: Edit Task Information
- US5: Track Project Progress

| Test ID | User Story             |                         Automated Test                         |
| US1-1   | View My Assigned Tasks | showAssignedTasks returns only tasks assigned to selected user |
| US1-2   | View My Assigned Tasks | showAllTasks returns all available tasks                       |
| US1-3   | View My Assigned Tasks | showAssignedTasks returns empty list for user with no tasks    |
| US2-1   |    Assign Team Tasks   | assignTask changes assigned member for an existing task        |
| US2-2   |    Assign Team Tasks   | assignTask rejects empty member name                           |
| US2-3   |    Assign Team Tasks   | assignTask rejects missing task id                             |
| US3-1   |     Add New Tasks      | addTask adds a valid task                                      |
| US3-2   |     Add New Tasks      | addTask rejects empty title                                    |
| US3-3   |     Add New Tasks      | addTask sets default status to todo                            |
| US4-1   | Edit Task Information  | editTask updates title, description, status, and deadline      |
| US4-2   | Edit Task Information  | editTask keeps old values when only one field is changed       |
| US4-3   | Edit Task Information  | editTask rejects missing task id                               |
| US5-1   | Track Project Progress | getProgressSummary counts total, done, and unfinished tasks    |
| US5-2   | Track Project Progress | getProgressSummary calculates completion percentage            |
| US5-3   | Track Project Progress | getProgressSummary handles an empty task list                  |
