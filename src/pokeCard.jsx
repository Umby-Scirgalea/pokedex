import axios from "axios";
import { useEffect, useState } from "react";

import './pokeCardSmall.css'
import './pokeCardExpanded.css'
import './types.css'
import './loaders.css'
import classNames from "classnames";

import Cry from "./cry";

const PokeCard = ({ pokemon, pokemonSpecies, theme, sameName=false }) => {


    // IsMounted for animation
    const [isMounted, setIsMounted] = useState(false)

    // IsExpanded Pokemon Card
    const [isExpaned, setIsExpanded] = useState(false)


    // Mobile Fix
    const [isMobile, setIsMobile] = useState(false)

    // Shiny
    const [shinyBool, setShinyBool] = useState(false)

    // Sprites
    const [frontSprite, setFrontSprite] = useState('')
    const [backSprite, setBackSprite] = useState('')

    //  Big Pokecard Sprite
    const [spriteBool, setSpriteBool] = useState(false);
    const [bigPokecardSprite, setBigPokecardSprite] = useState('')


    // Mobile Check
    useEffect(() => {
        const checkIsMobile = window.innerWidth <= 767;
        setIsMobile(checkIsMobile)
    }, [])


    // Card fullscreen

    const setBodyOverflow = (val) => {
        document.body.style.overflow = val;
    }

    const showCard = () => {
        setIsExpanded(true)
        setBodyOverflow('hidden')
    }

    const hideCard = () => {
        setIsExpanded(false)
        setShinyBool(false)
        setSpriteBool(false)
        setBodyOverflow('')
        
    }

    // On render

    useEffect(() => {
        setFrontSprite(pokemon.sprites.front_default)
        setBackSprite(pokemon.sprites.back_default)
        setBigPokecardSprite(pokemon.sprites.front_default)
        setIsMounted(true);
        setIsExpanded(false);
    }, []);

    // Big Pokecard Sprite
    useEffect(() => {
        setBigPokecardSprite(frontSprite)

    }, [frontSprite, backSprite])

    // shiny
    useEffect(() => {
        spriteBool ? setSpriteBool(false) : null;
        if (shinyBool) {
            setFrontSprite(pokemon.sprites.front_shiny)
            setBackSprite(pokemon.sprites.back_shiny)
        } else {
            setFrontSprite(pokemon.sprites.front_default)
            setBackSprite(pokemon.sprites.back_default)
        }
    }, [shinyBool])

    // back Sprite
    useEffect(() => {
        if (spriteBool) {
            setBigPokecardSprite(backSprite);
        }
        else {
            setBigPokecardSprite(frontSprite)
        }
    }, [spriteBool])


    if (pokemon) {
        const { id, name, types, weight, height, sprites, cries } = pokemon
        const {is_legendary} = pokemonSpecies;

        const cry = cries.latest;

        const description = pokemonSpecies.flavor_text_entries.find(e => e.language.name === 'en').flavor_text;
        const generation = pokemonSpecies.generation.name.slice(11)
        const subtitle = pokemonSpecies.genera.find(e => e.language.name === 'en').genus;

        // Shiny sprites only for validation
        const frontSpriteShiny = sprites.front_shiny;
        const backSpriteShiny = sprites.back_shiny;


        // Sprite Changer
        const spriteChanger =() => {
            setSpriteBool(prevState => !prevState)
        }

        const setShiny = () => {
            setShinyBool(prevState => !prevState)
        }

        return (
            <>
                {/* Small Pokecard */}
                {!isExpaned &&
                    <div className={classNames("pokeCardSmall", `${types[0].type.name}`)}
                        style={sameName ? {cursor: 'not-allowed'} : null}
                        onClick={!isExpaned && !sameName ? () => { showCard() } : undefined}>
                        <h6 className={classNames("id", `${types[0].type.name}`)}>{id}</h6>
                        {isMounted ? <img src={frontSprite} alt="sprite" /> : <div style={{padding: '20% 0'}}><span className="loaderImg"></span></div>}
                        <h1 className="name" style={name.length >= 9 ? { fontSize: '0.85em' } : { fontSize: '1.2em' }}>{name}</h1>
                    </div>}

                {/* Expanded Pokecard */}
                {isExpaned &&
                    <div className={classNames("pokeCardExpanded")}>
                        <div className={classNames("upperCard")}>
                            <button className={classNames("hideButton")} onClick={hideCard}><i className="fa fa-arrow-left"></i></button>
                            <p className="gen">{generation} gen</p>
                            <h6 className="id">id: {id}</h6>
                        </div>
                        <div className={classNames("middleCard")}>
                            <div className="middleCardLeft">
                                {frontSprite ? <img onClick={backSprite ? spriteChanger : null} src={bigPokecardSprite} alt="sprite" style={!backSprite ? { cursor: 'not-allowed' } : null} /> :                                 <div style={{height: '100%',display : 'flex', alignItems: 'center', justifyContent:'center'}}><span className="loaderImg"></span></div>
                            }
                            </div>
                            <div className="middleCardRight">
                                <div className="name_subtitle">
                                    <h1>{name}</h1>
                                    <h4>The {subtitle}</h4>
                                    {is_legendary && <h3>Legendary</h3>}
                                </div>
                                <div className="types">
                                    {types.map((e, i) => <p key={`type${i}`} className={classNames(`${e.type.name}`, 'type')}>{e.type.name}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className={classNames("middleCardFunctions")}>
                            {frontSpriteShiny && backSpriteShiny && <button onClick={setShiny} className={classNames({ "shinyButton": !shinyBool, "normalButton": shinyBool })}>{!shinyBool && 'SHINY'}{shinyBool && 'NORMAL'}</button>}
                            {cry && <Cry cry={cry} theme={theme} />}
                        </div>
                        <div className={classNames("bottomCard")}>

                            <div className="bottomCardTop">
                                <p className="weight">Weight: <span>{weight} lb</span></p>
                                <p className="height">Height: <span>{height}"</span></p>
                            </div>
                            <div className="bottomCardBottom">
                                <p className="description">{description.replace(/\s+/g, ' ')}</p>
                            </div>
                        </div>
                    </div>}
            </>
        )
    }
}



export default PokeCard;