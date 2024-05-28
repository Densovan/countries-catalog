import React, { useState } from 'react';
import useFetchCountries from '../hooks/useFetchCountries';
import { Country } from '../types';
import CountryModal from './CountryModal';
import Pagination from './Pagination';
import '../assets/css/styles.css';
import MoonLoader from 'react-spinners/MoonLoader';

const CountryCatalog: React.FC = () => {
  const TABLE_HEAD = [
    'No',
    'Flag',
    'Country Name',
    '2 Char Code',
    '3 Char Code',
    'Native Name',
    'Alternative Names',
    'Calling Codes',
    'Actions',
  ];

  const { countries, loading, error } = useFetchCountries();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'all' | 'asc' | 'desc'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const itemsPerPage = 25;

  const filteredCountries = countries.filter((country) =>
    country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.official.localeCompare(b.name.official);
    } else if (sortOrder === 'desc') {
      return b.name.official.localeCompare(a.name.official);
    } else {
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCountries.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'all' | 'asc' | 'desc');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  if (loading)
    return (
      <div className="flex justify-center mt-16">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div>
      <section className="mb-5 flex justify-between items-center flex-wrap ">
        <form className="w-full sm:w-2/4 md:w-2/5 flex items-center rounded-md text-dark-gray ">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <label htmlFor="country">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </label>
            </div>
            <input
              type="text"
              placeholder="Search by country name"
              value={searchTerm}
              onChange={handleSearch}
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>

        <div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="all">All</option>
            <option value="asc"> Ascending</option>
            <option value="desc"> Descending</option>
          </select>
        </div>
      </section>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="px-6 py-3 0 text-left leading-4">
                <p
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((country, index) => (
            <tr key={index}>
              <td>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {indexOfFirstItem + index + 1}
                </span>
              </td>
              <td>
                <img
                  src={country.flags.png}
                  alt={country.name.official}
                  width="50"
                />
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleCountryClick(country)}
              >
                {country.name.official}
              </td>
              <td>{country.cca2}</td>
              <td>{country.cca3}</td>
              <td>
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)
                      .map((name) => name.official)
                      .join(', ')
                  : 'N/A'}
              </td>
              <td>{country.altSpellings.join(', ')}</td>
              <td>
                {country.idd.root}
                {country.idd.suffixes
                  ? Object.values(country.idd.suffixes)
                      .map((name) => name)
                      .join(', ')
                      .slice(0, 10)
                  : 'N/A'}
              </td>
              <td className="text-center">
                <span
                  onClick={() => handleCountryClick(country)}
                  className="cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded "
                >
                  View
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredCountries.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {selectedCountry && (
        <CountryModal country={selectedCountry} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CountryCatalog;
