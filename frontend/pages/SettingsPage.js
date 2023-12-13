import { View, Text } from 'react-native'
import NavBar from '../components/navBar'

export default function SettingsPage() {
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <Text>Settings Page</Text>
            <NavBar />
        </View>
    )
}


