import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../appTheme';


const NewsItem = ({ content }) => {
    const navigation = useNavigation();

    const { attributes } = content
    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('DetailsScreen', { details: attributes })}>
            <View style={styles.topRow}>
                <Image
                    style={styles.image}
                    source={{ uri: attributes.image }}
                />
                <Text numberOfLines={2} style={styles.title}>{attributes.title}</Text>
            </View>
            <View style={styles.belowRow}>
                <Text style={styles.newsSource}>{attributes.publisher.data.attributes.name}</Text>
                <Text style={styles.newsDate}>{moment(attributes.createdAt, "YYYYMMDD").fromNow()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NewsItem

const styles = StyleSheet.create({
    content: {
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 6,
        marginHorizontal: 8,
        shadowColor: appTheme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    image: {
        width: 100,
        height: 60,
        borderRadius: 4,
        resizeMode: 'cover'
    },
    topRow: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 13,
        flex: 1,
        overflow: 'hidden',
        marginHorizontal: 8,
        fontWeight: '600'
    },
    belowRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        marginTop: 4,
    },
    newsSource: {
        fontSize: 11
    },
    newsDate: {
        fontSize: 11
    }
})