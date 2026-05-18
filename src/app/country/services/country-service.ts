import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country-interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regiones = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[]{
    return [...this._regiones];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      catchError((error) => of([]))
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    if (!alphaCode) return of(null);
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url).pipe(
      catchError((error) => of(null))
    );
  }

  getCountryByCodeArray(countryCode: string[]): Observable<Country[]> {

    if (!countryCode || countryCode.length === 0) return of([]);

    const countriesRequests = countryCode.map((code) =>
      this.getCountryByAlphaCode(code)
    );

    return combineLatest(countriesRequests).pipe(
      map((countries) => countries.filter((country): country is Country => country !== null))
    );
  }
}
