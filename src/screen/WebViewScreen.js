import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { appTheme } from '../appTheme';


const WebViewScreen = ({ route }) => {
    const { url } = route.params;

    const Spinner = () => (
        <View style={styles.spinner}>
            <ActivityIndicator size="large" color={appTheme.colors.primary} />
        </View>
    );

    return (
        <View style={styles.content}>
            <WebView
                bounces={false}
                startInLoadingState={true}
                renderLoading={Spinner}
                style={styles.web}
                source={{ uri: url }}
            />
        </View>
    )
}

export default WebViewScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%'
    },
    web: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
    },
})