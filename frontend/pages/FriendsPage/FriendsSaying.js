import React from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { fetchFriendsDailySayingFromBackend, getUserProfilePicFromBackend } from "../../api/userAPI";

import { colorPalette, fontFamily, normalize } from "../../components/theme";

const fetchFriendsProfilePics = async (fetchedFriends) => {
    try {
        const promises = fetchedFriends.map(async (friend) => {
            const profilePic = await getUserProfilePicFromBackend(friend.firebaseID);
            return {
                ...friend,
                profilePic: profilePic.url
            };
        });

        const friendsWithProfilePics = await Promise.all(promises);
        // console.log("Friends with profile pics", friendsWithProfilePics);
        return friendsWithProfilePics;
    } catch (error) {
        console.log("Error fetching friends profile pics", error);
    }

}
const SayingCard = ({ item }) => {
    return (
        <View style={sayingCardStyle.container}>
            <View style={sayingCardStyle.user}>
                <Image source={{ uri: item.profilePic }} style={sayingCardStyle.userProfileImage}></Image>
                <Text style={sayingCardStyle.userText}>{item.username}</Text>
            </View>
            <View style={sayingCardStyle.card}>
                <Text style={sayingCardStyle.cardText}>{item.dailySaying?.quote}</Text>
                <Text style={sayingCardStyle.cardAuthor}>- {item.dailySaying?.author}</Text>
            </View>
        </View>
    );
}

export default function FriendsSayings(props) {
    const { user } = useUser();
    const [friends, setFriends] = useState({});

    useEffect(() => {
        const fetchFriendsSayings = async () => {
            try {
                const fetchedFriends = await fetchFriendsDailySayingFromBackend(user.firebaseID);
                const friendsWithProfilePics = await fetchFriendsProfilePics(fetchedFriends);
                // console.log(fetchedFriends);
                setFriends(friendsWithProfilePics);
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
    user: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: normalize(12),
        marginBottom: normalize(10),
    },
    userText: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(15),
        color: colorPalette.blackColor,
    },
    userProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
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
