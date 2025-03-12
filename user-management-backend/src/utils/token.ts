import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file");
}

/**
 * Encrypts the user ID and name into a JWT token.
 * @param id - User ID
 * @param name - User name
 * @returns JWT token
 */
export const generateToken = (id: string, name: string): string => {
  return jwt.sign({ id, name }, JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Decodes and verifies the JWT token.
 * @param token - JWT token
 * @returns Decoded payload or null if invalid
 */
export const decodeToken = (
  token: string
): { id: string; name: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; name: string };
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};
