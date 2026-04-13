"use client";
import useEmployee from "@/hooks/useEmployee";
import DataForm from "../common/DataForm";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Employee } from "@/types/employe.types";
import UserTable from "../UserTable";

const UserForm = () => {
      const {
    employees,
    isLoading,
    saveNewEmployee,
    updateEmployee,
    deleteEmployee,
    isSaving,
    isUpdating,
    isDeleting,
  } = useEmployee();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (employee: Employee) => {
    if (!employee._id) return;

    const shouldDelete = window.confirm(
      `Delete ${employee.name}'s employee record?`
    );

    if (!shouldDelete) return;

    await deleteEmployee(employee._id);
  };

  const handleSubmit = async (data: Employee) => {
    if (selectedEmployee?._id) {
      await updateEmployee({ ...data, _id: selectedEmployee._id });
    } else {
      await saveNewEmployee(data);
    }

    handleClose();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Employee Management</h1>
        <Button onClick={handleAddEmployee}>Add New Employee</Button>
      </div>

      <UserTable
        employees={employees}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEmployee ? "Update Employee" : "Add New Employee"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataForm
            formAction={handleSubmit}
            defaultValues={selectedEmployee ?? undefined}
            isLoading={isSaving || isUpdating}
          />
        </Modal.Body>
      </Modal>
    </div>
     );
}
export default UserForm;
