"use client";

import { DataFormProps, Employee } from "@/types/employe.types";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const DataForm = ({
  title,
  formAction,
  defaultValues,
  isLoading,
}: DataFormProps & {
  defaultValues?: Partial<Employee>;
  isLoading?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues,
  });

  const onSubmit = async (data: Employee) => {
    await formAction(data);
    reset();
  };

  return (
    <div className="p-4">
      <h5>{title}</h5>

      <form onSubmit={handleSubmit(onSubmit)}>
      
        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">Employee Name</label>
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              {...register("name", {
                required: "Employee name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Only letters allowed",
                },
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">Employee Age</label>
          </Col>
          <Col md={6}>
            <input
              type="number"
              className="form-control"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Min 18" },
                max: { value: 65, message: "Max 65" },
              })}
            />
            {errors.age && (
              <p className="text-danger">{errors.age.message}</p>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">Email</label>
          </Col>
          <Col md={6}>
            <input
              type="text"
              className="form-control"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">Department</label>
          </Col>
          <Col md={6}>
            <select
              className="form-select"
              {...register("department", {
                required: "Department required",
              })}
            >
              <option value="">Select</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
            </select>
            {errors.department && (
              <p className="text-danger">
                {errors.department.message}
              </p>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <label className="form-label">Joining Date</label>
          </Col>
          <Col md={6}>
            <input
              type="date"
              className="form-control"
              {...register("joiningDate", {
                required: "Joining date required",
                validate: (value) => {
                  if (new Date(value) > new Date()) {
                    return "Cannot be future date";
                  }
                },
              })}
            />
            {errors.joiningDate && (
              <p className="text-danger">
                {errors.joiningDate.message}
              </p>
            )}
          </Col>
        </Row>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DataForm;
