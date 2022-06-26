import React, { useEffect, useRef, useState } from 'react';
import { api } from '../Api/api';

const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const nextPageUrl = useRef(`${api}pokemon?limit=20`);

  const getAllPokemons = async () => {
    const resp = await fetch(nextPageUrl.current);
    const { next, results } = await resp.json();
    nextPageUrl.current = next;
    mapPokemonList(results)
  }

  const getPokemonDetail = async (pokemonId) => {
    const resp = await fetch(`${api}pokemon/${pokemonId}`);
    const data = await resp.json();
    setPokemonDetail(data);
    return data;
  }

  const mapPokemonList = (pokemonsToMap) => {
    const newPokemonList = pokemonsToMap.map((pokemon) => {
      const {
        name,
        url
      } = pokemon;
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, name, picture }
    })
    // setPokemonList(() => [{id: 'left-spacer-1'}, {id: 'left-spacer-2'}, {id: 'left-spacer-3'}, ...newPokemonList])
    setPokemonList((prevPokemons) => [...prevPokemons, ...newPokemonList]);
    // setIsLoading(false);
  }
  
  useEffect(() => {
    if (pokemonList.length === 0) {
      getAllPokemons();
    }
  }, [])

  console.log('render paginated')

  return {
    isLoading,
    pokemonList,
    pokemonDetail,
    getAllPokemons,
    getPokemonDetail
  }
}

export default usePokemonPaginated;