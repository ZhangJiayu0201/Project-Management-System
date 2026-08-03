CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE tasks (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  assigned_to INT,
  status VARCHAR(50) NOT NULL,
  deadline DATE,
  FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

CREATE TABLE task_updates (
  update_id INT PRIMARY KEY AUTO_INCREMENT,
  task_id INT NOT NULL,
  update_text TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

CREATE TABLE bug_reports (
  bug_id INT PRIMARY KEY AUTO_INCREMENT,
  user_story VARCHAR(20) NOT NULL,
  summary VARCHAR(255) NOT NULL,
  priority VARCHAR(50),
  status VARCHAR(50)
);
