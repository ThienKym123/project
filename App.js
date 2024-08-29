import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { View, Text } from 'react-native'; // Add this import
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'Clicker-Script': require('./assets/ClickerScript-Regular.ttf'),
    // Add other fonts if needed
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </Provider>
  );
};

export default App;