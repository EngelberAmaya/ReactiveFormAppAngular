import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static getTextError(errors: ValidationErrors): string | null {

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
      }
    }
    return null;
  }

  static isInvalidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName]?.errors != null &&
      form.controls[fieldName]?.touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {

    if (!form.controls[fieldName].errors) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index]?.errors != null &&
      formArray.controls[index]?.touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {

    if (!formArray.controls[index].errors) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }
}
