import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  SafeAreaView,
  Animated as RNAnimated,
} from 'react-native';
// import {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';

// import { PokemonContext } from '../context/PokemonContext';
import Center from '../Components/Center';
import Cover from '../Components/Cover';
import Header from '../Components/Header';
// import { pokemonApi } from '../Api/pokemonApi';
import usePokemonPaginated from '../Hooks/usePokemonPaginated';
import useEvolution from '../Hooks/useEvolutions';
import { getAllPokemons, getPokemonDetail, getPokemonEvolution } from '../Api/api';

const uriPokedexTitle =
'https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png';

const Home = (props) => {

// const { getAllPokemons, getPokemonDetail, pokemonList } = usePokemonPaginated();

//   const { pokemonList, getAllPokemons, setCoverStatus } = useContext(PokemonContext)

//   const dimensions = useWindowDimensions();

//   const translationCover = useSharedValue(0);
//   const turnOnScreen = useSharedValue(0);
//   const showTitlePokedex = useSharedValue(0);
//   const showPokemons = useRef(new RNAnimated.Value(0)).current

// const [isLoading, setIsLoading] = useState(true);
const [pokemonList, setPokemonList] = useState([]);
const [pokemonDetail, setPokemonDetail] = useState(null);
const [evolutionPokemon, setEvolutionPokemon] = useState([]);

const [renderDetailScreen, setRenderDetailScreen] = useState(false);

const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=20');

useEffect(() => {
  fetchPokemons();
}, [])

const fetchPokemons = async () => {
  const { next, newPokemonList } = await getAllPokemons(nextPageUrl.current);
  nextPageUrl.current = next;
  setPokemonList((prevPokemons) => [...prevPokemons, ...newPokemonList]);
}

const currentIndex = useRef(0);
const flatlistRef = useRef(null);
const currentPokemon = useRef(pokemonList[currentIndex.current + 1]);

//   const coverStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: translationCover.value}],
//     };
//   });

//   const screenOnStyle = useAnimatedStyle(() => {
//     return {
//       opacity: turnOnScreen.value,
//     };
//   });

//   const titleStyle = useAnimatedStyle(() => {
//     return {
//       opacity: showTitlePokedex.value,
//     };
//   });
  
//   const toggleCover = () => {
//     if (translationCover.value === 0) {
//       setCoverStatus(false);
//       translationCover.value = withTiming(
//         dimensions.width,
//         {duration: 500},
//         () => {
//           turnOnScreen.value = withTiming(1, {duration: 500}, () => {
//             showTitlePokedex.value = withTiming(1, {duration: 350}, () => {
//               showTitlePokedex.value = withTiming(0, {duration: 750});
//             });
//           });
//         },
//       );
//     } else {
//       setCoverStatus(true);
//       translationCover.value = withTiming(0, {duration: 500}, () => {
//         turnOnScreen.value = withTiming(0, {duration: 500}, () => {
//           showTitlePokedex.value = withTiming(0, {duration: 350}, () => {
//             showTitlePokedex.value = withTiming(1, {duration: 750});
//           });
//         });
//       });
//     }
//   };

//   const handleInitialRender = async () => {
//     turnOnScreen.value = withTiming(0, {duration: 250})
//     toggleCover();
//     setTimeout(() => {
//       RNAnimated.timing(
//         showPokemons,
//         {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true
//         },
//       ).start();
//     }, 1900);
//   }

  const getEvolutionData = (pokemonEvolutionChain) => { // MEJORAR usar un map
    let pokemonEvolution = [];
    const firstEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[0]);
    pokemonEvolution.push(firstEvolution);
    const secondEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[1]);
    pokemonEvolution.push(secondEvolution);
    const thirdEvolution = pokemonList.find((pokemon) => pokemon.name === pokemonEvolutionChain[2]);
    pokemonEvolution.push(thirdEvolution);
    return pokemonEvolution;
  }

  const scrollTo = () => {
    flatlistRef.current.scrollToIndex({index: currentIndex.current})
    currentPokemon.current = pokemonList[currentIndex.current + 1];
  }

  const onPressUp = () => {
    if (currentIndex.current === 0) return;
    currentIndex.current = currentIndex.current - 1
    scrollTo();
  }

  const onPressDown = () => {
    if (currentIndex.current === pokemonList.length - 1) return;
    currentIndex.current = currentIndex.current + 1
    scrollTo();
  }

  const onPressRight = async (pokemonId) => {
    const pokemonDetail = await getPokemonDetail(pokemonId);
    const pokemonEvolutionChain = await getPokemonEvolution(pokemonId);
    const pokemonEvolutionData = getEvolutionData(pokemonEvolutionChain);
    console.log(pokemonEvolutionData)
    setPokemonDetail(pokemonDetail);
    setRenderDetailScreen(true);
  }

  const onPressLeft = async () => {
    setRenderDetailScreen(false);
  }
  console.log('render Home')
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <Header />
        {/* <Cover
          // coverStyle={coverStyle}
          // handleInitialRender={handleInitialRender}
        /> */}
        <Center
          // screenOnStyle={screenOnStyle}
          // titleStyle={titleStyle}
          // showPokemonsStyle={showPokemons}
          pokemonList={pokemonList}
          getAllPokemons={fetchPokemons}
          flatlistRef={flatlistRef}
          uriPokedexTitle={uriPokedexTitle}
          onPressUp={onPressUp}
          onPressDown={onPressDown}
          onPressRight={onPressRight}
          onPressLeft={onPressLeft}
          currentPokemon={currentPokemon}
          renderDetailScreen={renderDetailScreen}
        />
      </SafeAreaView>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1
  },
});
