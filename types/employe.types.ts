export interface Employee{
    _id?: string;
    name: string;
    age: number;
    email: string;
    department: string;
    joiningDate: Date | string;
}
export interface DataFormProps{
    title: string;
    formAction:(data:Employee)=> Promise<Employee> | void;
}
