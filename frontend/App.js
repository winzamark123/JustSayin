import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const Stack = createNativeStackNavigator();


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
    // <View style={styles.container}>
    //   {/* <Logo /> */}
    //   <LoginSignup />
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
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
