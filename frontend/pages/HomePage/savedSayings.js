import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchUserSayingsFromBackend } from "../../api/userAPI";

import { colorPalette, fontFamily, normalize } from "../../components/theme";



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
        padding: normalize(20),
        borderRadius: 11,
        marginBottom: normalize(10),
    },
    cardText: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(15),
        color: colorPalette.blackColor,
    },
    cardAuthor: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(11),
        color: colorPalette.blackColor,
        marginTop: normalize(5),
        alignSelf: 'flex-end',
        marginRight: normalize(10)
    }

})
