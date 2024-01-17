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

export default function FriendsSayings(props) {
    const { user } = useUser();
    const [friendsSayings, setFriendsSayings] = useState([]);
}