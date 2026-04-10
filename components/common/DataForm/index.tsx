"use client";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
const DataForm = () => {
     const { register, handleSubmit,formState:{errors} } = useForm();
     return (
          <div className="p-4">
               <form onSubmit={handleSubmit((data) => console.log(data))}>
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
                                   {...(register("employeeName",
                                   { required: "Employee name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: "Name can only contain letters and spaces",
                                    },
                                    }))}
                              />
                                {errors.employeeName && (
                                     <p className="text-danger">
                                          {errors.employeeName.message}
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
                                   {...register("employeeAge", {
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
                              {errors.employeeAge && (
                                   <p className="text-danger">
                                        {errors.employeeAge.message}
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
                                   {...register("employeeEmail",{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                   })}
                              />
                              {errors.employeeEmail &&(
                                      <p className="text-danger">
                                             {errors.employeeEmail.message} 
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
                                   {...register("employeeDepartment",{
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
                              {errors.employeeDepartment && (
    <p className="text-danger small">
      {errors.employeeDepartment.message}
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
                                   {...register("employeeJoiningDate",{
                                    required: "Joining date is required",
                                    validate: (value) => {
                                        const selectedDate = new Date(value);
                                        const today = new Date();
                                        if (selectedDate > today) {
                                            return "Joining date cannot be the future date";
                                        }
                                    }   
                                   })}
                              />
                              {errors.employeeJoiningDate && (
    <p className="text-danger small">
      {errors.employeeJoiningDate.message}
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
