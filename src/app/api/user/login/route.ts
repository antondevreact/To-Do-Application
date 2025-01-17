import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as Yup from "yup";
import { UserModel } from "@/src/lib/models/user";
import { connectDb } from "@/src/lib/db";
import { RefreshTokenModel } from "@/src/lib/models/refresh-token";
import { generateAccessToken, generateRefreshToken } from "@/src/lib/jwt";
import { REFRESH_TOKEN_MAX_AGE } from "@/src/common";
import { AuthorizationSchema } from "@/src/schema/user";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await AuthorizationSchema.validate(body, { abortEarly: false });

    const { email, password } = body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Not found user" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    await RefreshTokenModel.create({
      userId: user._id,
      token: refreshToken,
    });

    const response = NextResponse.json({
      msg: "User authenticated successfully",
      accessToken,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    return response;
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error(error);

    return NextResponse.json(
      { error: "Failed to authenticate user" },
      { status: 500 }
    );
  }
}
