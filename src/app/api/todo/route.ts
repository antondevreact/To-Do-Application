import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";
import { connectDb } from "@/src/lib/db";
import TodoModel from "@/src/lib/models/todo";
import { MESSAGES, STATUS } from "@/src/common";
import { authenticateRequest } from "@/src/lib/jwt";
import { TodoSchema } from "@/src/schema/todo";

connectDb();

export async function GET(request: NextRequest) {
  try {
    const { userId } = await authenticateRequest(request);

    const todos = await TodoModel.find({ userId }).sort({
      isCompleted: 1,
      updatedAt: -1,
    });

    return NextResponse.json({ todos });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, error.stack);

      if (
        error.message === "Unauthorized" ||
        error.message === "Invalid token"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "Token expired") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    } else {
      console.error("Unexpected error:", error);
    }

    return NextResponse.json(
      { error: MESSAGES.FAILED_TO_FETCH },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    await TodoSchema.validate({ title });

    const { userId } = await authenticateRequest(request);

    const newTodo = await TodoModel.create({ title, userId });

    return NextResponse.json({ msg: MESSAGES.TODO_CREATED, todo: newTodo });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof Error) {
      console.error(error.message, error.stack);

      if (
        error.message === "Unauthorized" ||
        error.message === "Invalid token"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "Token expired") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    } else {
      console.error("Unexpected error:", error);
    }

    return NextResponse.json(
      { error: MESSAGES.FAILED_TO_CREATE },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await authenticateRequest(request);

    const { id } = await request.json();
    const result = await TodoModel.findOneAndDelete({ _id: id, userId });

    if (!result) {
      return NextResponse.json(
        { error: MESSAGES.TODO_NOT_FOUND },
        { status: STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json({ msg: MESSAGES.TODO_DELETED });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (
        error.message === "Unauthorized" ||
        error.message === "Invalid token"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "Token expired") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: MESSAGES.FAILED_TO_FETCH },
      { status: STATUS.SERVER_ERROR }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await authenticateRequest(request);

    const { id, isCompleted } = await request.json();

    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, userId },
      { isCompleted },
      { new: true }
    );

    if (!todo) {
      return NextResponse.json(
        { error: MESSAGES.TODO_NOT_FOUND },
        { status: STATUS.NOT_FOUND }
      );
    }

    return NextResponse.json({ msg: MESSAGES.TODO_UPDATED, todo });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (
        error.message === "Unauthorized" ||
        error.message === "Invalid token"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "Token expired") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: MESSAGES.FAILED_TO_FETCH },
      { status: STATUS.SERVER_ERROR }
    );
  }
}
