export interface RESTCountry {
  data: Data;
}

export interface Data {
  objects: Object[];
  meta:    Meta;
}

export interface Meta {
  total:      number;
  count:      number;
  limit:      number;
  offset:     number;
  more:       boolean;
  request_id: string;
  duration:   number;
}

export interface Object {
  names:           Names;
  codes:           Codes;
  capitals:        Capital[];
  flag:            Flag;
  region:          Region;
  subregion:       Subregion;
  area:            Area;
  assets:          any[];
  borders:         string[];
  calling_codes:   string[];
  cars:            Cars;
  classification:  Classification;
  continents:      Subregion[];
  coordinates:     Coordinates;
  currencies:      Currency[];
  date:            DateClass;
  demonyms:        Demonyms;
  descriptions:    Descriptions;
  economy:         Economy;
  government_type: string;
  landlocked:      boolean;
  languages:       Language[];
  leaders:         Leader[];
  links:           Links;
  memberships:     { [key: string]: boolean };
  number_format:   NumberFormat;
  parent:          Parent;
  population:      number;
  postal_code:     PostalCode;
  timezones:       string[];
  tlds:            string[];
  units:           Units;
  uuid:            string;
  _match:          Match[];
  _meta:           MetaClass;
}

export interface Match {
  path:  Path;
  value: Region;
}

export enum Path {
  Region = "region",
}

export enum Region {
  Americas = "Americas",
}

export interface MetaClass {
  lastUpdatedTimestamp: number;
}

export interface Area {
  kilometers: number;
  miles:      number;
}

export interface Capital {
  attributes:  Attributes;
  coordinates: Coordinates;
  name:        string;
}

export interface Attributes {
  administrative: boolean;
  constitutional: boolean;
  executive:      boolean;
  judicial:       boolean;
  legislative:    boolean;
  primary:        boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Cars {
  driving_side: DrivingSide;
  signs:        string[];
}

export enum DrivingSide {
  Left = "left",
  Right = "right",
}

export interface Classification {
  dependency:      boolean;
  dependency_type: string;
  disputed:        boolean;
  iso_status:      ISOStatus;
  sovereign:       boolean;
  un_member:       boolean;
  un_observer:     boolean;
}

export enum ISOStatus {
  Official = "official",
}

export interface Codes {
  alpha_2: string;
  alpha_3: string;
  ccn3:    string;
  cioc:    string;
  fifa:    string;
  fips:    string;
  gec:     string;
}

export enum Subregion {
  Caribbean = "Caribbean",
  CentralAmerica = "Central America",
  NorthAmerica = "North America",
  SouthAmerica = "South America",
}

export interface Currency {
  code:   string;
  name:   string;
  symbol: string;
}

export interface DateClass {
  academic_year_start: AcademicYearStart;
  fiscal_year_start:   FiscalYearStart;
  start_of_week:       StartOfWeek;
}

export interface AcademicYearStart {
  day:   number;
  month: number;
}

export interface FiscalYearStart {
  corporate:  Corporate;
  government: AcademicYearStart;
  personal:   AcademicYearStart;
}

export interface Corporate {
  basis: Basis;
  day:   number;
  month: number;
}

export enum Basis {
  Convention = "convention",
  Default = "default",
}

export enum StartOfWeek {
  Monday = "monday",
  Sunday = "sunday",
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Descriptions {
  long:  string;
  short: string;
}

export interface Economy {
  gini_coefficient: { [key: string]: number };
}

export interface Flag {
  colors:      Colors;
  description: string;
  emoji:       string;
  html_entity: string;
  unicode:     string;
  url_png:     string;
  url_svg:     string;
}

export interface Colors {
  dominant:  string;
  palette:   Palette[];
  prominent: string;
  swatches:  Swatches;
}

export interface Palette {
  hex:        string;
  proportion: number;
}

export interface Swatches {
  dark_muted:    null | string;
  dark_vibrant:  null | string;
  light_muted:   null | string;
  light_vibrant: null | string;
  muted:         string;
  vibrant:       string;
}

export interface Language {
  bcp47:       string;
  iso639_1:    string;
  iso639_2b:   string;
  iso639_2t:   string;
  iso639_3:    string;
  name:        string;
  native_name: string;
}

export interface Leader {
  message: string;
  sample:  string;
}

export interface Links {
  google_maps:      string;
  official:         string;
  open_street_maps: string;
  wikipedia:        string;
}

export interface Names {
  alternates:   string[];
  common:       string;
  native:       { [key: string]: Native };
  official:     string;
  translations: { [key: string]: Native };
}

export interface Native {
  common:   string;
  official: string;
}

export interface NumberFormat {
  decimal_separator:   Separator;
  thousands_separator: Separator;
}

export enum Separator {
  Empty = ".",
  Separator = ",",
}

export interface Parent {
  alpha_2: Alpha2;
  alpha_3: Alpha3;
}

export enum Alpha2 {
  Empty = "",
  Fr = "FR",
  GB = "GB",
  Nl = "NL",
}

export enum Alpha3 {
  Empty = "",
  Fra = "FRA",
  Gbr = "GBR",
  Nld = "NLD",
}

export interface PostalCode {
  format: string;
  regex:  string;
}

export interface Units {
  measurement_system: MeasurementSystem;
  temperature_scale:  TemperatureScale;
}

export enum MeasurementSystem {
  Metric = "metric",
}

export enum TemperatureScale {
  Celsius = "Celsius",
  Fahrenheit = "Fahrenheit",
}
