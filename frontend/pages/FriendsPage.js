import { useUser } from '../context/UserContext';
import { addFriendToBackend } from '../api/userAPI';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../components/theme';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavBar from '../components/navBar';

export default function Friends() {
    const { user, profilePic, updateProfilePic } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [friendUsername, setFriendUsername] = useState('');
    // const [addFriendPopUp, setAddFriendPopUp] = useState(false);


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
                            <Text style={friendPopUp.modalText}>Add Your Friend!</Text>
                            <TextInput
                                style={friendPopUp.input}
                                value={friendUsername}
                                placeholder='Friend Username'
                                onChangeText={(text) => setFriendUsername(text)}
                            />

                            {/* Button to close the modal */}
                            <TouchableOpacity
                                style={friendPopUp.button}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={friendPopUp.textStyle}>Hide Popup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>


            <NavBar />
        </SafeAreaWrapper>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const friendPopUp = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: normalize(200),
        padding: normalize(10),
        borderRadius: normalize(10),
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(10),
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
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
        elevation: normalize(5)
    },
    button: {
        borderRadius: normalize(20),
        padding: normalize(10),
        elevation: normalize(2)
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "black",
        fontFamily: fontFamily.Poppins,
        textAlign: "center"
    },
    modalText: {
        marginBottom: normalize(15),
        fontFamily: fontFamily.PoppinsSemiBold,
        textAlign: "center",
        fontSize: normalize(15),
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