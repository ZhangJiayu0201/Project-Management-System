# Project Management System

## Project

This is a simple web-based Project Management System.

The system allows users to register, sign in, manage tasks,
track progress, identify delayed tasks, share task updates,
and remove completed tasks.

## Files

- index.html
- app.html
- requirements.html
- design.html
- testing.html
- tools.html
- style.css
- app.js
- database.sql
- images/architecture_uml.png
- images/database_diagram.png
- images/ui_prototype.png
- README.md

## Technologies

The project uses:

- HTML
- CSS
- JavaScript
- GitHub
- GitHub Pages
- Supabase
- PostgreSQL

## Database

The system uses a PostgreSQL SQL database hosted by Supabase.

The main database tables are:

- tasks
- task_updates
- bug_reports

Supabase Auth is used for user accounts.

Each task and task update has an owner ID.

Row Level Security is used so that users can only access
their own database records.

## Register

Open index.html.

Enter:

- Email
- Password
- Role

Then click Register.

The account is created using Supabase Auth.

## Sign In

Enter the registered email and password.

Then click Sign In.

After a successful login, the user enters app.html.

If a signed-in user opens index.html again,
the system automatically returns to app.html.

## Logout

Click Logout on the App page.

The Supabase session is ended and the user returns
to index.html.

## App

The App page supports:

- View assigned tasks
- Assign team tasks
- Add new tasks
- Edit task information
- Track project progress
- Identify delayed tasks
- Remove completed tasks
- Share task updates

Task information is stored in the PostgreSQL database.

The browser does not use localStorage for task data.

## Task Updates

Task updates are stored in the task_updates table.

A new update is only added when the update text changes.

Saving another part of a task without changing the update
does not create a duplicate update.

## Testing

Sign in before running the automated tests.

Open testing.html.

Click:

Run Automated Tests

The automated tests connect to the real PostgreSQL database.

The tests check:

1. Database connection
2. User login
3. View tasks
4. User data protection
5. Add task
6. Assign task
7. Edit task
8. Project progress
9. Delayed task
10. Save task update
11. Read latest update
12. Change task status
13. Remove completed task
14. Test data cleanup

The tests create temporary test data.

The temporary task is removed after testing.

Expected result:

Passed: 14

Failed: 0

## Security

The application uses Supabase Row Level Security.

Database records use the current user's ID as owner_id.

Users can only access records that belong to their account.

Only the Supabase publishable key is used in app.js.

The service role key is not stored in the website.

## GitHub Pages

The HTML website can be deployed using GitHub Pages.

The browser connects to Supabase through JavaScript.

This allows users on different computers to use the same
online SQL database.

