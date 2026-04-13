"use client";

import { Employee } from "@/types/employe.types";
import { Button, ButtonGroup, Table } from "react-bootstrap";

interface UserTableProps {
  employees?: Employee[];
  isLoading?: boolean;
  isDeleting?: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const UserTable = ({
  employees,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: UserTableProps) => {

  if (isLoading) return <p>Loading...</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Designation</th>
          <th>Date of Joining</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees?.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">
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
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-primary"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(employee)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
