import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
  selector: "[appConfirmPasswordEqual]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordValidator,
      multi: true,
    },
  ],
})
export class ConfirmPasswordValidator implements Validator {
  validate(passwordGroup: AbstractControl): { [Key: string]: any } | null {
    const passwordField = passwordGroup.get("password");
    const confirmPasswordField = passwordGroup.get("confirmPassword");
    if (
      passwordField &&
      confirmPasswordField &&
      passwordField.value !== confirmPasswordField.value
    ) {
      return { notEqual: true };
    }
    return null;
  }
}
