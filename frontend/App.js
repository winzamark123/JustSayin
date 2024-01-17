import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';

import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPassword';
import CategoryPage from './pages/CategoryPage';
import SettingsPage from './pages/SettingsPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';

import { UserProvider } from './context/UserContext';

const Stack = createNativeStackNavigator();



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Poppins': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (e) {
      console.log(e);
      // Handle font loading error, maybe set an error state here
    }

  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }


  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryPage" component={CategoryPage} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} options={{ headerShown: false }} />
          <Stack.Screen name="FriendsPage" component={FriendsPage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}