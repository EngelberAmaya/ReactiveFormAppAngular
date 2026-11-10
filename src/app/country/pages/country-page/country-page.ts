import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country-service';
import { catchError, filter, finalize, map, of, switchMap, tap } from 'rxjs';
import { CountryInterface } from '../../interfaces/country-interface';

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

  countriesByRegion = signal<CountryInterface[]>([]);
  bordersByCountry = signal<CountryInterface[]>([]);
  isLoadingCountries = signal(false);
  isLoadingBorders = signal(false);
  countriesError = signal<string | null>(null);
  borderError = signal<string | null>(null);

  myForm: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanup) => {

    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.bordersByCountry.set([]);
          this.countriesByRegion.set([]);
          this.countriesError.set(null);
          this.borderError.set(null);
        }),
        switchMap((region) => {
          if (!region) {
            this.isLoadingCountries.set(false);
            return of([]);
          }

          this.isLoadingCountries.set(true);
          return this.countryService.getCountriesByRegion(region).pipe(
            map((countries) =>
              [...countries].sort((a, b) => a.name.localeCompare(b.name))
            ),
            catchError(() => {
              this.countriesError.set('No se pudieron cargar los paises de la region');
              return of([]);
            }),
            finalize(() => this.isLoadingCountries.set(false)),
          );
        }),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
    }

  onCountryChanged(){
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.bordersByCountry.set([]);
          this.isLoadingBorders.set(false);
          this.borderError.set(null);
        }),
        filter((value) => value.length > 0),
        switchMap((alphaCode) => {
          this.isLoadingBorders.set(true);
          return this.countryService.getCountryByAlphaCode(alphaCode).pipe(
            switchMap((country) =>
              this.countryService.getCountryByCodeArray(country?.borders ?? [])
            ),
            map((countries) =>
              [...countries].sort((a, b) => a.name.localeCompare(b.name))
            ),
            catchError(() => {
              this.borderError.set('No se pudieron cargar las fronteras del pais');
              return of([]);
            }),
            finalize(() => this.isLoadingBorders.set(false)),
          );
        }),
      )
      .subscribe((borders) => {
        this.bordersByCountry.set(borders);
      });
  }
}
