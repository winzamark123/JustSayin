import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

import Logo from "./components/Logo";
import LoginSignup from './pages/LoginSignup';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'OrelegaOne': require('./assets/fonts/OrelegaOne-Regular.ttf'),
      'Average': require('./assets/fonts/Average-Regular.ttf'),
      'AveriaSerifLibre': require('./assets/fonts/AveriaSerifLibre-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }


  return (
    <View style={styles.container}>
      {/* <Logo /> */}
      <LoginSignup />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
