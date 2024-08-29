import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess, loginFailure, logout } from './userSlice'; // Adjust the import path as needed

// Action Types
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

// Action Creators
export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

// Async Action Creator: Login User
export const loginUser = (phone, password) => {
  return async (dispatch) => {
    try {
      const existingUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      const user = existingUsers.find(
        (u) => u.phone === phone && u.password === password
      );

      if (user) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        
        // Dispatch success action
        dispatch(loginSuccess(user));
        return true; // Indicate successful login
      } else {
        dispatch(loginFailure('Incorrect phone number or password.'));
        return false; // Indicate failed login
      }
    } catch (error) {
      dispatch(loginFailure('There was an error logging in.'));
      return false; // Indicate failed login
    }
  };
};

// Async Action Creator: Logout User
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('currentUser');
      
      // Dispatch logout action
      dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
};
