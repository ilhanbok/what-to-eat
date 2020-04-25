import React from 'react';

import '../../css/style.css';

//const searchTerm = useRef(null);
const SearchBar = ({ searchTerm, searchTextChange, searchByValue }) => {
  return (
    <div className="search-bar" >
      <input className="search-box" id='textTerm'
        type="text" style={{padding:'0em 0em 0em 3%', fontSize:'0.95em'}}
        /*value={searchText}*/
        /*onKeyPress={searchTextChange}
        onChange={searchTextChange}*/
          //ref = {searchTerm}
        placeholder="Search restaurants by name and categories" />

      <button className="btn search-btn"
        onClick={searchByValue}> search </button>
    </div>
  );
};



export default SearchBar;
