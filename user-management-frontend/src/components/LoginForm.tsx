import { AuthService } from "@/services/auth-services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  identifier: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\+91[6-9]\d{9}$/;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Validate if identifier is email or phone
    const isEmail = emailRegex.test(data.identifier);
    const isPhone = phoneRegex.test(data.identifier);

    if (!isEmail && !isPhone) {
      setError("identifier", {
        type: "manual",
        message: "Please enter a valid email or phone number (+91XXXXXXXXXX)",
      });
      setIsSubmitting(false);
      return;
    }

    const { error } = await AuthService.login({
      identifier: data.identifier,
      password: data.password,
    });

    if (!error) {
      toast.success("Login successfull");
      window.location.href = "/photos";
    } else {
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="identifier"
          className="block text-sm font-medium text-gray-700"
        >
          Email or Phone Number
        </label>
        <input
          id="identifier"
          type="text"
          placeholder="Enter email or phone number"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.identifier ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          {...register("identifier", {
            required: "Email or phone number is required",
          })}
        />
        {errors.identifier && (
          <p className="mt-1 text-sm text-red-600">
            {errors.identifier.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
