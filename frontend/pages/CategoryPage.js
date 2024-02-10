import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { normalize } from '../components/theme';
import { StyleSheet, Text, TextInput, View, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { colorPalette, fontFamily, fontSize } from '../components/theme';
import { useState } from "react";
import { fetchAllCategories, saveUserCategories, getUserCatergories } from '../api/categoriesAPI';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Layout from '../components/Layout';

export default function CategoryPage({ navigation }) {
    const [categories, setCategories] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { user } = useUser();
    const [curNumberSelected, setCurNumberSelected] = useState(0);


    const handleSaveCategories = async () => {
        const selectedCategoriesIDs = selectedCategories.map(category => category._id);
        const response = await saveUserCategories(user.firebaseID, selectedCategoriesIDs);
        console.log(response);

        goToHomePage();
    }

    const goToHomePage = () => {
        navigation.navigate("HomePage");
    }

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await fetchAllCategories();
                setCategories(fetchedCategories);

                // Fetch user's saved categories
                const userCategories = await getUserCatergories(user.firebaseID);
                console.log('User Categories:', userCategories);

                // Find full category objects from fetchedCategories that match the user's saved categories
                const initialSelectedCategories = fetchedCategories.filter(cat =>
                    userCategories.includes(cat.name)
                );

                setSelectedCategories(initialSelectedCategories);

                // console.log(fetchedCategories);
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
        const isSelected = selectedCategories.some(category => category._id === item._id);
        return (
            <TouchableOpacity onPress={() => toggleCategory(item)}>
                <View style={isSelected ? categoryCard.selectedCard : categoryCard.card}>
                    <Text style={categoryCard.cardText}>{item.name}</Text>
                    {/* {categoriesCard(item.name)} */}
                </View>
            </TouchableOpacity>
        );
    }

    const removeSelectedCategory = (item) => {
        setSelectedCategories(selectedCategories.filter(category => category._id !== item._id));
        setCurNumberSelected(curNumberSelected - 1);
    }

    const toggleCategory = (item) => {
        if (selectedCategories.includes(item)) {
            // Remove from selected categories
            // setSelectedCategories(selectedCategories.filter(category => category._id !== item._id));
            removeSelectedCategory(item);
        } else {
            // Add to selected categories
            if (selectedCategories.length < 4) {
                setCurNumberSelected(curNumberSelected + 1);
                setSelectedCategories([...selectedCategories, item]);
            } else {
                // setSelectedCategories(selectedCategories.filter(category => category._id !== item._id));
                removeSelectedCategory(item);
            }
        }
        console.log(selectedCategories);
    };

    return (
        <Layout bgColor={colorPalette.yellowColor}>
            <View style={categoryPage.background}>
                <Text style={title.text}>Choose Categories</Text>
                <View style={descrip.container}>
                    <Text style={descrip.text}>Choose up to 4</Text>
                    <Text style={descrip.counter}>{curNumberSelected} / 4</Text>
                </View>
                <View style={searchBar.container}>
                    <TextInput style={searchBar.input}
                        value={searchBarText}
                        onChangeText={(text) => setSearchBarText(text)}
                    ></TextInput>
                    <Icon name="search" size={24} color={colorPalette.mainColor} />
                </View>

                <FlatList
                    data={filteredCategories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={categoryPage.categoriesContainer}
                    numColumns={2}
                />
                <TouchableOpacity style={categoriesContinue.BTN} onPress={() => handleSaveCategories()}></TouchableOpacity>
            </View>
        </Layout>
    );

}


const { width, height } = Dimensions.get('window');

const categoriesContinue = StyleSheet.create({
    BTN: {
        position: 'absolute',
        top: 750,
        right: 30,
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colorPalette.forestGreenColor,
        borderColor: colorPalette.blackColor,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,  // Horizontal shadow
            height: 2, // Vertical shadow
        },
        shadowOpacity: 0.25, // The opacity of the shadow
        shadowRadius: 3.84,
    }
});

const searchBar = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: normalize(15),
        marginBottom: normalize(15),
        height: normalize(50),
        justifyContent: 'center',
        borderRadius: normalize(11),
        backgroundColor: 'rgba(39, 39, 50, 0.15)',
        flexDirection: 'row',
        padding: normalize(15),
    },
    input: {
        width: width * 0.7,
        height: height * 0.05,
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(16),
        color: colorPalette.blackColor,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
});

const title = StyleSheet.create({
    text: {
        alignSelf: 'flex-start',
        marginTop: normalize(20),
        fontFamily: fontFamily.PoppinsBold,
        fontSize: normalize(24),
        color: colorPalette.mainColor,
    },
});

const descrip = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: normalize(10),
        alignSelf: 'flex-start',
        width: normalize(300),
    },
    text: {
        fontFamily: fontFamily.Poppins,
        fontSize: 16,
        color: colorPalette.blackColor,
    },
    counter: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: 16,
        color: colorPalette.blackColor,
    },
});

const categoryPage = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colorPalette.yellowColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: normalize(30),
        paddingRight: normalize(30),
    },
    categoriesContainer: {
        gap: normalize(10),
        // justifyContent: 'space-between',
        alignItems: 'center',

    }

});

const categoryCard = StyleSheet.create({
    card: {
        backgroundColor: colorPalette.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: normalize(140),
        height: normalize(50),
        borderRadius: normalize(11),
        margin: normalize(5),
    },
    selectedCard: {
        flex: 1,
        backgroundColor: colorPalette.forestGreenColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        width: normalize(140),
        height: normalize(50),
        margin: normalize(5),

    },
    cardText: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(14),
        color: colorPalette.blackColor,
    },

});