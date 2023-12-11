import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Button, StyleSheet } from 'react-native'
import { colorPalette } from './theme';





function NavBar() {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: `${colorPalette.yellowColor}` }}>
            <Button title="Home" onPress={() => navigation.navigate('HomePage')}></Button>
            <Button title="Friends" onPress={() => navigation.navigate('FriendsPage')}></Button>
            <Button title="EmoTracker" onPress={() => navigation.navigate('EmoTrackerPage')}></Button>
            <Button title="Settings" onPress={() => navigation.navigate('SettingsPage')}></Button>
        </View>
    );
}

// const navBarStyles = StyleSheet.create({
//     container: {
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     button: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     }
// })

export default NavBar;