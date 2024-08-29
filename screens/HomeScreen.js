import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

import Logo from '../assets/logo.png';
import SearchIcon from '../assets/SearchIcon.png';

const foods = require('../data/foods.json');

const hotOffers = [
  {
    id: 1,
    title: 'Pizza',
    subtitle: "Today's Hot Offer",
    rating: '4.8 (1k+ Ratings)',
    image: 'https://img.dominos.vn/cach-lam-banh-pizza-xuc-xich-4.jpg'
  },
  {
    id: 2,
    title: 'Burger',
    subtitle: "Hot Deal",
    rating: '4.7 (500+ Ratings)',
    image: 'https://chianui.vn/wp-content/uploads/2019/07/hamburger-xuc-xich-ga.jpg'
  },
  {
    id: 3,
    title: 'Pasta',
    subtitle: "Special Offer",
    rating: '4.6 (300+ Ratings)',
    image: 'https://img.dominos.vn/tim-hieu-cac-loai-pasta-0.jpg'
  },
  {
    id: 4,
    title: 'CocaCola',
    subtitle: "Popular drink",
    rating: '4.8 (700+ Ratings)',
    image: 'https://cdn.tgdd.vn/Products/Images/2443/88651/bhx/6-chai-nuoc-ngot-coca-cola-390ml-202407131703270656.jpg'
  }
];

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
    } else {
      const words = searchQuery.toLowerCase().split(' ');
      const results = foods.filter(food => 
        words.every(word => 
          food.name.toLowerCase().split(' ').some(foodWord => 
            foodWord.startsWith(word)
          )
        )
      );
      setSearchResults(results);
      setShowResults(true);
    }
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    searchInputRef.current.clear();
    searchInputRef.current.blur();
  };

  const handleSearchFocus = () => {
    setShowResults(searchQuery.trim() !== '');
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
    setShowResults(false);
  };

  const isInCart = (item) => cartItems.some(cartItem => cartItem.id === item.id);

  const handleAddToCart = (item) => {
    if (!isInCart(item)) {
      dispatch(addToCart(item));
      Alert.alert('Success', 'Item added to cart!');
    }
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity 
      style={styles.searchResultItem}
      onPress={() => {
        navigation.navigate('FoodDetail', { item });
        setShowResults(false);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.searchResultImage} />
      <Text style={styles.searchResultText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPopularFoodItem = ({ item }) => {
    const itemInCart = isInCart(item);

    return (
      <TouchableOpacity 
        style={[styles.popularFoodItem, itemInCart && styles.inCartItem]}
        onPress={() => navigation.navigate('FoodDetail', { item })}
      >
        <Image source={{ uri: item.image }} style={styles.popularFoodImage} />
        <View style={styles.popularFoodInfo}>
          <Text style={styles.popularFoodName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.popularFoodPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.addButton, itemInCart && styles.inCartButton]} 
          onPress={() => handleAddToCart(item)}
          disabled={itemInCart}
        >
          <Text style={styles.addButtonText}>{itemInCart ? '✓' : '+'}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  // Filter foods to ensure they are unique categories
  const uniqueCategories = [...new Set(foods.map(food => food.category))];
  const popularFoods = uniqueCategories.map(category =>
    foods.find(food => food.category === category)
  ).filter(Boolean);

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.sname}> TAT </Text>
          <Text style={styles.restaurantName}> Restaurant</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              ref={searchInputRef}
              placeholder="Find food, drink,..."
              placeholderTextColor="#878787"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleSearchFocus}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {showResults && searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={item => item.id.toString()}
            style={styles.searchResultsList}
          />
        )}

        {!showResults && (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hotSlider}>
              {hotOffers.map((offer) => (
                <View key={offer.id} style={styles.hotItem}>
                  <Image source={{ uri: offer.image }} style={styles.hotImage} />
                  <View style={styles.hotInfo}>
                    <Text style={styles.hotTitle}>{offer.title}</Text>
                    <Text style={styles.hotSubtitle}>{offer.subtitle}</Text>
                    <Text style={styles.hotRating}>⭐ {offer.rating}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.popularSection}>
              <Text style={styles.title}>Popular Foods</Text>
              <TouchableOpacity onPress={() => navigation.navigate('FoodList')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={popularFoods.slice(0, 4)}
              renderItem={renderPopularFoodItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.popularFoodRow}
            />
          </>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
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
  searchBarContainer: {
    paddingHorizontal: 40,
    marginVertical: -10, 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000'
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#999',
  },
  searchResultsList: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  searchResultText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  popularSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  viewAll: {
    color: '#007AFF',
  },
  hotSlider: {
    marginTop: 20,
    paddingLeft: 10,
  },
  hotItem: {
    marginRight: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  hotImage: {
    width: '100%',
    height: 120,
  },
  hotInfo: {
    padding: 10,
  },
  hotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hotSubtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  hotRating: {
    fontSize: 14,
    color: '#f39c12',
  },
  popularFoodRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  popularFoodItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 3,
  },
  inCartItem: {
    opacity: 0.7,
  },
  popularFoodImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  popularFoodInfo: {
    marginTop: 10,
  },
  popularFoodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularFoodPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#F4A850',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inCartButton: {
    backgroundColor: '#4CAF50',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;