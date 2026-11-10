import { CountryInterface } from "../interfaces/country-interface";
import { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry['data']['objects'][0]): CountryInterface | null {

    const cca2 = restCountry.codes?.alpha_2?.trim();

    if (!cca2) return null;

    const spanishName = restCountry.names?.translations?.['spa']?.common
      ?? restCountry.names?.common
      ?? 'No Spanish name';

     return {
      cca2,
      cca3: restCountry.codes?.alpha_3 ?? '',
      name: spanishName,
      borders: restCountry.borders || []
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RESTCountry): CountryInterface[] {
    return restCountry.data.objects
      .map((obj) => CountryMapper.mapRestCountryToCountry(obj))
      .filter((country): country is CountryInterface => country !== null);
  }

}
