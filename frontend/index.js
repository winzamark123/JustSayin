import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App'; // Make sure the path to your App component is correct

const toggleWidget = (dailySaying, author) => {
    const {RNSharedWidget} = NativeModules;

    RNSharedWidget.setData('justSayinWidgetKey', JSON.stringify({
        quote: dailySaying.sayingID.quote ?? "Unknown",
        author: dailySaying.sayingID.author ?? "Author",
    }), (status) => {
        console.log('Widget status: ', status);
    });
};

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
    console.log("Background Message Handler Called");
    // Handle your message here
});

AppRegistry.registerComponent('main', () => App);
