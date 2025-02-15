import classNames from "classnames";
import { useState, useEffect } from "react";


import './loaders.css'

const Search = ({src,loading,setText})=>{

    const [inputValue, setInputValue] = useState('');
  
    const handleSubmit = (e)=>{
        e.preventDefault()
        src(inputValue)
        setText(inputValue)
    }

    const clear =()=>{
        setInputValue('')
        handleSubmit()
    }

    const handleInput = (e)=>{
        setInputValue(e.target.value)
    }

    return(
        <form onSubmit={handleSubmit} 
            className="searchBar">
            <input onChange={handleInput} 
                    autoComplete="off"
                    value={inputValue} 
                    className="pokemonInput" 
                    type="text" 
                    name="search" 
                    id="search" />
            <button disabled={loading}  className={loading ? 'searchButtonDisabled' : null}><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
    )
}

export default Search;