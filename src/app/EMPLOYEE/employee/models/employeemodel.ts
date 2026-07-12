export interface Employee {
    id:number;
    name:string;
    email:string;
    department:string;
    salary:number | null;

}

   export interface CreateEmployee {
  name: string;
  email: string;
  department:string;
  salary: number | null;
}




