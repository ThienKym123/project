import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Logo from '../assets/logo.png';

const FoodDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(item));
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.sname}> TAT </Text>
          <Text style={styles.restaurantName}> Restaurant</Text>
        </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity 
          style={[styles.addButton, isInCart && styles.disabledButton]} 
          onPress={handleAddToCart}
          disabled={isInCart}
        >
          <Text style={styles.addButtonText}>
            {isInCart ? 'Already in Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: '#FAF1E6',
    width: '100%',
    height: 120,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    position: 'relative',
  },
  logo: {
    width: 100,
    height: 60,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  sname: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: '900',
    color: '#CC3300',
    fontFamily: 'Clicker-Script',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#FF6B00',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodDetailScreen;