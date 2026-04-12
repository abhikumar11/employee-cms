
import { connectDB } from "@/lib/db";
import EmployeeModel from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const users = await EmployeeModel.find();
  return NextResponse.json({ users });
};

export const POST = async (req: Request) => {
    await connectDB();
    const body = await req.json();
    const user= EmployeeModel.create(body);
     return NextResponse.json(user, { status: 201 });
}
