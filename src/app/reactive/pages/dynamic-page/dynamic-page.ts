import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css',
})
export class DynamicPage {

  private formBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.formBuilder.array(
      [
        ['Mario Bros', Validators.required],
        ['Mortal Kombat', Validators.required],
      ],
      Validators.minLength(3)
    ),
  });

  get favoritesGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

}
