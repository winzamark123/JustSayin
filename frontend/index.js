import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App'; // Make sure the path to your App component is correct

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Handle your message here
});

AppRegistry.registerComponent('main', () => App);
