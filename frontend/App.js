import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Logo from "./components/Logo";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello IOS Simulator!</Text>
      <StatusBar style="auto" />
      <Logo />
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
