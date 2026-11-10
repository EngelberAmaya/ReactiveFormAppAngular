import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of, throwError } from 'rxjs';
import { Region, RESTCountry } from '../interfaces/rest-countries';
import { CountryMapper } from '../mappers/country-mapper';
import { CountryInterface } from '../interfaces/country-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);

  private _regiones = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[]{
    return [...this._regiones];
  }

  getCountriesByRegion(region: Region): Observable<CountryInterface[]> {

    return this.http.get<RESTCountry>(`${environment.API_URL}?region=${region}&limit=56`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener los países con la región: ${region}`));
        })
      )
  }

  getCountryByAlphaCode(
    code: string,
    codeType: 'alpha_2' | 'alpha_3' = 'alpha_2',
  ): Observable<CountryInterface | null> {

    return this.http.get<RESTCountry>(`${environment.API_URL}/codes.${codeType}/${code}`,
      { headers: { 'Authorization': `Bearer ${environment.API_KEY}` } }
    )
      .pipe(
        map((restCountries) => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)[0] ?? null),
        catchError(error => {
          console.log('Error fetching', error);
          return throwError(() => new Error(`No se pudo obtener el país con ese código: ${code}`));
        })
      )
  }

  getCountryByCodeArray(countryCode: string[]): Observable<CountryInterface[]> {

    if (!countryCode || countryCode.length === 0) return of([]);

    const countriesRequests = countryCode.map((code) =>
      this.getCountryByAlphaCode(code, 'alpha_3')
    );

    return combineLatest(countriesRequests).pipe(
      map((countries) => countries.filter((country): country is CountryInterface => country !== null))
    );
  }
}
