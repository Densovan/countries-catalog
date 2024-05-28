import React from 'react';
import { Country } from '../types';

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  return (
    <div className="block fixed z-[100] left-0 top-0 w-[100%] h-[100%] overflow-auto bg-black bg-opacity-40">
      <div className="bg-white z-[100] p-[20px] w-[70%] m-15p mx-auto rounded-md">
        <span
          className="text-[#aaa] float-right text-[28px] font-bold hover:text-red-500 focus:text-red-500 hover:no-underline focus:no-underline hover:cursor-pointer focus:cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <section className="grid md:grid-cols-2 gap-12">
          <img src={country.flags.png} alt="" className="w-full shadow-md" />
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-2xl font-bold mb-3">{country.name.official}</h1>
            <div className="country-info text-sm leading-6">
              <p>
                <span className="font-semibold">Country Name:</span>{' '}
                {country.name.official}
              </p>
              <p>
                <span className="font-semibold">Native Name:</span>{' '}
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)
                      .map((name) => name.official)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Alternative Names:</span>{' '}
                {country.altSpellings.join(', ')}
              </p>
              <p>
                <span className="font-semibold">2 Char Code:</span>{' '}
                {country.cca2}
              </p>
              <p>
                <span className="font-semibold">3 Char Code:</span>{' '}
                {country.cca3}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {country.population}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{' '}
                {country.subregion}
              </p>

              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {country.capital ? country.capital.join(', ') : 'N/A'}
              </p>

              <p>
                <span className="font-semibold">Borders:</span>{' '}
                {country.borders ? country.borders.join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {country?.currencies
                  ? Object.values(country?.currencies)
                      .map(
                        (currency) => `${currency?.name} (${currency?.symbol})`
                      )
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">TimeZone:</span>{' '}
                {country.timezones ? country.timezones.join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Calling Code:</span>{' '}
                {country.idd.root}
                {country.idd.suffixes
                  ? Object.values(country.idd.suffixes)
                      .map((name) => name)
                      .join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CountryModal;
