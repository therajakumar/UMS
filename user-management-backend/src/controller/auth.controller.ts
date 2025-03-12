import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/response";
import User from "../modals/user.modal";
import { generateToken } from "../utils/token";

export async function register(req: Request, res: Response) {
  try {
    // name,email,phone,password accept
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "Please fill all details"));
    }

    // Email regex validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "Invalid email format"));
    }

    // Phone regex validation (Indian number starting with +91 and 10 digits)
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json(
          new ErrorResponse(
            400,
            "Invalid Indian phone number. It should start with +91 and have 10 digits."
          )
        );
    }

    // If validation passes, continue with user creation logic

    // email and phone exist nahi karna cheiye
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "Email or phone number already in use"));
    }

    // if ssuccess then database me save karna hoga

    const newUser = new User({
      email,
      password,
      name,
      phone,
    });

    await newUser.save();

    res.cookie("token", generateToken(String(newUser._id), newUser.email), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 86400 * 30,
    });

    return res
      .status(201)
      .json(new SuccessResponse(201, "User registration Successfull"));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body;

    let user = null;

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (emailRegex.test(identifier)) {
      user = await User.findOne({ email: identifier });
    }

    const phoneRegex = /^\+91[6-9]\d{9}$/;

    if (phoneRegex.test(identifier)) {
      user = await User.findOne({ phone: identifier });
    }

    if (!user) {
      return res
        .status(400)
        .json(new ErrorResponse(400, "User does not exist"));
    }

    if (user.password !== password) {
      return res.status(401).json(new ErrorResponse(401, "Incorrect Password"));
    }

    res.cookie("token", generateToken(String(user._id), user.email), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 86400 * 30,
    });

    return res
      .status(200)
      .json(new SuccessResponse(200, "User login Successfull"));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    return res.status(200).json(new SuccessResponse(200, "Logout successfull"));
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}
