import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../../../components/theme';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function FriendModal({ user, addFriendToBackend, modalVisible, setModalVisible }) {
    const [friendUsername, setFriendUsername] = useState('');

    const handleAddFriend = async () => {
        try {
            const response = await addFriendToBackend(user.firebaseID, friendUsername);
            console.log(response.status);
            if (response.status === 409) {
                console.log("Friend already exists!");
            } else {
                console.log("Friend added successfully!");
            }
            setModalVisible(!modalVisible);
        } catch (error) {
            console.log("Error adding friend:", error);
        }
    }

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            {/* Your modal content here */}

            <View style={friendPopUp.centeredView}>
                <View style={friendPopUp.modalView}>
                    <Text style={friendPopUp.modalText}>Add a New Friend</Text>
                    <View style={friendPopUp.inputView}>
                        <TextInput
                            style={friendPopUp.input}
                            value={friendUsername}
                            placeholder='Username'
                            placeholderTextColor="white"
                            onChangeText={(text) => setFriendUsername(text)}
                        />
                        <Icon name="search" size={30} color="white"></Icon>
                    </View>


                    <TouchableOpacity
                        style={friendPopUp.submitBTN}
                        onPress={() => handleAddFriend()}
                    >
                        <Text style={friendPopUp.textStyle}>Add</Text>
                    </TouchableOpacity>

                    {/* Button to close the modal */}
                    <TouchableOpacity
                        style={friendPopUp.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={friendPopUp.buttonClose}>Hide Popup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const friendPopUp = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "center",
        padding: normalize(44),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: normalize(2)
        },
        shadowOpacity: 0.25,
        shadowRadius: normalize(4),
        elevation: normalize(5),
        borderRadius: normalize(11),
        backgroundColor: "#272732",
    },
    modalView: {
        borderRadius: normalize(20),
        marginTop: normalize(90),
        // borderWidth: normalize(2),
        // borderColor: colorPalette.whiteColor,
    },
    inputView: {
        backgroundColor: "#7D7D8B",
        height: normalize(57),
        borderRadius: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: normalize(25),
        paddingRight: normalize(16),
        width: normalize(300),
    },
    input: {
        fontFamily: fontFamily.Poppins,
        color: colorPalette.whiteColor,
        fontSize: normalize(13),

    },
    submitBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: normalize(20),
        padding: normalize(15),
        marginTop: normalize(20),
    },

    buttonClose: {
        marginTop: normalize(10),
        color: colorPalette.whiteColor,
    },
    textStyle: {
        color: "black",
        fontFamily: fontFamily.Poppins,
        textAlign: "center"
    },
    modalText: {
        marginBottom: normalize(24),
        fontFamily: fontFamily.PoppinsBold,
        textAlign: "center",
        fontSize: normalize(28),
        color: colorPalette.whiteColor,

    }
});