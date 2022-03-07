import { StyleSheet, Text, View, FlatList, Image, Dimensions, Pressable } from 'react-native'
import { useSelector } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
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
                    <View style={styles.breakingNews}>
                        <Text style={styles.breakingNewsText}>Breaking News</Text>
                    </View>
                    <Image style={styles.image} source={{ uri: singleItem.attributes.image }} />
                    <Text numberOfLines={1} style={styles.title}>{singleItem.attributes.title}</Text>
                    <View style={styles.textBack}></View>
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
        backgroundColor: 'transparent'
    },
    textBack: {
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        height: 35,
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
        zIndex: 1
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
    }
})