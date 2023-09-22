import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { CraeteEmployeeComponent } from "./craete-employee.component";

@Injectable()
export class CreateEmployeeCanDeactivateGuardService
  implements CanDeactivate<CraeteEmployeeComponent>
{
  constructor() {}

  canDeactivate(component: CraeteEmployeeComponent): boolean {
    if (component.createEmployeeForm.dirty) {
      return confirm("Are you sure you want to discard your changes?");
    }

    return true;
  }
}
