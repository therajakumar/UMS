# User Management System (UMS)

This is a Node.js-based user management system with authentication and image upload functionality, built using Express, MongoDB, and JWT authentication.

## Features

- User registration and login with email or phone number
- JWT authentication and cookie-based session management
- Image upload and retrieval system
- Secure API endpoints with authentication middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JWT Authentication
- Multer (for image upload)
- CORS and Cookie-parser

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repository.git
   cd your-repository
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

4. Start the server:
   ```sh
   npm run dev
   ```
   The server will start at `http://localhost:5001`

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
├── config/
│   ├── db.ts           # Database connection
│   ├── multer.ts       # Multer configuration for image uploads
│
├── controller/
│   ├── auth.controller.ts   # User authentication logic
│   ├── image.controller.ts  # Image upload and retrieval logic
│
├── middleware/
│   ├── auth-middleware.ts   # Authentication middleware
│
├── modals/
│   ├── user.modal.ts   # User schema
│   ├── image.modal.ts  # Image schema
│
├── routes/
│   ├── auth.routes.ts   # Authentication routes
│   ├── image.routes.ts  # Image upload routes
│
├── utils/
│   ├── response.ts  # Custom response classes
│   ├── token.ts     # JWT token generation
│
├── .env         # Environment variables
├── server.ts    # Main server file
└── package.json # Dependencies
```

## Security Considerations

- Passwords should be hashed before storing (implement bcrypt or another hashing library)
- JWT should have an expiration time and be stored securely
- Use HTTPS in production
- Validate and sanitize user inputs

## License

This project is open-source and free to use. Modify it as per your needs.
