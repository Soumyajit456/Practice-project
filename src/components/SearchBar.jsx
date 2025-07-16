import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({filterCountry,inputCountry,onChangeCountry,onChangeRegion,inputRegion,filterByRegion}) {


  useEffect(()=>{
    filterCountry()
  },[inputCountry])

  useEffect(()=>{
    filterByRegion()
  },[inputRegion])

  return (
    <div className="transition-colors duration-300 ease-in-out flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-8 py-4 shadow-md bg-white text-slate-800 dark:bg-gray-800 dark:text-slate-100">
      
      <div className="relative w-full md:w-1/2">
        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
          <FaSearch />
        </span>
        <input
          type="text"
          value={inputCountry}
          onChange={onChangeCountry}
          placeholder="Search for countries"
          className="w-full pl-10 pr-4 py-2 rounded-md bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-300 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      <div className="w-full md:w-auto">
        <select 
        value={inputRegion}
        onChange={onChangeRegion}
        className="w-full md:w-52 px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
