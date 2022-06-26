import React, {useRef} from 'react';
import {
  View,
  Image,
  Text,
  Animated as RNAnimated,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from 'react-native';
import Octicon from 'react-native-vector-icons/Octicons';

const { height, width } = Dimensions.get('window');

const HEIGHT_POKEMON = height * 0.08363;

const Center = ({ 
  uriPokedexTitle,
  flatlistRef,
  pokemonList,
  getAllPokemons,
  currentPokemon,
  onPressUp,
  onPressDown,
  onPressRight,
  onPressLeft,
  renderDetailScreen
 }) => {

  function renderItem({ item }) {

    return (
      <View //animated View
        key={item.id}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.containerPokemonsScreen}
          onPress={() => onPressRight(item.id)}>
          <Image source={{uri: item.picture}} style={{height: 70, width: 70}} />
          <View style={{marginLeft: 10}} />
          <View style={styles.containerPokemonNameId}>
            <Image
              source={require('../Assets/pokeball.png')}
              style={{height: 35, width: 35}}
            />
            <Text style={{color: '#000', fontSize: 18, marginLeft: 5}}>
              {item.id}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                marginLeft: 5,
                textTransform: 'uppercase',
              }}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <View style={styles.centerContainer}>
        <View style={styles.centerSquareExt}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.centerSmallGrayButtons} />
            <View style={{...styles.centerSmallGrayButtons, marginLeft: 10}} />
          </View>
          <View style={[styles.centerSquareInt]}>
            <View style={[styles.centerSquareInt2]}>
              {/* <Image
                source={{uri: uriPokedexTitle}}
                style={[
                  {height: 80, width: 250, position: 'absolute'},
                ]}
              /> */}
              {renderDetailScreen ? (
                null
              ) : (
                <FlatList
                ref={flatlistRef}
                data={pokemonList}
                keyExtractor={item => String(item.id)}
                renderItem={renderItem}
                onEndReached={getAllPokemons}
                onEndReachedThreshold={0.4}
                showsVerticalScrollIndicator={false}
              />
              )}
            </View>
          </View>
          <View style={styles.containerButtonRedAudio}>
            <View style={styles.centerButtonRed} />
            <View style={styles.centerContainerAudioOut}>
              <View style={styles.centerAudioOut} />
              <View style={styles.centerAudioOut} />
              <View style={styles.centerAudioOut} />
              <View style={styles.centerAudioOut} />
            </View>
          </View>
        </View>
      </View>
      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <View style={{justifyContent: 'space-between', height: 180}}>
          <View style={styles.footerContainerButtonsInput}>
            <View style={styles.footerBlueButton} />
            <View
              style={{
                ...styles.footerSquashButtons,
                backgroundColor: 'green',
                marginLeft: 30,
              }}
            />
            <View
              style={{
                ...styles.footerSquashButtons,
                backgroundColor: 'orange',
                marginLeft: 20,
              }}
            />
          </View>
          <View>
            <TextInput style={styles.footerInput} />
          </View>
        </View>
        <View style={styles.footerContainerRows}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              height: 40,
              width: 40,
              backgroundColor: '#000',
              alignSelf: 'center',
            }}
            onPress={onPressUp}>
            <Octicon
              name={'arrow-up'}
              size={25}
              color={'#fff'}
              style={{alignSelf: 'center', paddingTop: 10}}
            />
          </TouchableOpacity>
          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: '#000',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{justifyContent: 'center'}}
              onPress={onPressLeft}>
              <Octicon
                name={'arrow-left'}
                size={25}
                color={'#fff'}
                style={{alignSelf: 'center', paddingLeft: 10}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{justifyContent: 'center'}}
              onPress={() => onPressRight(currentPokemon?.current?.id || pokemonList[1].id)}>
              <Octicon
                name={'arrow-right'}
                size={25}
                color={'#fff'}
                style={{alignSelf: 'center', paddingRight: 10}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              height: 40,
              width: 40,
              backgroundColor: '#000',
              alignSelf: 'center',
            }}
            onPress={onPressDown}>
            <Octicon
              name={'arrow-down'}
              size={25}
              color={'#fff'}
              style={{alignSelf: 'center', paddingTop: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Center;

const styles = StyleSheet.create({
  centerContainer: {
    flex: 0.65,
    width,
    backgroundColor: '#c8333c',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  centerSquareExt: {
    flex: 0.9,
    // height: 420,
    width: 350,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingTop: 10
  },
  centerSquareInt: {
    flex: 0.95,
    // height: 335,
    width: 300,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  centerSquareInt2: {
    // height: 340,
    flex: 1,
    width: 300,
    backgroundColor: '#72bacc',
    borderRadius: 20,
    borderColor: '#000',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSmallGrayButtons: {
    height: 12,
    width: 12,
    borderRadius: 20,
    backgroundColor: 'gray',
    bottom: 10,
  },
  containerPokemonsScreen: {
    // flexWrap: 'wrap',
    // height: height * 0.0838,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerPokemonNameId: {
    backgroundColor: '#eae0a8',
    width: width * 0.5,
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  containerButtonRedAudio: {
    height: 40,
    width: 300,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerButtonRed: {
    height: 30,
    width: 30,
    backgroundColor: '#c8333c',
    borderRadius: 30,
    alignSelf: 'flex-end'
  },
  centerContainerAudioOut: {
    height: 35,
    width: 40,
    justifyContent: 'space-around',
    alignSelf: 'flex-end'
  },
  centerAudioOut: {
    height: 2,
    width: 35,
    backgroundColor: '#000',
  },
  footerContainer: {
    flex: 0.2,
    // height: 200,
    width,
    backgroundColor: '#c8333c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
  },
  footerContainerButtonsInput: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
  },
  footerBlueButton: {
    backgroundColor: '#1a1ae0',
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  footerSquashButtons: {
    height: 10,
    width: 50,
    borderRadius: 10,
  },
  footerInput: {
    backgroundColor: '#efe869',
    width: 230,
    borderRadius: 10,
    bottom: 30,
  },
  footerContainerRows: {
    flex: 0.8,
    height: 120,
    justifyContent: 'flex-end',
  },
});
