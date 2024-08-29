import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

// In WelcomeScreen.js
const handleGetStarted = () => {
  navigation.navigate('Auth', { screen: 'Login' });
};

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.restaurantName}>TAT Restaurant</Text>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subText}>
        It's a pleasure to meet you. We are excited that you're here so let's get started!
      </Text>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedText}>Get start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 437,
    height: 437,
    left: width / 2 - 437 / 2,
    top: -191,
    backgroundColor: '#F8B64C',
    opacity: 0.1,
    borderRadius: 437 / 2,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  restaurantName: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: 'Poppins',
    fontSize: 36,
    color: '#CC3300',
    marginTop: 20,
  },
  subText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  getStartedButton: {
    width: 200,
    height: 48,
    backgroundColor: '#EEA734',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedText: {
    fontFamily: 'Telex',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
