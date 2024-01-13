import { SafeAreaView, StyleSheet } from 'react-native';

const SafeAreaWrapper = ({ color, children }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color }}>
            {children}
        </SafeAreaView>
    );
};

export default SafeAreaWrapper;