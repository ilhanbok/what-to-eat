import React from 'react';

//const searchTerm = useRef(null);
const SearchBar = ({ searchTerm, searchTextChange, searchByValue }) => {
  return (
    <div className="search-bar" >
      <input className="search-box" id='textTerm'
        type="text"
        /*value={searchText}*/
        /*onKeyPress={searchTextChange}
        onChange={searchTextChange}*/
          //ref = {searchTerm}
        placeholder="Search restaurants by name, cuisines etc." />

      <button className="btn search-btn"
        onClick={searchByValue}> search </button>
    </div>
  );
};



export default SearchBar;
