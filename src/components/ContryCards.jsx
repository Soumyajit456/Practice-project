import { useNavigate } from "react-router-dom";

function ContryCards({ country }) {
  const navigate = useNavigate()
  return (
    <div 
    onClick={()=>navigate(`/${encodeURIComponent(country.name.common)}`)}
    className="bg-white dark:bg-gray-700 rounded-md shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.01] transform h-[340px] flex flex-col cursor-pointer">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 text-slate-800 dark:text-slate-100 flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-2 truncate">{country.name.common}</h2>
        <div className="text-sm space-y-1">
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default ContryCards
