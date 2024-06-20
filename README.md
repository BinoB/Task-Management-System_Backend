

# Task Manager API

This is a simple Task Manager API built with Node.js, Express, and MongoDB. It includes authentication and CRUD (Create, Read, Update, Delete) functionality.

## Features

- User authentication with JWT
- CRUD operations for tasks
- RESTful API endpoints
- Input validation
- Error handling

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (Json Web Token)
- bcrypt.js (for hashing passwords)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone [https://github.com/your-username/task-manager-api.git](https://github.com/BinoB/Task-Management-System_Backend.git)
    cd task-manager-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

    The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

#### Register a new user

- **URL**: `/api/user/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "name": "Your Name",
        "email": "your.email@example.com",
        "password": "yourpassword"
    }
    ```

#### Login a user

- **URL**: `/api/user/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "your.email@example.com",
        "password": "yourpassword"
    }
    ```

### Tasks

#### Create a new task

- **URL**: `/api/task`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
    ```json
    {
  "title": "Complete project report and review",
  "description": "Finish the final report for the project, review it with the team, and submit it by the end of the week.",
  "dueDate": "2024-06-26",
  "priority": "Medium",
  "status": "In Progress"
}

    ```

#### Get all tasks

- **URL**: `/api/task`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Get a single task

- **URL**: `/api/task/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

#### Update a task

- **URL**: `/api/task/:id`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
    ```json
    {
  "title": "Complete project report and review",
  "description": "Finish the final report for the project, review it with the team, and submit it by the end of the week.",
  "dueDate": "2024-06-26",
  "priority": "Medium",
  "status": "Comleted"
}

    ```

#### Delete a task

- **URL**: `/api/task/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`

## Project Structure

```
.
├── controllers
│   ├── userController.js # Authentication logic
│   └── taskController.js # Task logic
├── middleware
│   └── authMiddleware.js         # Authentication middleware
│   └── errorMiddleware.js        # Error Handler middleware
├── models
│   ├── userModel.js         # User model
│   └── taskModel.js         # Task model
│   └── tokenModel.js        # Token model
├── routes
│   ├── userRoute.js         # Authentication routes
│   └── taskRoute.js         # Task routes
├── .env                # Environment variables
├── .gitignore          # Files to ignore in Git
├── package.json        # Project dependencies and scripts
├── server.js           # Entry point of the application
└── README.md           # Project documentation
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
