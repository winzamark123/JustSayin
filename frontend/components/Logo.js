import { StyleSheet, Text, View, Image } from "react-native";

export default function Logo() {

    return (
        < View style={styles.container} >
            <Text>Hello IOS Simulator!</Text>
            <Image
                source={require('../assets/Just_Sayin_Logo.png')}

            />
        </View >
    )
};

styles = StyleSheet.create({

});