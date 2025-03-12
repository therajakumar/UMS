import { Router } from "express";
import { login, logout, register } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  login(req, res);
});

authRouter.post("/register", (req, res) => {
  register(req, res);
});

authRouter.get("/logout", (req, res) => {
  logout(req, res);
});

export default authRouter;
