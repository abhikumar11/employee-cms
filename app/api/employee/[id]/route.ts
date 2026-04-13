import { connectDB } from "@/lib/db";
import EmployeeModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request,
  { params }: { params: { id: string } }) {
  await connectDB();
  const user = await EmployeeModel.findById(params.id);
  return NextResponse.json(user);
}
export async function PUT(req: Request,
  { params }: { params: { id: string } }) {
  await connectDB();
  const body = await req.json();
  const user = await EmployeeModel.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json({user,message: "User updated successfully" },{ status: 200 });
}
export async function DELETE(req: Request,{params}:{params:{id:string}}){
    await connectDB();
    await EmployeeModel.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "User deleted successfully" },{ status: 200 });
}
