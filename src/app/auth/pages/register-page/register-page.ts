import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.pattern(FormUtils.namePattern),
      Validators.minLength(3),
      Validators.maxLength(15)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(FormUtils.emailPattern),
      Validators.minLength(6),
      Validators.maxLength(30)
    ]],
    username: ['', [
      Validators.required, Validators.minLength(6),
      Validators.pattern(FormUtils.notOnlySpacesPattern),
      Validators.maxLength(15)
    ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },{
    validators: [
      FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
