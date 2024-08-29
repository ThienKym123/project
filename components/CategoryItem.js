import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CategoryItem = ({ category, onPress }) => {
  // Mapping the image name to the actual require statement
  const imageSource = {
    pizza: require('../assets/pizza.png'),
    burger: require('../assets/burger.png'),
    pasta: require('../assets/spaghetti.png'),
    drink: require('../assets/soft-drink.png'),
    salad: require('../assets/salad.png')
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={imageSource[category.image]} style={styles.image} />
      <Text style={styles.name}>{category.name}></Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryItem;
