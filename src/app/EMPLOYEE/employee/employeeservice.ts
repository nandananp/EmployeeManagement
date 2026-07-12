import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { Employee, CreateEmployee } from './models/employeemodel';

@Injectable({
  providedIn: 'root',
})
export class Employeeservice {
  apiurl='https://localhost:7215/api/employee';

  constructor(private http: HttpClient){

  }

 getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiurl}/GetEmployees`);
  }

  addEmployee(employee: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiurl}/CreateEmployees`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiurl}/UpdateEmployees`, employee);
  }

  deleteEmployee( id :number): Observable<any> {
    return this.http.delete(`${this.apiurl}/DeleteEmployees?id=${id}`);
  }
}