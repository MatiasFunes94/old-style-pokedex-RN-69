import React from 'react';
import { View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
// import Animated from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// const Cover = ({ coverStyle, handleInitialRender }) => {
const Cover = () => {
  return (
    <>
      <View style={{height: 2, width, backgroundColor: '#000'}} />
      <View
        // style={[styles.coverContainer, coverStyle]}>
        style={[styles.coverContainer]}>
        {/* <TouchableOpacity style={styles.coverButtonToOpen} onPress={handleInitialRender} activeOpacity={0.5} /> */}
        <TouchableOpacity style={styles.coverButtonToOpen} activeOpacity={0.5} />
        <View style={styles.coverLineBotton} />
      </View>
    </>
  );
};

export default Cover;

const styles = StyleSheet.create({
  coverContainer: {
    position: 'absolute',
    backgroundColor: '#c8333c',
    height,
    width,
    top: 125,
    zIndex: 1,
    justifyContent: 'center',
  },
  coverButtonToOpen: {
    height: 40,
    width: 40,
    backgroundColor: 'orange',
    transform: [{rotate: '45deg'}],
    right: 20,
    bottom: 60,
  },
  coverLineBotton: {
    height: 20,
    width: 300,
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 2,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 200
  }
});