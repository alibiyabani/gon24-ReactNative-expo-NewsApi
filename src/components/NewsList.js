import { StyleSheet, View, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appTheme } from '../appTheme'
import NewsItem from './NewsItem'
import { Ionicons } from '@expo/vector-icons';
import { getNews } from '../redux/newsSlice';


const NewsList = () => {
    const dispatch = useDispatch();
    const news = useSelector(state => state.news.newsItems)
    const [newsData, setNewsDate] = useState(news)
    const [refreshing, setRefreshing] = useState(false);
    const isLoading = useSelector(state => state.news.isLoading)
    const categoryId = useSelector(state => state.selectedCategoryId.catId)

    useEffect(() => {
        dispatch(getNews())
    }, [dispatch])

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
            <FlatList
                data={news}
                renderItem={({ item, index }) => index > 2 && <NewsItem key={index} content={item} />}
                keyExtractor={(item, index) => index}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reloudList} colors={[appTheme.colors.primary]} />
                }
            />
        )
    }

    return (
        <FlatList
            data={newsData}
            renderItem={({ item, index }) => <NewsItem key={index} content={item} />}
            keyExtractor={(item, index) => index.toString()} />
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
    }

})