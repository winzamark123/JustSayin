import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import { useState } from "react";
import { FIREBASE_AUTH } from '../firebaseConfig';
import { getAllCategories } from '../api/categoriesAPI';
import { useEffect } from 'react';

const categoriesCard = (category) => {
    return (
        <View style={categoryCard.card}>
            <Text style={categoryCard.cardText}>{category}</Text>
        </View>
    );
}

export default function CategoryPage({ userID }) {
    const [categories, setCategories] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();
                setCategories(fetchedCategories);
                console.log(fetchedCategories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []); // Empty dependency array means this runs once on mount

    const filteredCategories = categories.filter((category) => {
        return category.name.toLowerCase().includes(searchBarText.toLowerCase());
    });

    const renderCategory = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => console.log(item)}>
                {categoriesCard(item.name)}
            </TouchableOpacity>
        );
    }

    return (
        <View style={categoryPage.background}>
            <Text style={title.text}>Choose Categories</Text>
            <View style={descrip.container}>
                <Text style={descrip.text}>Choose up to 4</Text>
                <Text style={descrip.counter}>4 / 4</Text>
            </View>
            <View style={searchBar.container}>
                <Text style={searchBar.text}>Search Categories</Text>
                <TextInput style={searchBar.input}
                    value={searchBarText}
                    onChangeText={(text) => setSearchBarText(text)}
                ></TextInput>
            </View>

            <FlatList
                data={filteredCategories}
                renderItem={renderCategory}
                keyExtractor={(item) => item._id}
                contentContainerStyle={categoryPage.categoriesContainer}
            />

        </View>
    );

}


const { width, height } = Dimensions.get('window');

const searchBar = StyleSheet.create({
    container: {
        width: width * 0.9,
        marginTop: 20,
        borderWidth: 2,
        borderColor: colorPalette.blackColor,
        alignItems: 'center',
    },
    text: {
        fontFamily: fontFamily.Poppins,
        fontSize: 16,
        color: colorPalette.blackColor,
    },
    input: {
        marginTop: 10,
        width: width * 0.8,
        height: height * 0.05,
        borderRadius: 10,
        backgroundColor: colorPalette.whiteColor,
        fontFamily: fontFamily.Poppins,
        fontSize: 16,
        color: colorPalette.blackColor,
    },
});

const title = StyleSheet.create({
    text: {
        marginTop: 50,
        fontFamily: fontFamily.Poppins,
        fontSize: 30,
        color: colorPalette.mainColor,
    },
});

const descrip = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.9,
        marginTop: 20,
    },
    text: {
        fontFamily: fontFamily.Poppins,
        fontSize: 16,
        color: colorPalette.blackColor,
    },
    counter: {
        fontFamily: fontFamily.Poppins,
        fontSize: 16,
        color: colorPalette.mainColor,
    },
});

const categoryPage = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorPalette.yellowColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

const categoryCard = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: colorPalette.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 372,
        height: 77,
        borderRadius: 20,
    },

});