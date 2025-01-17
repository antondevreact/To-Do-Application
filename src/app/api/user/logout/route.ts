import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "User logged out successfully",
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    maxAge: -1,
  });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    maxAge: -1,
  });

  return response;
}
