"use client";

import useEmployee from "@/hooks/useEmployee";
import { Employee } from "@/types/employe.types";
import { Table } from "react-bootstrap";

const UserTable = () => {
  const { employees, isLoading } = useEmployee();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Designation</th>
          <th>Date of Joining</th>
        </tr>
      </thead>

      <tbody>
        {employees?.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">
              No Employees Found
            </td>
          </tr>
        ) : (
          employees?.map((employee: Employee) => (
            <tr key={employee._id || employee.email}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.age}</td>
              <td>{employee.department}</td>
              <td>
                {new Date(employee.joiningDate).toLocaleDateString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;