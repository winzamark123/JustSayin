import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function SignUp() {
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            Alert('Check Your Email!');
        } catch (e) {
            alert(e.message);
        }
        setLoading(false);
    }

    return (
        <View>
            <Text> This is SignUp Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
