import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Department } from "../models/department.models";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-craete-employee",
  templateUrl: "./craete-employee.component.html",
  styleUrls: ["./craete-employee.component.css"],
})
export class CraeteEmployeeComponent implements OnInit {
  @ViewChild("employeeForm") public createEmployeeForm: NgForm;
  previewPhoto = false;
  cardTitle: string;
  employee: Employee;
  // = {
  //   id: null,
  //   name: null,
  //   gender: null,
  //   email: "",
  //   phoneNumber: null,
  //   contactPreference: null,
  //   dateOfBirth: null,
  //   department: "select",
  //   isActive: null,
  //   image: null,
  //   // password: null,
  //   // confirmPassword: null,
  // };
  // fullName:string="";
  // email:string="";
  // contactPreference:string="";
  // gender:string="";

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  departments: Department[] = [
    { id: 1, name: "Help Tesk" },
    { id: 2, name: "HR" },
    { id: 3, name: "IT" },
    { id: 4, name: "Admin" },
    { id: 5, name: "Payroll" },
  ];
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((parameter) => {
      const id = +parameter.get("id");
      this.getEmployee(id);
    });
  }

  // private getEmployee(id: number) {
  //   if (id === 0) {
  //     this.employee = {
  //       id: null,
  //       name: null,
  //       gender: null,
  //       email: "",
  //       phoneNumber: null,
  //       contactPreference: null,
  //       dateOfBirth: null,
  //       department: "select",
  //       isActive: null,
  //       image: null,
  //     };
  //     this.createEmployeeForm.reset();
  //     this.cardTitle = "Create Employee";
  //   } else {
  //     this.employee = Object.assign({}, this._employeeService.getEmployees(id));
  //     this.cardTitle = "Edit Employee";
  //   }
  // }
  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: "",
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: "select",
        isActive: null,
        image: null,
      };
      this.createEmployeeForm.reset();
      this.cardTitle = "Create Employee";
    } else {
      this._employeeService.getEmployees(id).subscribe(
        (employee) => {
          this.employee = employee;
        },
        (err: any) => console.log(err)
      );
      this.cardTitle = "Edit Employee";
    }
  }
  // saveEmployee(): void {
  //   // const newEmployee: Employee = Object.assign({}, this.employee);
  //   return this._employeeService.save(this.employee).subscribe(
  //     (data: Employee) => {
  //       console.log(data);
  //       this.createEmployeeForm.reset();
  //       this._router.navigate(["list"]);
  //     },
  //     (error: any) => console.log(error)
  //   );
  // }
  // saveEmployee(empForm: NgForm): void {
  //   this._employeeService.save(this.employee).subscribe(
  //     (data: Employee) => {
  //       console.log(data);
  //       this._router.navigate(["list"]);
  //       // empForm.reset();
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }
  saveEmployee(empForm: NgForm): void {
    if (this.employee.id == null) {
      console.log(this.employee);
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          // empForm.reset();
          this._router.navigate(["list"]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          // empForm.reset();
          this._router.navigate(["list"]);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
