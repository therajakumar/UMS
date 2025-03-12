import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Please sign in to continue.
        </p>
      </div>

      <LoginForm />

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          New user?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
