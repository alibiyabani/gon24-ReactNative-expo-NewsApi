import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { appTheme } from '../appTheme'
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getNewsUrl } from '../redux/selectedNewsSlice'
import { AdMobBanner } from 'expo-ads-admob';

// import AsyncStorage from '@react-native-async-storage/async-storage';


const DetailsScreen = ({ route }) => {
    const [admobeState, setAdmobeState] = useState(true)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { details } = route.params;

    useEffect(() => {
        dispatch(getNewsUrl(details.newsUrl))
        //storeData(details)
    }, [])

    const hideAdmobe = () => {
        setAdmobeState(false)
    }

    // const storeData = async (values) => {
    //     try {
    //         const jsonValue = JSON.stringify(values)
    //         await AsyncStorage.setItem('@news_List', jsonValue)
    //     } catch (e) {
    //         // saving error
    //     }
    // }


    return (
        <View style={styles.content}>
            <Image style={styles.image} source={{ uri: details.image }} />
            <Pressable style={styles.icon} onPress={() => navigation.navigate('WebViewScreen', { url: details.newsUrl })}>
                <View style={styles.iconBack}></View>
                <Fontisto name="world-o" size={32} color='#FF1744' />
            </Pressable>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{details.title}</Text>
                <Text style={styles.description}>{details.description}</Text>
                <Text style={styles.body}>{details.body}</Text>
            </ScrollView>
            {admobeState &&
                <View style={styles.adMob}>
                    <AdMobBanner
                        bannerSize="BANNER"
                        adUnitID="ca-app-pub-7078093402554807/1621765327"
                        servePersonalizedAds
                        onDidFailToReceiveAdWithError={hideAdmobe}
                    />
                </View>
            }
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    content: {
        backgroundColor: appTheme.colors.background,
        flex: 1,
    },
    scrollView: {
        backgroundColor: appTheme.colors.background,
        paddingHorizontal: 8,
    },
    image: {
        borderRadius: 4,
        height: 200,
        resizeMode: 'cover',
        margin: 4
    },
    icon: {
        position: 'absolute',
        top: 168,
        right: 12
    },
    iconBack: {
        position: 'absolute',
        backgroundColor: appTheme.colors.background,
        width: 50,
        height: 42,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 4,

        right: -8,
        bottom: -3.5

    },
    title: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 12,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
        backgroundColor: appTheme.colors.background,
        marginBottom: 10,
        fontSize: 12,
    },
    adMob: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.colors.background,
    },

})