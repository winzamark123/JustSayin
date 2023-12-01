import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
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

    return (
        <View style={categoryPage.background}>
            <View style={categoryPage.categoriesContainer}>
                {categories.map((category) => (
                    <View key={category._id} style={categoryCard.card}>
                        <Text style={categoryCard.cardText}>{category.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

}


const { width, height } = Dimensions.get('window');

const categoryPage = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorPalette.yellowColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

const categoryCard = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorPalette.yellowColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

});