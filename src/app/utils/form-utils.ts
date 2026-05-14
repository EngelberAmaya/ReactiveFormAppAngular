import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'email':
          return 'No es una dirección de email válida';

        case 'emailTaken':
          return 'El email ya está siendo usado por otro usuario';

        case 'minlength':
          return `Este campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;

        case 'pattern':

          const pattern = errors['pattern'].requiredPattern;

          const patternMessages: Record<string, string> = {
            [FormUtils.emailPattern]: `El email no tiene el formato correcto`,
            [FormUtils.namePattern]: `El campo debe tener un nombre y un apellido`,
            [`^${FormUtils.namePattern}$`]: `El campo debe tener un nombre y un apellido`,
            [FormUtils.notOnlySpacesPattern]: `El campo no puede contener espacios`,
          };

          if (pattern in patternMessages) {
            return patternMessages[pattern];
          }

          // Si no es un patrón manejado explícitamente, no mostramos mensaje genérico.
          return null;

        default:
          return `Error de validación no controlado ${key}`;
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

  static isFieldOneEqualFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordNotEqual: true };
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }

    return null;
  }
}
