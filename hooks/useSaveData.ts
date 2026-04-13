import { Employee } from "@/types/employe.types"

const useEmployee = () => {
    const saveNewEmployee = (employee: Employee) => {
           console.log(employee);
    }
    const updateEmployee = (employee: Employee) => {
              console.log(employee);
    }
    return{ saveNewEmployee, updateEmployee };
}
export default useEmployee;