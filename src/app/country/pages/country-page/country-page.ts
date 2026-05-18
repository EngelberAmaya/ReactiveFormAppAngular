import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/country-interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe ],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
})
export class CountryPage {

  formBuilder = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal<string[]>(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  bordersByCountry = signal<Country[]>([]);

  myForm: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanup) => {

    const regionSubscription = this.onRegionChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
    });
  });

  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')) ,
        tap(() => {
          this.bordersByCountry.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region ?? '')),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
    }
}
