import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../models/employee.model";

@Pipe({
  name: "employeeFilter",
  pure: false,
})
export class CreateEmployeeFilterPipe implements PipeTransform {
  private counter = 0;
  transform(employees: Employee[], searchTerm: string): Employee[] {
    this.counter++;
    console.log("Filter pipe count", this.counter);
    if (!employees || !searchTerm) {
      return employees;
    }
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
