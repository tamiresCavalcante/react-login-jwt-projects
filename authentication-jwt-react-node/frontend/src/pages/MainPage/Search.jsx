import React, { useState } from "react";

const Search = ({ onClear, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleClear = () => {
        setQuery('');
        onSearch('');
    }
    
    return (
        <div className="search">
            <label htmlFor="query">Procurar: </label>
            <input 
                type="text" 
                name="query" 
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onClear}>Procurar</button>
            <button onClick={handleClear}>Limpar</button>
        </div>
    )
}

export default Search;