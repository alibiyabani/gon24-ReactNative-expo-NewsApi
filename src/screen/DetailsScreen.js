import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { appTheme } from '../appTheme'
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getNewsUrl } from '../redux/selectedNewsSlice'
import { AdMobBanner } from 'expo-ads-admob';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment-timezone';
import { Ionicons } from '@expo/vector-icons';




const DetailsScreen = ({ route }) => {
    const [admobeState, setAdmobeState] = useState(true)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { details } = route.params;

    useEffect(() => {
        dispatch(getNewsUrl(details.newsUrl))
    }, [])

    const hideAdmobe = () => {
        setAdmobeState(false)
    }

    return (
        <View style={styles.content}>
            <Image style={styles.image} source={{ uri: details.image }} />
            <Pressable style={styles.icon} onPress={() => navigation.navigate('WebViewScreen', { url: details.newsUrl })}>
                <View style={styles.iconBack}></View>
                <Fontisto name="world-o" size={32} color='#FF1744' />
            </Pressable>
            <View style={styles.news}>
                <View style={styles.sourceWrapper}>
                    <MaterialIcons name="verified" size={15} color={appTheme.colors.green} />
                    <Text style={styles.newsSource}>{details?.publisher?.data?.attributes?.name}</Text>
                </View>
                <Text style={styles.newsDate}>{moment(details?.createdAt).tz('Asia/Tehran').fromNow()}</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{details.title}</Text>
                <Text style={styles.description}>{details.description}</Text>
                <Text style={styles.body}>{details.body}</Text>
                <Pressable style={styles.newsSourceDivider} onPress={() => navigation.navigate('WebViewScreen', { url: details.newsUrl })}>
                    <Text style={styles.newsSourceDividerText}>News Source URL</Text>
                </Pressable>
                <Pressable style={styles.sourceLink} onPress={() => navigation.navigate('WebViewScreen', { url: details.newsUrl })}>
                    <MaterialIcons name="verified" size={22} color={appTheme.colors.primary} />
                    <Text style={styles.sourceLinkText}>{details.newsUrl}</Text>
                </Pressable>
            </ScrollView>
            {admobeState &&
                <View style={styles.adMob}>
                    <AdMobBanner
                        bannerSize='banner'
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
        margin: 4,
        backgroundColor: '#fff'
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
    news: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: appTheme.colors.primary
    },
    newsSource: {
        fontSize: 12,
        color: '#fff',
        paddingLeft: 4

    },
    newsDate: {
        fontSize: 12,
        color: '#fff',
    },
    sourceWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    newsSourceDivider: {
        backgroundColor: '#000',
        height: 40,
        width: 150,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10

    },
    newsSourceDividerText: {
        color: '#fff',
        fontSize: 11,
        padding: 8
    },
    sourceLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    sourceLinkText: {
        color: appTheme.colors.shadow,
        fontSize: 11,
        paddingHorizontal: 10
    }

})