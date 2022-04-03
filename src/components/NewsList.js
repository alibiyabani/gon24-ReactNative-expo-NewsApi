import { StyleSheet, View, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appTheme } from '../appTheme'
import NewsItem from './NewsItem'
import { Ionicons } from '@expo/vector-icons';
import { getNews } from '../redux/newsSlice';
import { AdMobBanner } from 'expo-ads-admob';

// import AsyncStorage from '@react-native-async-storage/async-storage';


const NewsList = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newsItems)
    const [newsData, setNewsDate] = useState(news)
    const [refreshing, setRefreshing] = useState(false);
    const [adMobState, setAdmobeState] = useState(true)

    const isLoading = useSelector(state => state.news.isLoading)
    const categoryId = useSelector(state => state.selectedCategoryId.catId)

    useEffect(() => {
        dispatch(getNews())
        //getData()
    }, [dispatch])


    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@news_List')
    //         console.log(JSON.parse(jsonValue))
    //         return jsonValue != null ? JSON.parse(jsonValue) : null;

    //     } catch (e) {
    //         // error reading value
    //     }
    // }

    useEffect(() => {
        if (+categoryId == 0) {
            setNewsDate(news)
        }
        if (+categoryId != 0) {
            const filterNews = news.filter(n => +categoryId == n.attributes.categories.data[0].id)
            setNewsDate(filterNews)
        }
    }, [categoryId])

    const reloudList = () => {
        setRefreshing(true)
        dispatch(getNews())
        setRefreshing(false)
    }

    const hideAdmobe = () => {
        setAdmobeState(false)
    }

    if (isLoading) {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color={appTheme.colors.primary} />
            </View>
        )
    }
    if (newsData.length == 0 && +categoryId != 0) {
        return (
            <View style={styles.noData}>
                <Ionicons name="cloud-offline-outline" size={60} color={appTheme.colors.primary} />
                <Text style={styles.emptyList}>List Is Empty!</Text>
            </View>
        )
    }

    if (+categoryId == 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={news}
                    renderItem={({ item, index }) => index > 2 && <NewsItem key={index} content={item} />}
                    keyExtractor={(item, index) => index}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reloudList} colors={[appTheme.colors.primary]} />
                    }
                />
                <View style={styles.adMob}>
                    <AdMobBanner
                        bannerSize="BANNER"
                        adUnitID="ca-app-pub-7078093402554807/1621765327"
                        servePersonalizedAds
                        onDidFailToReceiveAdWithError={hideAdmobe}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={newsData}
                renderItem={({ item, index }) => <NewsItem key={index} content={item} />}
                keyExtractor={(item, index) => index.toString()} />

            <View style={styles.adMob}>
                <AdMobBanner
                    bannerSize="BANNER"
                    adUnitID="ca-app-pub-7078093402554807/1621765327"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={hideAdmobe}
                />
            </View>
        </View>
    )
}

export default NewsList

const styles = StyleSheet.create({
    spinner: {
        marginTop: 40
    },
    noData: {
        alignItems: 'center',
        marginTop: 40,
        opacity: .5
    },
    emptyList: {
        color: appTheme.colors.primary,
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'bold'
    },
    adMob: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appTheme.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: appTheme.colors.background,
    },

})