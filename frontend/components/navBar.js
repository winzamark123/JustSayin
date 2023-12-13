import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { colorPalette } from './theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from '../context/UserContext';




function NavBar() {
    const navigation = useNavigation();
    const { user } = useUser();

    // Check if user data is available and get userID
    const uid = user ? user.id : null; // Replace 'id' with your actual user ID attribute

    console.log("NavBar - userID:", uid);

    return (
        <View style={navBarStyles.container}>
            <TouchableOpacity title="Home" onPress={() => navigation.navigate('HomePage', { userID: uid })}>
                <Icon name="home" size={40} color="#000"></Icon>
            </TouchableOpacity>
            <TouchableOpacity title="Friends" onPress={() => navigation.navigate('FriendsPage')}>
                <Icon name="group" size={40} color="#000"></Icon>
            </TouchableOpacity>
            <TouchableOpacity title="EmoTracker" onPress={() => navigation.navigate('EmoTrackerPage')}>
                <Icon name="event" size={40} color="#000"></Icon>
            </TouchableOpacity>
            <TouchableOpacity title="Settings" onPress={() => navigation.navigate('SettingsPage')}>
                <Icon name="settings" size={40} color="#000"></Icon>
            </TouchableOpacity>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const navBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: `${colorPalette.yellowColor}`,

        // borderWidth: 1,
        // borderColor: 'black',
        width: windowWidth * 0.8,
    },
});


export default NavBar;