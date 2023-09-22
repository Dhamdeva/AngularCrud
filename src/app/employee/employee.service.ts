import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/catch";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { catchError } from "rxjs/operators";

@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}
  baseUrl = "http://localhost:3000/employees";
  // baseUrl = "https://dummyjson.com/products";
  // private listEmployee: Employee[] = [
  //   {
  //     id: 1,
  //     name: "Mark",
  //     gender: "Male",
  //     contactPreference: "Email",
  //     email: "mark@pragimtech.com",
  //     dateOfBirth: new Date("10/25/1988"),
  //     department: "1",
  //     isActive: true,
  //     image: "../../../assets/image/Dham.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Mary",
  //     gender: "Female",
  //     contactPreference: "Phone",
  //     phoneNumber: 2345978640,
  //     dateOfBirth: new Date("11/20/1979"),
  //     department: "2",
  //     isActive: true,
  //     image: "../../../assets/image/Dham.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "John",
  //     gender: "Male",
  //     contactPreference: "Phone",
  //     phoneNumber: 5432978640,
  //     dateOfBirth: new Date("3/25/1976"),
  //     department: "3",
  //     isActive: false,
  //     image: "../../../assets/image/Dham.jpg",
  //   },
  // ];
  getEmployee(): Observable<Employee[]> {
    // return Observable.of(this.listEmployee).delay(2000);

    return this.httpClient
      .get<Employee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("client side error :", errorResponse.error.message);
    } else {
      console.log("server side error", errorResponse);
    }
    return new ErrorObservable(
      "There is a problem with the service.We are notified & working on it. Please try again later."
    );
  }
  // getEmployees(id: number): Employee {
  //   return this.listEmployee.find((e) => e.id === id);
  // }
  // save(employee: Employee): Observable<Employee> {
  //   if (employee.id === null) {
  //     // const maxId = this.listEmployees.reduce(function (e1, e2) {
  //     //     return (e1.id > e2.id) ? e1 : e2;
  //     // }).id;
  //     // employee.id = maxId + 1;
  //     // employee.id = 0;

  //     // this.listEmployees.push(employee);
  //     return this.httpClient
  //       .post<Employee>("http://localhost:3000/employees", employee, {
  //         headers: new HttpHeaders({
  //           "Content-Type": "application/json",
  //         }),
  //       })
  //       .pipe(catchError(this.handleError));
  //   } else {
  //     const foundIndex = this.listEmployee.findIndex(
  //       (e) => e.id === employee.id
  //     );

  //     this.listEmployee[foundIndex] = employee;
  //   }
  // }
  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(this.handleError));
  }
  getEmployees(id: number): Observable<Employee> {
    return this.httpClient
      .get<Employee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // deleteEmployee(id: number) {
  //   const i = this.listEmployee.findIndex((e) => e.id === id);
  //   if (i !== -1) {
  //     this.listEmployee.splice(i, 1);
  //   }
  // }
}
