import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import NavBar from './navBar';

const Layout = ({ children, bgColor }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ ...styles.safeArea, backgroundColor: bgColor }}>
                <View style={styles.content}>
                    {children}
                </View>
                <NavBar bgColor={bgColor}/>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        // Rest of your styles for content
    },
    safeArea: {
        flex: 1,
    },
});

export default Layout;
