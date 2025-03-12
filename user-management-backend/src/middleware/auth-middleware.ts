import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../utils/response";
import { decodeToken } from "../utils/token";

export default async function protect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check for token cookie in req
    const { token } = req.cookies;

    // if token exist then decode it using jwt

    if (!token) {
      return res.status(401).json(new ErrorResponse(401, "Unauthorised"));
    }

    const decoded = decodeToken(token);

    if (!decoded) {
      return res.status(401).json(new ErrorResponse(401, "Unauthorised"));
    }

    // if token valid then next() and add id and email to it so that controllers can access it.

    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(new ErrorResponse(500, "Internal Server Error"));
  }
}
