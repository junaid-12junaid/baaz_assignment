# baaz_assignment

Task: Build a Task Management API with User Authentication
Objective: Develop a full-fledged RESTful API that allows users to sign up, log in, and manage their tasks. Each user should have their own list of tasks, and the system should handle user authentication using JWT (JSON Web Tokens).

Requirements:
1. Environment Setup:
Use Node.js with Express.js for building the API.

Use MongoDB with Mongoose for data storage (or MySQL/SQLite with an ORM like Sequelize if they prefer SQL databases).

Implement JWT for user authentication.

2. User Authentication:
POST /auth/signup - Register a new user (store username and password securely using hashing like bcrypt).

POST /auth/login - Authenticate the user and return a JWT token.

Secure task routes so only authenticated users can access them using the JWT token.

3. Task Management:
GET /tasks - Fetch all tasks for the authenticated user.

POST /tasks - Add a new task for the authenticated user.

PUT /tasks/:id - Update an existing task for the user.

DELETE /tasks/:id - Delete a task by its ID.

4. Task Object Structure (json):
{

  "id": "unique_id",

  "title": "Complete Node.js project",

  "description": "Finish building the task management API",

  "status": "pending", // or "completed"

  "dueDate": "2024-11-30",

}


5. Features:
Task filter - Add query parameters for filtering tasks based on status (e.g., pending, completed).

Pagination: Implement pagination for tasks, allowing users to fetch tasks in chunks (e.g., /tasks?page=1&limit=10).

File uploads: Allow users to attach files to their tasks (e.g., attach images or documents to tasks) and store them using local storage.

6. Data Persistence:
Use MongoDB for storing user and task data (Each task document should be tied to a user ID).

Securely store passwords by hashing them with bcrypt.

7. Validation:
Ensure the title is required for tasks.

Use any validation library to validate input data (e.g., valid email for signup, non-empty password)