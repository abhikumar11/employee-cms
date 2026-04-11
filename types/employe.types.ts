export interface Employee{
    id: number;
    name: string;
    age: number;
    email: string;
    department: string;
    joiningDate: Date;
}
export interface DataFormProps{
    title: string;
    formAction:(data:Employee)=> void;
}