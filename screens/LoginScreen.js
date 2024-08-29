import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userAction'; // Adjust the import path as needed
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const success = await dispatch(loginUser(phone, password));
    if (success) {
      navigation.navigate('Main', { screen: 'MainTabs', params: { screen: 'Home' } });
    } else {
      Alert.alert('Error', 'Incorrect phone number or password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.restaurantName}>TAT</Text>
        <Text style={styles.restaurantSubName}>Restaurant</Text>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.loginTitle}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone:</Text>
        <View style={styles.phoneInputWrapper}>
          <Text style={styles.countryCode}>84+</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.phoneInput}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password:</Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleLogin}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  restaurantName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  restaurantSubName: {
    fontSize: 24,
    color: '#000',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'left',
    marginLeft: 20,
    color: '#EEA734',
    textDecorationLine: 'underline',
  },
});