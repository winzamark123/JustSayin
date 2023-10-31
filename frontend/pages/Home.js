import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View>
            <Text>Home Page</Text>
        </View>
    )
}

const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
