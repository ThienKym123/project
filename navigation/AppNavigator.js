import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from '../redux/store';

// Import your screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodListScreen from '../screens/FoodListScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ChangePasswordScreen from '../screens/ChangePassword';
import FoodDetailScreen from '../screens/FoodDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
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
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="FoodList" component={FoodListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen 
      name="FoodDetail" 
      component={FoodDetailScreen} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const user = useSelector(state => state.user.currentUser);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        {user ? (
          <RootStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}