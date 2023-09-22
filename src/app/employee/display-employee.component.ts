import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Employee } from "../models/employee.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "./employee.service";

@Component({
  selector: "app-display-employee",
  templateUrl: "./display-employee.component.html",
  styleUrls: ["./display-employee.component.css"],
})
export class DisplayEmployeeComponent implements OnInit {
  // private _employeeId: number;
  // @Input()
  // set employeeId(val: Employee) {
  //   console.log(
  //     "Employee ID changed from" +
  //       JSON.stringify(this._employeeId) +
  //       "to " +
  //       JSON.stringify(val)
  //   );
  //   this._employeeId = val;
  // }
  // get employeeId(): Employee {
  //   return this.employeeId;
  // }

  // private _employee = Employee;
  // @Input()
  // set employee(val: Employee) {
  //   console.log(
  //     "Employee changed from" +
  //       JSON.stringify(this._employee) +
  //       " to " +
  //       JSON.stringify(val)
  //   );
  //   this._employee = val;
  // }
  // get employee(): Employee {
  //   return this._employee;
  // }
  private selectedEmployeeId: number;
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;

  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get("id");
  }
  // getNameAndGender(): string {
  //   return this.employee.name + " " + this.employee.gender;
  // }
  viewEmployeeDetails() {
    this._router.navigate([
      "/employee",
      this.employee.id,
      { queryParams: { searchTerm: this.searchTerm } },
    ]);
  }

  editEmployee() {
    this._router.navigate(["/edit", this.employee.id]);
  }
  // handleClick() {
  //   this.notify.emit(this.employee);
  // }

  // deleteEmployee() {
  //   this._employeeService.deleteEmployee(this.employee.id).subscribe(
  //     () => console.log(`Employee with Id =${this.employee.id} deleted`),
  //     (error) => console.log(error)
  //   );
  //   this.notifyDelete.emit(this.employee.id);
  // }
  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }
}
