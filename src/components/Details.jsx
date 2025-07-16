import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CountryDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderNames, setBorderNames] = useState([]);

  console.log(country)

  useEffect(() => {
    const fields = "name,population,flags,region,subregion,capital,tld,currencies,languages,borders";
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => res.json())
      .then(data => {
        const countryData = Array.isArray(data) ? data[0] : data;
        setCountry(countryData);

        if (countryData.borders?.length) {
          fetch(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}&fields=name,cca3`)
            .then(res => res.json())
            .then(borders => setBorderNames(borders.map(c => c.name.common)));
        }
      });
  }, []);

  if (!country) return <div className="p-6 text-center text-white">Loading country details...</div>;

  const nativeName = Object.values(country.name?.nativeName || {})[0]?.common;
  const currencies = Object.values(country.currencies || {}).map(c => c.name).join(', ');
  const languages = Object.values(country.languages || {}).join(', ');

  return (
    <div className="min-h-screen px-8 py-10 bg-gray-100 dark:bg-gray-900 text-slate-900 dark:text-slate-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 px-5 py-2 rounded shadow bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        <img src={country.flags.png} alt="flag" className="w-full lg:w-1/3 rounded shadow" />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">{country.name.common}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div>
              <p><strong>Native Name:</strong> {nativeName}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Sub Region:</strong> {country.subregion}</p>
              <p><strong>Capital:</strong> {country.capital?.[0]}</p>
            </div>
            <div>
              <p><strong>Top Level Domain:</strong> {country.tld?.[0]}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Languages:</strong> {languages}</p>
            </div>
          </div>

          {borderNames.length > 0 && (
            <div className="mt-10">
              <p className="font-semibold mb-2">Border Countries:</p>
              <div className="flex flex-wrap gap-2">
                {borderNames.map((name, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1 bg-white dark:bg-gray-700 rounded shadow text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
