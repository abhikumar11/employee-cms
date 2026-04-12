
import { connectDB } from "@/lib/db";
import EmployeeModel from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const employees = await EmployeeModel.find();
  return NextResponse.json({ employees });
};

export const POST = async (req: Request) => {
  try {
    await connectDB();
    const body = await req.json();
    const user = await EmployeeModel.create(body);

    return NextResponse.json(
      { user, id: user._id, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
};
