import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchFriendsDailySayingFromBackend } from "../../api/userAPI";

import { colorPalette, fontFamily, normalize } from "../../components/theme";

const SayingCard = ({ item }) => {
    return (
        <View style={sayingCardStyle.card}>
            <Text style={sayingCardStyle.cardText}>{item.dailySaying?.quote}</Text>
            <Text style={sayingCardStyle.cardAuthor}>- {item.dailySaying?.author}</Text>
        </View>
    );
}

export default function FriendsSayings(props) {
    const { user } = useUser();
    const [friends, setFriends] = useState({

    });

    // Friends {
    //     username
    //     profilePic
    //     dailySayings: {
    // quote
    // author
    //  }
    // }


    useEffect(() => {
        const fetchFriendsSayings = async () => {
            try {
                const fetchedFriends = await fetchFriendsDailySayingFromBackend(user.firebaseID);
                console.log(fetchedFriends);
                setFriends(fetchedFriends);
            } catch (error) {
                console.error('Failed to fetch saved sayings:', error);
            }
        };

        fetchFriendsSayings();
    }, [props.refreshKey]);

    return (
        <View>
            <FlatList
                data={friends}
                renderItem={({ item }) => <SayingCard item={item} />}
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
