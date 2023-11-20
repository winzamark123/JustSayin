import React from 'react'
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { sendPasswordResetEmail } from 'firebase/auth'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const auth = FIREBASE_AUTH;


    const resetPassword = () => {
        sendPasswordResetEmail(auth, email).then(() => {
            console.log("Password Reset Email Sent");
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <View style={main.container}>
            <View style={form.container}>
                <Text>Email</Text>
                <TextInput style={form.inputForm} value={email} onChangeText={setEmail}></TextInput>
                <TouchableOpacity onPress={resetPassword}><Text>Send Email</Text></TouchableOpacity>


            </View>
        </View>
    )
}

main = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey',
    }
})
form = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'whitesmoke',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,

        width: 400,
        height: 200
    },
    inputForm: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'grey',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,

        width: 300,
        height: 30
    }
})

export default ForgotPassword
