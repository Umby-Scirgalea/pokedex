import { useEffect, useState, useRef } from 'react'
import axios, { all } from 'axios';
import classNames from 'classnames';


// CSS
import './global.css'

// Components
import Navbar from './navbar';
import Results from './results';
import Filters from './filters'


const App = () => {

    // Dark-Light theme
    const savedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(savedTheme !== null ? JSON.parse(savedTheme) : 1);


    // All Pokemon
    const [allPokemon,setAllPokemon] = useState([])
    const [allPokemonSpecies,setAllPokemonSpecies] = useState([])

    const allPokemonLength = 1025;

    // Pokemon list
    const [pokemons,setPokemons] = useState([])
    const [pokemonSpecies,setPokemonSpecies] = useState([])

    // Searchbar loading
    const [loading, setLoading] = useState(false)
    const abortControllerRef = useRef(null);

    // Sort Methods

    const sorting = (arr, sortMethod) => {
        if (sortMethod === 'idUp') {
            return arr.sort((a, b) => a.id - b.id);
        }
        if (sortMethod === 'idDown') {
            return arr.sort((a, b) => b.id - a.id);
        }
        if (sortMethod === 'nameUp') {
            return arr.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortMethod === 'nameDown') {
            return arr.sort((a, b) => b.name.localeCompare(a.name));
        }
        return arr;
    };

    const [sortingMethod,setSortingMethod] = useState('idUp')

    // Only Legendary
    const [onlyLegendary,setOnlyLegendary] = useState(false)

    const onlyLegendaryFilter = (arr)=>{
        return arr.filter(e => e.is_legendary)
    }

    const onlyLegendarySet = ()=>{
        setOnlyLegendary(prev => !prev)
    }

    // text
    const [text,setText] = useState('')

    // Fetch Pokemon 
    const searchPokemon = async(text)=>{


        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
        if(!text){
            setPokemons(allPokemon)
            setPokemonSpecies(allPokemonSpecies)
        }
      
          const controller = new AbortController();
          abortControllerRef.current = controller;
      
          setLoading(true);

        try{
            const filteredPokemon = allPokemon.results.filter(pkmn => new RegExp(`^${text}`, 'i').test(pkmn.name))
            const filteredPokemonSpecies = allPokemonSpecies.results.filter(pkmn => new RegExp(`^${text}`, 'i').test(pkmn.name))

            
            let pokemonArray = await Promise.all(
                filteredPokemon.map(async (element) => {
                    const res = await axios.get(element.url);
                    return res.data;
                })
            );

            let pokemonArraySpecies = await Promise.all(
                filteredPokemonSpecies.map(async (element) => {
                    const res = await axios.get(element.url);
                    return res.data;
                })
            );

            pokemonArray = sorting(pokemonArray,sortingMethod)
            pokemonArraySpecies = sorting(pokemonArraySpecies,sortingMethod)

            if(onlyLegendary){
                // console.log(pokemonArraySpecies[0].is_legendary)
                pokemonArraySpecies = onlyLegendaryFilter(pokemonArraySpecies)
                pokemonArray = pokemonArray.filter(a => pokemonArraySpecies.some(b => b.name === a.name))
            }

            setPokemons(pokemonArray)
            setPokemonSpecies(pokemonArraySpecies)
        }catch(e){
            console.log(e)
        }finally {
            setLoading(false);
        }

    }

    // Theme Changer
    const changeTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 0 ? 1 : 0;
            localStorage.setItem('theme', JSON.stringify(newTheme)); 
            return newTheme;
        });
    };

    // useEffect

    useEffect(()=>{
        const getAllPokemon = async()=>{
            try{
                const resOne = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${allPokemonLength}`)
                const resTwo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=${allPokemonLength}`)
                setAllPokemon(resOne.data)
                setAllPokemonSpecies(resTwo.data)
            }catch(e){
                console.log(e)
            }
        }
        getAllPokemon()
        
    },[])

    useEffect(() => {
        if (allPokemon.results && allPokemonSpecies.results) {
            searchPokemon('');
        }
    }, [allPokemon, allPokemonSpecies]);

    useEffect(()=>{
        document.body.className = theme ? 'darkT' : 'lightT';
    },[theme])

    useEffect(()=>{
        searchPokemon(text)
    },[sortingMethod,onlyLegendary])


    if(allPokemon.length != 0 && allPokemonSpecies.length != 0){ 
    return (
        <>
            <Navbar setText={setText} src={searchPokemon} loading={loading} theme={theme} changeTheme={changeTheme}/>
            <Filters onlyLegendary={onlyLegendary} onlyLegendarySet={onlyLegendarySet} sortingMethod={sortingMethod} setSort={setSortingMethod} theme={theme}/>
            <Results loading={loading} pokemons={pokemons} pokemonSpecies={pokemonSpecies} theme={theme}/>
        </>

    )}else{
        return(
            <div className={classNames('LoadingMainPage','darkT')}>
                <div className="loader"></div>
            </div>
        )
    }
}

export default App;