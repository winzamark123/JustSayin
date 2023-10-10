import { StyleSheet, Text, View, Image } from "react-native";

export default function Logo({ logoSize }) {

    return (
        < View style={styles.container} >
            <Image style={[styles.logoImage, { width: logoSize, height: logoSize }]}
                source={require('../assets/Just_Sayin_Logo.png')} />
        </View >
    )
};

styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    logoImage: {
        resizeMode: 'contain',
    },

});