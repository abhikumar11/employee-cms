export interface Employee{
    _id?: string;
    name: string;
    age: number;
    email: string;
    department: string;
    joiningDate: Date | string;
}
export interface DataFormProps{
    formAction:(data:Employee)=> Promise<void | Employee> | void;
}
