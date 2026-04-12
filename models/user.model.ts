import { Employee } from "@/types/employe.types";
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema<Employee>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now }
});
const EmployeeModel =
  mongoose.models.Employee ||
  mongoose.model<Employee>("Employee", employeeSchema);

export default EmployeeModel;
