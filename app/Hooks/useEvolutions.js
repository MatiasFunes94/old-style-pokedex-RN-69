import React, { useContext, useEffect, useState } from 'react';
import usePokemonPaginated from './usePokemonPaginated';
import { api } from '../Api/api';

const useEvolution = (id) => {

  const { pokemonList } = usePokemonPaginated();

  const [evolutionPokemon, setEvolutionPokemon] = useState([]);
  const [evolutionEvee, setEvolutionEvee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSpecies = async () => {
    const resp = await fetch(`${api}pokemon-species/${id}/`)
    const data = await resp.json();
    console.log(data)
    //getEvolutionChain(resp.data.evolution_chain);
  }

  const getEvolutionChain = async ({ url }) => {
    const resp = await pokemonApi.get(url)
    if (url === 'https://pokeapi.co/api/v2/evolution-chain/67/') {
      return getEveeEvolutions(resp.data.chain);
    }
    getPokemonNames(resp.data.chain)
  }

  const getEveeEvolutions = async (evolutionChain) => {
    let eveeEvolutionChain = [];
    eveeEvolutionChain.push(evolutionChain?.species.name)
    evolutionChain?.evolves_to.map((x) => eveeEvolutionChain.push(x.species.name))
    let eveeEvolutionsNamesAndPictures = [];
    Promise.all(eveeEvolutionChain.map(async (name) => {
      const eveeEvolutionDetailResp = await pokemonApi.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      eveeEvolutionsNamesAndPictures.push({ 
        name: eveeEvolutionDetailResp.data.name,
        id: eveeEvolutionDetailResp.data.id 
      })
      if (eveeEvolutionsNamesAndPictures.length === 9) {
        setEvolutionEvee(eveeEvolutionsNamesAndPictures)
      }
    }))
    setIsLoading(false)
  }

  const getPokemonNames = (evolutionChain) => {
    let pokemonEvolutionChain = [];
    pokemonEvolutionChain.push(evolutionChain?.species.name)
    pokemonEvolutionChain.push(evolutionChain?.evolves_to[0]?.species.name)
    pokemonEvolutionChain.push(evolutionChain?.evolves_to[0]?.evolves_to[0]?.species.name)
    getEvolutionData(pokemonEvolutionChain)
  }

  const getEvolutionData = (pokemonEvolutionChain) => {
    let pokemonEvolution = [];
    const firstEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[0]);
    pokemonEvolution.push(firstEvolution);
    const secondEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[1]);
    pokemonEvolution.push(secondEvolution);
    const thirdEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[2]);
    pokemonEvolution.push(thirdEvolution);
    setEvolutionPokemon(pokemonEvolution);
    setIsLoading(false)
  }

  useEffect(() => {
    getSpecies();
  }, [])
  
  return {
    evolutionPokemon,
    // evolutionEvee,
    isLoading,
  }
}

export default useEvolution;