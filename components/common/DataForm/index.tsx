"use client";
import { DataFormProps, Employee } from "@/types/employe.types";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
const DataForm = ({ title, formAction }: DataFormProps) => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm<Employee>();

      const onSubmit = (data: Employee) => {
          formAction(data);
     }
     return (
          <div className="p-4">
               <p>{title}</p>
               <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mb-3">
                         <Col md={6}>
                              <label className="form-label">
                                   Employee Name
                              </label>
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
                                             message: "Name can only contain letters and spaces",
                                        },
                                   })}
                              />
                              {errors.name && (
                                   <p className="text-danger">
                                        {errors.name.message}
                                   </p>
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
                                   placeholder="25"
                                   {...register("age", {
                                        required: "Employee age is required",
                                        min: {
                                             value: 18,
                                             message: "Employee must be at least 18 years old",
                                        },
                                        max: {
                                             value: 65,
                                             message: "Employee must be under 65 years old",
                                        },
                                   })}
                              />
                              {errors.age && (
                                   <p className="text-danger">
                                        {errors.age.message}
                                   </p>
                              )}
                         </Col>
                    </Row>
                    <Row className="mb-3">
                         <Col md={6}>
                              <label className="form-label">
                                   Email Address
                              </label>
                         </Col>
                         <Col md={6}>
                              <input
                                   type="text"
                                   className="form-control"
                                   placeholder="name@company.com"
                                   {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                             message: "Please enter a valid email address",
                                        },
                                   })}
                              />
                              {errors.email && (
                                   <p className="text-danger">
                                        {errors.email.message}
                                   </p>
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
                                        required: "Department is required",
                                   })}
                              >
                                   <option value="">Select Department</option>
                                   <option value={"Engineering"}>
                                        Engineering
                                   </option>
                                   <option value={"Marketing"}>
                                        Marketing
                                   </option>
                                   <option value={"HR"}>HR</option>
                              </select>
                              {errors.department && (
                                   <p className="text-danger small">
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
                                        required: "Joining date is required",
                                        validate: (value) => {
                                             const selectedDate = new Date(
                                                  value,
                                             );
                                             const today = new Date();
                                             if (selectedDate > today) {
                                                  return "Joining date cannot be the future date";
                                             }
                                        },
                                   })}
                              />
                              {errors.joiningDate && (
                                   <p className="text-danger small">
                                        {errors.joiningDate.message}
                                   </p>
                              )}
                         </Col>
                    </Row>
                    <button type="submit" className="btn btn-primary">
                         Submit
                    </button>
               </form>
          </div>
     );
};

export default DataForm;
