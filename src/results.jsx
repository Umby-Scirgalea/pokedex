import './results.css'

import classNames from 'classnames';

import PokeCard from './pokeCard';

const Results = ({ pokemons, theme, pokemonSpecies, loading }) => {

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    if (pokemons.length > 0) {
        return (
            <div className={classNames({ 'darkT': theme, 'lightT': !theme }, 'results')}>
                {pokemons.map((e, i) => {
                    return <PokeCard theme={theme} key={e.id} pokemon={e} pokemonSpecies={pokemonSpecies[i]} />;
                })}
                {pokemons.length >= 10 && 
                    <div className={classNames({ 'darkT': !theme, 'lightT': theme }, 'scrollButtons')}>
                        <button onClick={scrollToTop} className={classNames({ 'darkT': theme, 'lightT': !theme })}><i className='fa fa-arrow-up'></i></button>
                        <button onClick={scrollToBottom} className={classNames({ 'darkT': theme, 'lightT': !theme })}><i className='fa fa-arrow-down'></i></button>
                    </div>}
            </div>
        )
    } else if(loading) {
        return (
            <div className={classNames({ 'darkT': theme, 'lightT': !theme }, 'resultsEmpty')}>
                <div className='loader'></div>
            </div>
        )
    }else if(!loading && pokemons.length <= 0){
        return(
        <div className={classNames({ 'darkT': theme, 'lightT': !theme }, 'resultsEmpty')}>
                <p className='nothingFound'>Nothing found.</p>
        </div>
        )
    }
}


export default Results;