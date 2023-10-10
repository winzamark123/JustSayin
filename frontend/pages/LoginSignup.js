import { StyleSheet, Text, View, Image } from "react-native";
import { colorPalette, fontSize } from "../components/theme";
import Logo from "../components/Logo";

export default function LoginSignup() {

    return (
        < View style={styles.main_container} >
            <View style={styles.logo_container}>
                <Logo logoSize={100}/>
            </View>

        </View >
    )
};

styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: colorPalette.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    logo_container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },

});