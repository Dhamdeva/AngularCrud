import { Component, OnInit } from "@angular/core";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list-employee",
  templateUrl: "./list-employee.component.html",
  styleUrls: ["./list-employee.component.css"],
})
export class ListEmployeeComponent implements OnInit {
  // employees: Employee[];
  // employeeToDisplay: Employee;
  // private arrayIndex = 1;
  error: string;

  // constructor(private _employeeService: EmployeeService) {}

  // ngOnInit() {
  //   this.employees = this._employeeService.getEmployee();
  //   this.employees = this._employeeService.getEmployee();
  //   this.employeeToDisplay = this.employees[0];
  // }
  // nextEmployee(): void {
  //   if (this.employeeToDisplay.id <= 2) {
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   } else {
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

  employees: Employee[];
  filteredEmployees: Employee[];
  private _searchTerm: string;
  // dataFromChild: Employee;
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  filterEmployees(searchString: string) {
    return this.employees.filter(
      (employee) =>
        employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    );
  }
  constructor(
    // private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    const resolvedData: Employee[] | string =
      this._route.snapshot.data["employeeList"];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this._route.snapshot.queryParamMap.has("searchTerm")) {
      this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm");
    } else {
      this.filteredEmployees = this.employees;
      console.log(this.filteredEmployees);
    }
  }

  ngOnInit() {
    // this._employeeService.getEmployee().subscribe((empList) => {
    //   this.employees = empList;
    //   if (this._route.snapshot.queryParamMap.has("searchTerm")) {
    //     this.searchTerm = this._route.snapshot.queryParamMap.get("searchTerm");
    //   } else {
    //     this.filteredEmployees = this.employees;
    //   }
    // });
    // this.filteredEmployees = this.employees;
  }

  changeEmployeeName() {
    this.employees[0].name = "Jordan";
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
    //   const newEmployeeArray: Employee[] = Object.assign([], this.employees);
    //   newEmployeeArray[0].name = "Jordan";
    //   this.employees = newEmployeeArray;
  }
  // onMouseMove() {}
  // onClick(employeeId: number) {
  //   this._router.navigate([
  //     "/employee",
  //     employeeId,
  //     { queryParams: { searchTerm: this.searchTerm, textParam: "textValue" } },
  //   ]);
  // }
  // handleNotify(eventData: Employee) {
  //   this.dataFromChild = eventData;
  // }
  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex((e) => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
