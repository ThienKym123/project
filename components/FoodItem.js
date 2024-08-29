import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const FoodItem = ({ item, navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const handlePress = () => {
    if (!isInCart) {
      navigation.navigate('FoodDetail', { item });
    } else {
      Alert.alert('Info', 'This item is already in your cart.');
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, isInCart && styles.dimmed]}
      onPress={handlePress}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.addButton, isInCart && styles.disabledButton]} 
        onPress={handleAddToCart}
        disabled={isInCart}
      >
        <Text style={styles.addButtonText}>
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  dimmed: {
    opacity: 0.5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#F4A850',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FoodItem;