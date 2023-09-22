import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
  selector: "[appSelectValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SelectRequiredValidator,
      multi: true,
    },
  ],
})
export class SelectRequiredValidator implements Validator {
  @Input() appSelectValidator: string;
  validate(c: AbstractControl): { [key: string]: any } | null {
    return c.value === this.appSelectValidator
      ? { defaultSelected: true }
      : null;
  }
}
