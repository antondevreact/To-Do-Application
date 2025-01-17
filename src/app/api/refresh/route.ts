import { NextRequest, NextResponse } from "next/server";
import { RefreshTokenModel } from "@/src/lib/models/refresh-token";
import { generateAccessToken } from "@/src/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token not found" },
        { status: 401 }
      );
    }

    const token = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!token) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const accessToken = generateAccessToken(token.userId.toString());

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
