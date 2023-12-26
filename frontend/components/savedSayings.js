import React from "react";
import { FlatList, Dimensions, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";
import { fetchUserSayingsFromBackend } from "../api/userAPI";

import { colorPalette, fontFamily } from "../components/theme";



const sayingCard = (saying) => {
    return (
        <View style={sayingCard.card}>
            <Text style={sayingCard.cardText}>{saying.quote}</Text>
            <Text style={sayingCard.cardAuthor}>- {saying.author}</Text>
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
