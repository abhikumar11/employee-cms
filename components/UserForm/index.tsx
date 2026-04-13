"use client";
import useEmployee from "@/hooks/useSaveData";
import DataForm from "../common/DataForm";

const UserForm = () => {
     const { saveNewEmployee } = useEmployee();
     return <DataForm title="Add New Employee" formAction={saveNewEmployee} />;
};
export default UserForm;
