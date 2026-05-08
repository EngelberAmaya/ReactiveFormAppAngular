import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css',
})
export class SwitchesPage {

  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true],
    termsAndConditions: [false, [Validators.requiredTrue]],
  });

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
