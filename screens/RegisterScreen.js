import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userAction';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const accountFileUri = FileSystem.documentDirectory + 'account.json';

  const handleRegister = async () => {
    if (!name || !address || !phone || !password) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const fileInfo = await FileSystem.getInfoAsync(accountFileUri);
      let existingUsers = [];

      if (fileInfo.exists) {
        const fileContents = await FileSystem.readAsStringAsync(accountFileUri);
        existingUsers = JSON.parse(fileContents);
      }

      const isPhoneExist = existingUsers.some((user) => user.phone === phone);

      if (isPhoneExist) {
        Alert.alert('Error', 'Phone number already exists. Please use a different one.', [{ text: 'OK', onPress: () => setPhone('') }]);
        return;
      }

      const user = { name, address, phone, password };
      existingUsers.push(user);

      await FileSystem.writeAsStringAsync(accountFileUri, JSON.stringify(existingUsers));
      dispatch(setUser(user));

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');

    } catch (error) {
      console.error('Error saving registration information:', error);
      Alert.alert('Error', 'An error occurred while saving your registration information.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.restaurantName}>TAT</Text>
          <Text style={styles.restaurantSubName}>Restaurant</Text>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.registerTitle}>Register</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Address:</Text>
          <TextInput value={address} onChangeText={setAddress} style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone:</Text>
          <View style={styles.phoneInputWrapper}>
            <Text style={styles.countryCode}>84+</Text>
            <TextInput value={phone} onChangeText={setPhone} style={styles.phoneInput} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password:</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput value={password} onChangeText={setPassword} style={styles.passwordInput} secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleRegister}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Already have an account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  registerTitle: {
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
    textAlign: 'center',
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
});
