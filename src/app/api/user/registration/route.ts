import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import { UserModel } from "@/src/lib/models/user";
import { connectDb } from "@/src/lib/db";
import { RefreshTokenModel } from "@/src/lib/models/refresh-token";
import { generateAccessToken, generateRefreshToken } from "@/src/lib/jwt";
import { REFRESH_TOKEN_MAX_AGE } from "@/src/common";
import { ServerRegistrationSchema } from "@/src/schema/user";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await ServerRegistrationSchema.validate(body, { abortEarly: false });

    const { email, password } = body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await UserModel.create({ email, password });

    const accessToken = generateAccessToken(newUser._id.toString());
    const refreshToken = generateRefreshToken(newUser._id.toString());

    await RefreshTokenModel.create({
      userId: newUser._id,
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
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
