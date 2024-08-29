import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import FoodItem from '../components/FoodItem';
import CategoryItem from '../components/CategoryItem';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';

const categories = require('../data/categories.json');
const foods = require('../data/foods.json');

const Tab = createBottomTabNavigator();

const FoodListContent = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { category } = route.params || {};

  // Filter foods based on category
  const filteredFoods = category
    ? foods.filter(food => food.category === category)
    : foods;

  const renderFoodItem = ({ item }) => (
    <FoodItem
      item={item}
      navigation={navigation}
    />
  );

  const renderCategoryItem = ({ item }) => (
    <CategoryItem
      category={item}
      onPress={() => navigation.navigate('FoodList', { category: item.name })}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      {/* Categories Section */}
      <Text style={styles.title}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Foods List */}
      <FlatList
        data={filteredFoods}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id.toString()}
      />

    </View>
  );
};

const FoodListScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'FoodList') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="FoodList" component={FoodListContent} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default FoodListScreen;