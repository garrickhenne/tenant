import { useState } from "react";

export const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const [results, setResults] = useState([]);

  const fetchSearchResults = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    setResults([newSearchQuery]);
  };

  return <div className="input-wrapper flex flex-col items-center space-y-16">
    <input
      className="pl-4 pr-20 w-3/4 text-left focus:outline-none bg-transparent border-solid border-2 border-white rounded-full h-16"
      placeholder="🔎 Search by name..."
      value={searchQuery}
      onChange={fetchSearchResults}
    />

    {searchQuery && <div className="w-3/4 max-h-72 text-left bg-transparent border-solid border-2 border-white rounded-full">
      {results.map((result, id) => {
        return <div onClick={() => console.log(result)} className="pl-4 pr-4 hover:bg-cyan-600 rounded-full" key={id}>{result}</div>;
      })}
    </div>}
  </div>;
};