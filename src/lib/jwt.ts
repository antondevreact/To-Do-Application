import jwt, { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export { generateAccessToken, generateRefreshToken };

export function verifyToken(token: string): CustomJwtPayload {
  return verify(token, process.env.JWT_ACCESS_SECRET!) as CustomJwtPayload;
}

export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
};

export async function authenticateRequest(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }
    throw new Error("An unknown error occurred");
  }
}
