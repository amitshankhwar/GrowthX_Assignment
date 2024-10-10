# Assignment Submission Portal Backend

This is a backend system for an assignment submission portal where **users** can upload assignments, and **admins** can review and either accept or reject them. It is built using **Node.js**, **Express**, and **MongoDB**, with JWT-based authentication for security.

## Features

- **Users** can:
  - Register and log in.
  - Upload assignments.
- **Admins** can:
  - Register and log in.
  - View all assignments assigned to them.
  - Accept or reject assignments.
- **JWT Authentication** is used for secure access to the system.
- **MongoDB** is used for data storage.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14+ recommended)
- **MongoDB** (Ensure MongoDB is running locally or remotely)
- **npm** (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/GrowthX_Assignment.git
cd backend
```
### 2. Install Dependencies
Use npm to install the project dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root of the project and define the necessary environment variables:
```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/assignment_portal  # Update this if using a remote MongoDB instance
JWT_SECRET=yourSuperSecretKey   # Define your own JWT secret for signing tokens
```

### 4. Start MongoDB
Ensure that MongoDB is running on your machine. If you’re running MongoDB locally, Or connect to a remote MongoDB instance by changing the MONGO_URI in your .env file.

### 5. Run the Application
You can start the application using nodemon (for development) or node (for production).

```bash
npm run server
```

### 6. Test API Endpoints
You can test the API endpoints using Postman, Insomnia, or any other API testing tool.

### API Endpoints

#### User Endpoints:

- **Register a user:**
  - `POST /api/users/register`
  - Request body:
    ```json
    {
      "username": "amit",
      "password": "password123",
      "role": "user" // or "admin"
    }
    ```
  - Response:
    ```json
     { "message": "User registered successfully" }
   ```
- **User Login:**
  - `POST /api/users/login`
  - Request body:
    ```json
    {
      "username": "amit",
      "password": "password123",
    }
    ```
  - Response:
    ```json
    {
      "token": "JWT_TOKEN"
    }
    ```
- **Upload Assignment (for Authenticated user):**
  - `POST /api/users/upload`
  - Headers:
    ```makefile
    Authorization: Bearer <your_jwt_token>
    ```
  - Request body:
    ```json
    {
    "task": "Complete backend development",
    "admin": "admin_username"
    }
    ```
  - Response:
    ```json
     { "message": "Assignment uploaded" }
    ```
- **Get All Admins::**
  - `POST /api/users/admins`
  - 
  - Response:
    ```json
    [
      {
      "_id": "60bdbf81a1f4a2132c72f9a6",
      "username": "admin_amit",
      "role": "admin"
      }
    ]
    ```
#### Admin Endpoints:

- **Admin Login::**
  - `POST /api/admins/loginr`
  - Request body:
    ```json
    {
    "username": "admin_amit",
    "password": "adminpassword123"
    }
    ```
  - Response:
    ```json
     {
    "token": "JWT_TOKEN"
    }
   ```
- **View Assignments Submit to Respective Admin (Authenticated):**
  - `GET /api/admins/assignments`
 - Headers:
    ```makefile
    Authorization: Bearer <your_jwt_token>
    ```
  - Request body:
    ```json
    {
    "task": "Complete backend development",
    "admin": "admin_amit"
    }
    ```
  - Response:
    ```json
     [
        {
        "_id": "60bdbf81a1f4a2132c72f9a9",
        "userId": {
          "_id": "60bdbf81a1f4a2132c72f9a7",
          "username": "john_doe"
        },
        "adminId": "60bdbf81a1f4a2132c72f9a5",
        "task": "Complete backend development",
        "createdAt": "2024-10-08T07:20:50.522Z",
        "status": "pending"
        }
    ]
    ```
- **Accept Assignment (Authenticated)::**
  - `POST /api/admins/assignments/:id/accept`
 - Headers:
    ```makefile
    Authorization: Bearer <your_jwt_token>
    ```
 
  - Response:
    ```json
    { "message": "Assignment accepted" }
    ```
- **Reject Assignment (Authenticated):**
  - `POST /api/admins/assignments/:id/reject`
 - Headers:
    ```makefile
    Authorization: Bearer <your_jwt_token>
    ```
 
  - Response:
    ```json
    { "message": "Assignment rejected" }
    ```
### Authentication
For any endpoints requiring authentication, you must send the JWT token in the Authorization header. Use the following format:
    ```makefile
    Authorization: Bearer <your_jwt_token>
    ```
You can obtain the JWT token by logging in as a user or admin using the /api/users/login or /api/admins/login endpoints.    




