import { connectDB } from "@/lib/db";
import EmployeeModel from "@/models/user.model";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteContext) {
  await connectDB();
  const { id } = await params;
  const user = await EmployeeModel.findById(id);
  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const user = await EmployeeModel.findByIdAndUpdate(id, body, { new: true });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { user, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: RouteContext) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedUser = await EmployeeModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);

    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}
