import { StyleSheet, View } from 'react-native'
import React from 'react'
import Categories from '../components/Categories'
import { appTheme } from '../appTheme'
import NewsList from '../components/NewsList'
import LastNews from '../components/LastNews'

const NewsScreen = () => {
    return (
        <>
            <View style={styles.categoryWrapper}>
                <Categories />
            </View>
            <View style={styles.breakingNewsWrapper}>
                <LastNews />
            </View>
            <View style={styles.container}>
                <NewsList />
            </View>
        </>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    categoryWrapper: {
        backgroundColor: appTheme.colors.background,
    },
    breakingNewsWrapper: {
        backgroundColor: appTheme.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: appTheme.colors.background,
    }
})