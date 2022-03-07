import { StyleSheet, FlatList, View, Pressable, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../appTheme';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import NewsItem from '../components/NewsItem'

const SearchScreen = () => {
    const navigate = useNavigation()
    const news = useSelector(state => state.news.newsItems)
    const [searchResult, setSearchResult] = useState([])

    const getValueHandler = (term) => {
        const searchResult = news.filter((item) => {
            return item.attributes.title.toLowerCase().match(new RegExp(term.toLowerCase(), "i"))
        })
        setSearchResult(searchResult)

        if (term.length == 0) {
            setSearchResult([])
        }
    }

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.content}>
                <View style={styles.headerWrapper}>
                    <Pressable onPress={() => navigate.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={20} color="#fff" />
                    </Pressable>
                    <View style={styles.searchWrapper}>
                        <TextInput
                            style={styles.textInput}
                            numberOfLines={1}
                            autoCorrect={false}
                            placeholder="Search here!"
                            onChangeText={text => getValueHandler(text)}
                            placeholderTextColor={appTheme.colors.shadow}
                            underlineColorAndroid='transparent'
                            selectionColor={appTheme.colors.shadow}
                            activeUnderlineColor='transparent'
                            autoCapitalize='none'
                        />
                    </View>
                </View>
            </View>

            {searchResult.length == 0 &&
                <View style={styles.noData}>
                    <MaterialCommunityIcons name="folder-search-outline" size={60} color={appTheme.colors.primary} />
                    <Text style={styles.emptyList}>No Results</Text>
                </View>

            }
            <View style={styles.itemWrapper}>
                <FlatList
                    data={searchResult}
                    renderItem={({ item, index }) => <NewsItem key={index} content={item} />}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        </View>

    )
}

export default SearchScreen

const styles = StyleSheet.create({
    content: {
        backgroundColor: appTheme.colors.primary
    },
    headerWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    searchWrapper: {
        paddingHorizontal: 16
    },
    textInput: {
        color: '#fff',
        borderBottomWidth: 0
    },
    itemWrapper: {
        paddingVertical: 8,
        flex: 1

    },
    mainWrapper: {
        backgroundColor: appTheme.colors.background,
        flex: 1
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