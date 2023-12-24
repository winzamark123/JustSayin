import React from 'react';
import { useEffect, useState } from "react";

import { useUser } from "../context/UserContext";
import { fetchDailySayingFromBackend } from "../api/dailySayingAPI";

import { colorPalette, fontFamily } from "../components/theme";

export default function SavedSayings() {
    const { user } = useUser();
    const [savedSayings, setSavedSayings] = useState([{}]);

    const loadSavedSayings = async () => {

    }

    // SCROLL VIEW LIKE CATEGORIES
    // SAVE SAYING FUNCTION 
    return (
        <View style={savedSayingsStyles.container}>
            <Text style={savedSayingsStyles.title}>Saved Sayings</Text>
            <View style={savedSayingsStyles.savedSayingsContainer}>
                <Text style={savedSayingsStyles.savedSaying}>Saying 1</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 2</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 3</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 4</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 5</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 6</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 7</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 8</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 9</Text>
                <Text style={savedSayingsStyles.savedSaying}>Saying 10</Text>
            </View>
        </View>
    )

}



