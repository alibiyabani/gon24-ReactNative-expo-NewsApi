import { StyleSheet, Text, View, FlatList, Image, Dimensions, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { appTheme } from '../appTheme';

const windowWidth = Dimensions.get('window').width;

const LastNews = () => {
    const news = useSelector(state => state.news.newsItems)
    const categoryId = useSelector(state => state.selectedCategoryId.catId)
    const navigation = useNavigation()


    const BreakingNews = ({ singleItem }) => {
        return (
            <Pressable style={styles.singleItem} onPress={() => navigation.navigate('DetailsScreen', { details: singleItem.attributes })}>
                <View>
                    <View style={styles.topWrapper}>
                        <View style={styles.breakingNews}>
                            <Text style={styles.breakingNewsText}>Breaking News</Text>
                        </View>
                    </View>
                    <Image style={styles.image} source={{ uri: singleItem.attributes.image }} />
                    <Text numberOfLines={1} style={styles.title}>{singleItem.attributes.title}</Text>
                    <View style={styles.textBack}></View>
                    <View style={styles.publisher}>
                        <MaterialIcons name="verified" size={16} color={appTheme.colors.primary} style={{ paddingTop: 4 }} />
                        <Text style={styles.publisherText}>{singleItem?.attributes?.publisher?.data?.attributes?.name}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }
    return (
        <>
            {+ categoryId == 0 ?
                <View>
                    <FlatList
                        data={news}
                        horizontal={true}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled
                        decelerationRate={'fast'}
                        scrollEventThrottle={6}
                        pagingEnabled
                        renderItem={({ item, index }) => index < 3 && <BreakingNews key={index} singleItem={item} />}
                    />
                </View> : null}
        </>
    )
}

export default LastNews

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 4,
        backgroundColor: appTheme.colors.border,
        overflow: 'hidden'
    },
    textBack: {
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        height: 34.9,
        top: 115,
        overflow: 'hidden',
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4
    },
    title: {
        position: 'absolute',
        flex: 1,
        overflow: 'hidden',
        top: 122,
        left: 10,
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 1,
        paddingRight: 8
    },
    singleItem: {
        width: windowWidth,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: 'transparent'
    },
    content: {
        backgroundColor: 'transparent',
        flex: 1
    },
    breakingNews: {
        backgroundColor: appTheme.colors.red,
        height: 25,
        width: 100,
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: 4,
        borderTopRightRadius: 4,
        right: 0,
        zIndex: 1
    },
    breakingNewsText: {
        fontSize: 12,
        color: '#fff',
        paddingLeft: 6,
        paddingTop: 2
    },
    topWrapper: {
        zIndex: 2,
    },
    publisher: {
        position: 'absolute',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 25,
        bottom: 34,
        right: 0,
        borderTopLeftRadius: 4
    },
    publisherText: {
        fontSize: 12,
        color: '#000',
        paddingLeft: 6,
        fontWeight: '600',
        paddingTop: 2

    }
})