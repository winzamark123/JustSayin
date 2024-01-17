import { useUser } from '../../context/UserContext';
import { addFriendToBackend } from '../../api/userAPI';
import SafeAreaWrapper from '../../components/SafeAreaWrapper';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../../components/theme';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../../components/navBar';
import FriendsSayings from './FriendsSaying';

export default function Friends() {
    const { user, profilePic, updateProfilePic } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
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
        <SafeAreaWrapper color={colorPalette.yellowColor}>
            <View style={{ backgroundColor: colorPalette.yellowColor, paddingLeft: normalize(30), paddingRight: normalize(30), gap: normalize(12) }}>
                <View style={Top.container}>
                    <Image source={profilePic} style={Top.userProfileImage}></Image>
                    <View style={Top.textContainer}>
                        <Text style={{ fontFamily: fontFamily.Poppins }}>Have a nice day</Text>
                        <Text style={{ fontFamily: fontFamily.PoppinsSemiBold, fontSize: normalize(20) }}>{user.username}</Text>
                    </View>
                </View>
                <View style={title.container}>
                    <Text style={title.text}>Friend's Quote</Text>
                    <TouchableOpacity style={title.button} onPress={() => setModalVisible(!modalVisible)}>
                        <Icon name="add" size={30} color="black"></Icon>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={friendPopUp.centeredView}>
                        <View style={friendPopUp.modalView}>
                            <Text style={friendPopUp.modalText}>Add Friends</Text>
                            <TextInput
                                style={friendPopUp.input}
                                value={friendUsername}
                                placeholder='Username'
                                placeholderTextColor="grey"
                                onChangeText={(text) => setFriendUsername(text)}
                            />

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
                <FriendsSayings />


            </View>


            <NavBar />
        </SafeAreaWrapper>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const friendPopUp = StyleSheet.create({
    input: {
        borderColor: "transparent",
        borderBottomColor: colorPalette.whiteColor,
        borderWidth: normalize(1),
        width: normalize(200),
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(10),
        color: colorPalette.whiteColor,
    },
    submitBTN: {
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: normalize(20),
        padding: normalize(15),
        paddingLeft: normalize(60),
        paddingRight: normalize(60),
        marginTop: normalize(20),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderRadius: normalize(20),
        padding: normalize(35),
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
        fontSize: normalize(15),
        color: colorPalette.whiteColor,
        
    }
});

const Top = StyleSheet.create({
    textContainer: {
        marginLeft: normalize(12),
        flexDirection: 'column',
    },
    container: {
        marginTop: normalize(30),
        flexDirection: 'row',
        backgroundColor: '#F0F0D1',
        width: windowWidth,

        // borderWidth: 1,
        // borderColor: 'black',
    },
    text: {

    },
    userProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});

const title = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: normalize(24),
        color: colorPalette.blackColor,
    },
    button: {
        width: normalize(37),
        height: normalize(37),
        backgroundColor: colorPalette.forestGreenColor,
        borderRadius: normalize(8),

        alignItems: 'center',
        justifyContent: 'center',
    }
});