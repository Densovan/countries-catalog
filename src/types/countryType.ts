export interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  flags: { png: string };
  population: number;
  region: string;
  subregion: string;
  name: {
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: { root: string; suffixes: string[] };
  currencies: { [key: string]: Currency };
  languages: { [key: string]: string };
  borders: string[];
  capital: string[];
  timezones: string[];
  postalCode?: {
    format: string;
  };
}
