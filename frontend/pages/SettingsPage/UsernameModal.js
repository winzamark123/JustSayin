import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../../components/theme';
import { useState } from 'react';
import { editUsernameToBackend } from '../../api/userAPI';
import { useUser } from '../../context/UserContext';

export default function UsernameModal({ modalVisible, setModalVisible }) {
    const { user, updateUser } = useUser();
    const [username, setUsername] = useState(user.username);

    const saveUsername = async () => {
        try {
            const response = await editUsernameToBackend(user.firebaseID, username);
            updateUser();
            setModalVisible(!modalVisible);
            console.log("Username Edited to Backend", response);
        } catch (error) {
            console.log("Error editing username to backend", error);
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={modal.modalContainer}>
                <View style={modal.modalView}>
                    <Text style={modal.modalText}>Edit Your Username</Text>
                    <TextInput
                        style={modal.input}
                        onChangeText={text => setUsername(text)}
                        value={username}
                        placeholder={username}
                    />
                    <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={modal.buttonText}>Hide Popup</Text>
                    </TouchableOpacity>
                    <View style={modal.buttonContainer}>
                        <TouchableOpacity style={modal.button} onPress={saveUsername}>
                            <Text style={modal.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const modal = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: colorPalette.mainColor,
        padding: normalize(30),
        paddingLeft: normalize(60),
        paddingRight: normalize(60),
        borderRadius: normalize(20),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(20),
        color: 'white',
    },
    input: {
        backgroundColor: colorPalette.greyColor,
        padding: normalize(15),
        paddingLeft: normalize(20),
        paddingRight: normalize(20),
        marginTop: normalize(15),
        borderRadius: normalize(10),
        fontFamily: fontFamily.Poppins,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: normalize(20),
    },
    button: {
        backgroundColor: colorPalette.forestGreenColor,
        padding: normalize(10),
        borderRadius: normalize(10),
    },
    buttonText: {
        fontFamily: fontFamily.PoppinsSemiBold,
        color: colorPalette.whiteColor,
    }
})