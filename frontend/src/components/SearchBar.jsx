import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import '../styling/scrollBar.css';

export const SearchBar = () => {
  const navigation = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const [results, setResults] = useState([]);

  const [isName, setIsName] = useState(true);

  const fetchSearchResults = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    console.log(results);
  };

  const searchLandlord = (params) => {

    axios.get('/api/search', {params})
      .then((response) => response.data)
      .then((results) => {
        setResults([...results]);
      });
  };
  
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const params = {};

    if (isName) {
      params.name = searchQuery;
    } else {
      params.postalCode = searchQuery;
    }

    searchLandlord(params);
  }, [searchQuery, isName]);

  return <div className="input-wrapper flex flex-col items-center space-y-16">
    
    <input
      className="pl-4 pr-20 w-3/4 text-left text-xl focus:outline-none bg-transparent border-solid border-2 border-white rounded-full h-16 text-slate-200"
      placeholder={isName ? "🔎 Search by name..." : "🔎 Search by postal code..."}
      value={searchQuery}
      onChange={fetchSearchResults}
    />

    {searchQuery && <div className="w-3/4 text-left bg-transparent border-solid border-2 border-white max-h-96 overflow-y-auto rounded-3xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-500 scrollbar-thumb-rounded-full">
      {results.map((result) => {
        return <div
          onClick={() => navigation(`/landlords/${result.landlord._id}`)}
          className="pl-4 pt-1 pb-1 pr-4 text-2xl hover:bg-cyan-600 rounded-full text-slate-200"
          key={result.landlord._id}>{`${result.landlord.firstName} ${result.landlord.lastName}`}
        </div>;
      })}
    </div>}

    <div>
      <button className="mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white text-slate-200" onClick={() => {setIsName(false)}}>Postal Code</button>
      <button className="mx-1 rounded-full font-medium bg-transparent border-solid border-2 border-white text-slate-200" onClick={() => {setIsName(true)}}>Name</button>
    </div>

  </div>;
};