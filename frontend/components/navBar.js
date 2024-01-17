import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { colorPalette } from './theme';
import Icon from 'react-native-vector-icons/MaterialIcons';




function NavBar() {
    const navigation = useNavigation();

    return (
        <View style={navBarStyles.background}>
            <View style={navBarStyles.container}>
                <TouchableOpacity title="Home" onPress={() => navigation.navigate('HomePage')}>
                    <Icon name="home" size={40} color="#000"></Icon>
                </TouchableOpacity>
                <TouchableOpacity title="Friends" onPress={() => navigation.navigate('FriendsPage')}>
                    <Icon name="group" size={40} color="#000"></Icon>
                </TouchableOpacity>
                <TouchableOpacity title="Settings" onPress={() => navigation.navigate('SettingsPage')}>
                    <Icon name="settings" size={40} color="#000"></Icon>
                </TouchableOpacity>
            </View>
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
    background: {
        alignItems: 'center',
        // justifyContent: 'center',
        width: windowWidth,
        backgroundColor: `${colorPalette.yellowColor}`,
        position: 'absolute',
        bottom: 0,
        padding: 20

    }
});


export default NavBar;