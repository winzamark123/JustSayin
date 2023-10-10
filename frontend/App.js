import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Logo from "./components/Logo";
import LoginSignup  from './pages/LoginSignup';

export default function App() {
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
