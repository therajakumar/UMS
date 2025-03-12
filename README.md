# User Management System (UMS)

This is a full-stack user management system with authentication and image upload functionality, built using React, Vite, Tailwind CSS, ShadCN, Express, MongoDB, and JWT authentication.

## Features

- User registration and login with email or phone number
- JWT authentication and cookie-based session management
- Image upload and retrieval system
- Secure API endpoints with authentication middleware
- Frontend built with React + Vite, styled with Tailwind CSS and ShadCN

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT Authentication
- Multer (for image upload)
- CORS and Cookie-parser

### Frontend

- React.js
- Vite
- Tailwind CSS
- ShadCN
- React Router DOM

## Installation

### Backend Setup

1. Navigate to the backend folder:

   ```sh
   cd user-management-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/ums?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=mysecret
   PORT=5001
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend folder:

   ```sh
   cd user-management-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add the following:

   ```env
   VITE_API_URL=http://localhost:5001
   ```

4. Start the frontend application:
   ```sh
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`

## API Endpoints

### Authentication Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| GET    | `/api/auth/logout`   | Logout user         |

### Image Routes (Protected)

| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| POST   | `/api/images/upload`     | Upload an image                 |
| GET    | `/api/images/get-images` | Get images uploaded by the user |

## Project Structure

```
UMS/
├── user-management-backend/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── modals/
│   ├── routes/
│   ├── utils/
│   ├── .env         # Backend environment variables
│   ├── server.ts    # Main backend server file
│   ├── package.json # Backend dependencies
│
├── user-management-frontend/
│   ├── src/
│   │   ├── pages/   # React pages (Login, Register, Photos, Home, NotFound)
│   │   ├── App.tsx  # Main React app file
│   │   ├── main.tsx # Entry point
│   ├── .env         # Frontend environment variables
│   ├── vite.config.ts # Vite configuration
│   ├── package.json # Frontend dependencies
│
└── README.md
```

## Security Considerations

- Passwords should be hashed before storing (implement bcrypt or another hashing library)
- JWT should have an expiration time and be stored securely
- Use HTTPS in production
- Validate and sanitize user inputs

## Repository

[GitHub Repository](https://github.com/therajakumar/UMS)

## License

This project is open-source and free to use. Modify it as per your needs.
