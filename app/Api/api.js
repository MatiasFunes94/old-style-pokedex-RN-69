const api = 'https://pokeapi.co/api/v2/';

export const getAllPokemons = async (url) => {
  const resp = await fetch(url);
  const { next, results } = await resp.json();
  return { next, newPokemonList: normalizePokemonList(results)}
};

const normalizePokemonList = (pokemonsToMap) => {
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
  return newPokemonList;
}

export const getPokemonDetail = async (pokemonId) => {
  const resp = await fetch(`${api}pokemon/${pokemonId}`);
  return resp.json();
}

export const getPokemonEvolution = async (pokemonId) => {
  const { evolution_chain } = await getSpecies(pokemonId);
  const { chain } = await getEvolutionChain(evolution_chain);
  const pokemonEvolutionChain = await getPokemonNames(chain);
  return pokemonEvolutionChain;
}

const getSpecies = async (pokemonId) => {
  const resp = await fetch(`${api}pokemon-species/${pokemonId}/`)
  return resp.json();
}

const getEvolutionChain = async ({ url }) => {
  const resp = await fetch(url)
  return resp.json();
}

const getPokemonNames = (chain) => {
  let pokemonEvolutionChain = [];
  pokemonEvolutionChain.push(chain?.species.name)
  pokemonEvolutionChain.push(chain?.evolves_to[0]?.species.name)
  pokemonEvolutionChain.push(chain?.evolves_to[0]?.evolves_to[0]?.species.name)
  return pokemonEvolutionChain;
}