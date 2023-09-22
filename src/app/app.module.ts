import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ListEmployeeComponent } from "./employee/list-employee.component";
import { CraeteEmployeeComponent } from "./employee/craete-employee.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SelectRequiredValidator } from "./shared/select-required-validator.directive";
import { ConfirmPasswordValidator } from "./shared/confirm-password-validator.directive";
import { EmployeeService } from "./employee/employee.service";
import { DisplayEmployeeComponent } from "./employee/display-employee.component";
import { CreateEmployeeCanDeactivateGuardService } from "./employee/create-employee-can-deactive.service";
import { EmployeeDetailsComponent } from "./employee/employee-details.component";
import { CreateEmployeeFilterPipe } from "./employee/create-employee-filter.pipe";
import { EmployeeListResolver } from "./employee/employee-list-resolver.sevice";
import { PageNotFoundComponent } from "./page-not-found.component";
import { EmployeeDetailsGuardService } from "./employee/employee-details-guard.service";
import { AccordionComponent } from "./shared/accordion.component";
import { HttpClientModule } from "@angular/common/http";

const appRoute: Routes = [
  {
    path: "list",
    component: ListEmployeeComponent,
    resolve: { employeeList: EmployeeListResolver },
  },
  {
    path: "edit/:id",
    component: CraeteEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService],
  },
  {
    path: "employee/:id",
    component: EmployeeDetailsComponent,
    canActivate: [EmployeeDetailsGuardService],
  },
  { path: "", redirectTo: "/list", pathMatch: "full" },
  { path: "notfound", component: PageNotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CraeteEmployeeComponent,
    SelectRequiredValidator,
    ConfirmPasswordValidator,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    CreateEmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    // BsDatepickerModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
  ],
  providers: [
    EmployeeService,
    CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolver,
    EmployeeDetailsGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
