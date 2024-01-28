import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { colorPalette, fontFamily, normalize } from '../../../components/theme';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchFriendsFromBackend, addFriendToBackend, deleteFriendFromBackend } from '../../../api/userAPI';


export default function FriendModal({ user, modalVisible, setModalVisible }) {
    const [friendUsername, setFriendUsername] = useState('');
    const [friends, setFriends] = useState([]);

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

    const handleDeleteFriend = async (friendUsername) => {
        try {
            const response = await deleteFriendFromBackend(user.firebaseID, friendUsername);
            console.log("Deleted friend response:", response);

            // Remove the friend from the local state to update the UI
            const updatedFriends = friends.filter(friend => friend.username !== friendUsername);
            setFriends(updatedFriends);

        } catch (error) {
            console.log("Error deleting friend:", error);
        }
    }


    const handleFetchFriends = async () => {
        try {
            const response = await fetchFriendsFromBackend(user.firebaseID);
            // console.log("Friends:", response);
            return response;
        } catch (error) {
            console.log("Error fetching friends:", error);
        }
    }

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const fetchedFriends = await handleFetchFriends();
                setFriends(fetchedFriends);
            } catch (error) {
                console.error('Failed to fetch friends:', error)
            }
        };

        fetchFriends();
    }, []);

    const renderFriend = ({ item }) => {
        return (
            <View style={friendsList.friendItem}>
                <Image source={{ uri: item.profilePicUrl }} style={friendsList.friendProfilePic}></Image>
                <Text style={friendsList.friendName}>{item.username}</Text>
                <TouchableOpacity onPress={() => handleDeleteFriend(item.username)}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                {/* Add more friend details or actions here if needed */}
            </View>
        );
    };



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
                    <View style={friendsList.container}>
                        <View style={friendsList.title}>
                            <Icon name="group" size={normalize(40)} color="white"></Icon>
                        </View>
                        <Text style={friendsList.titleFont}>Your Friends</Text>
                    </View>
                    <FlatList
                        data={friends}
                        keyExtractor={(item) => item._id}
                        renderItem={renderFriend}
                        contentContainerStyle={friendsList.list}
                    />

                </View>
            </View>
        </Modal>
    );
}

const friendsList = StyleSheet.create({
    container: {
        borderRadius: normalize(20),
        padding: normalize(15),
        marginTop: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
    },
    title: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: normalize(18),
        lineHeight: "150%",
        color: colorPalette.blackColor,
        marginLeft: -normalize(20),
    },
    titleFont: {
        color: colorPalette.whiteColor,
        fontFamily: fontFamily.PoppinsBold,
    },
    list: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(15),
        color: colorPalette.blackColor,
    },
    friendName: {
        fontFamily: fontFamily.Poppins,
        fontSize: normalize(15),
        color: colorPalette.whiteColor,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: normalize(10),
        padding: normalize(10),
    },
    friendProfilePic: {
        width: 30,
        height: 30,
        borderRadius: 50,
    }
})
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