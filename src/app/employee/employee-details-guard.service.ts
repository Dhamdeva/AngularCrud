import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
  constructor(
    private _employeeService: EmployeeService,
    private _route: Router
  ) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   const employeeExist = !!this._employeeService.getEmployees(
  //     +route.paramMap.get("id")
  //   );
  //   if (employeeExist) {
  //     return true;
  //   } else {
  //     this._route.navigate(["notfound"]);
  //     return false;
  //   }
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._employeeService.getEmployees(+route.paramMap.get("id")).pipe(
      map((employee) => {
        const employeeExists = !!employee;

        if (employeeExists) {
          return true;
        } else {
          this._route.navigate(["notfound"]);
          return false;
        }
      }),
      catchError((err) => {
        console.log(err);
        return Observable.of(false);
      })
    );
  }
}
