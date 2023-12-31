import React from "react";
import { FlatList, Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";
import { fetchUserSayingsFromBackend } from "../api/userAPI";

import { colorPalette, fontFamily } from "../components/theme";



const sayingCard = (saying) => {
    return (
        <View style={sayingCardStyle.card}>
            <Text style={sayingCardStyle.cardText}>{saying.quote}</Text>
            <Text style={sayingCardStyle.cardAuthor}>- {saying.author}</Text>
        </View>
    );
}
export default function SavedSayings(props) {
    const { user } = useUser();
    const [savedSayings, setSavedSayings] = useState([]);

    useEffect(() => {
        //Fetch Saved Sayings when the component mounts
        const fetchSavedSayings = async () => {
            try {
                const fetchedSavedSayings = await fetchUserSayingsFromBackend(user.firebaseID);
                setSavedSayings(fetchedSavedSayings);
                console.log(fetchedSavedSayings);
            } catch (error) {
                console.error('Failed to fetch saved sayings:', error);
            }
        };

        fetchSavedSayings();
    }, [props.refreshKey]);

    return (
        <View>
            <FlatList
                data={savedSayings}
                renderItem={({ item }) => sayingCard(item)}
                keyExtractor={item => item._id}
            />
        </View>
    )

}

const sayingCardStyle = StyleSheet.create({
    card: {
        // flex: 1,
        backgroundColor: colorPalette.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 372,
        // height: 113,
        padding: 20,
        borderRadius: 11,
        marginBottom: 10,
    },
    cardText: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: 15,
        color: colorPalette.blackColor,
    },
    cardAuthor: {
        fontFamily: fontFamily.Poppins,
        fontSize: 11,
        color: colorPalette.blackColor,
        marginTop: 5,
        alignSelf: 'flex-end',
        marginRight: 10
    }

})
