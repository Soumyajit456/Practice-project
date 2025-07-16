import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import ContryCards from './ContryCards';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredContries,setFilterContries] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputCountry,setInputCOuntry] = useState('')
  const [inputRegion,setInputRegion] = useState('')

  const countriesPerPage = 12;

  const fields = "name,population,flags,region,subregion,capital,tld,currencies,languages,borders";

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
        setError(null);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to fetch country data.");
      });
  }, []);

  const filterCountry = function(){
    const filterCountry = countries.filter((country)=>country.name.common.toLowerCase().includes(inputCountry.toLowerCase()))
    setFilterContries(filterCountry)
  }

  const filterByRegion = function(){
    const filterCountry = countries.filter((country)=>country.region.toLowerCase().includes(inputRegion.toLowerCase()))
    setFilterContries(filterCountry)
  }

  const handleCountryChange = (e)=>{
    setInputCOuntry(e.target.value)
  }

  const handleRegionChange = (e)=>{
    setInputRegion(e.target.value)
  }

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  console.log(filteredContries)
  console.log("Region value : ",inputRegion)

  console.log(countries[0])

  return (
    <div className='w-full min-h-screen transition-colors duration-300 ease-in-out bg-white text-slate-800 dark:bg-gray-800 dark:text-slate-100'>
      <SearchBar filterCountry={filterCountry} inputCountry={inputCountry} onChangeCountry={handleCountryChange} inputRegion={inputRegion} onChangeRegion={handleRegionChange} filterByRegion={filterByRegion}/>

      {loading && <div className="text-center p-6">Loading countries...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-10 ">
        {
            filteredContries.length > 0 ? (
              filteredContries.map((country,index)=><ContryCards key={index} country={country}/>)
            ) :
            (
              currentCountries.map((country,index)=><ContryCards key={index} country={country}/>)
            )
        }
      </div>

      <div className="flex justify-center items-center gap-4 pb-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-slate-800 dark:text-white font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
