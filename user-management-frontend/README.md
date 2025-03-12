# User Management System (UMS)

This is a frontend application for a user management system with authentication and image upload functionality, built using React, Vite, Tailwind CSS, and ShadCN.

## Features

- User registration and login with email or phone number
- JWT authentication and cookie-based session management
- Image upload and retrieval system
- Secure API calls to the backend
- Styled with Tailwind CSS and ShadCN

## Technologies Used

- React.js
- Vite
- Tailwind CSS
- ShadCN
- React Router DOM

## Installation

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

## Project Structure

```
user-management-frontend/
├── src/
│   ├── pages/   # React pages (Login, Register, Photos, Home, NotFound)
│   ├── App.tsx  # Main React app file
│   ├── main.tsx # Entry point
├── .env         # Frontend environment variables
├── vite.config.ts # Vite configuration
├── package.json # Frontend dependencies
└── README.md
```

## Repository

[GitHub Repository](https://github.com/therajakumar/UMS)

## License

This project is open-source and free to use. Modify it as per your needs.
