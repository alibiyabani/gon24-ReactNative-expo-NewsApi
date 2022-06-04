import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
// import moment from 'moment';
import moment from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../appTheme';
import { MaterialIcons } from '@expo/vector-icons';


const NewsItem = ({ content }) => {
    const navigation = useNavigation();

    const { attributes } = content
    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('DetailsScreen', { details: attributes })}>
            <View style={styles.topRow}>
                <Image
                    style={styles.image}
                    source={{ uri: attributes?.image }}
                />
                <Text numberOfLines={2} style={styles.title}>{attributes?.title}</Text>
            </View>
            <View style={styles.belowRow}>
                <View style={styles.publisher}>
                    <MaterialIcons name="verified" size={15} color={appTheme.colors.primary} />
                    <Text style={styles.newsSource}>{attributes?.publisher?.data?.attributes?.name}</Text>
                </View>
                <Text style={styles.newsDate}>{moment(attributes?.createdAt).tz('Asia/Tehran').fromNow()}</Text>
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
        resizeMode: 'cover',
        backgroundColor: appTheme.colors.border
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
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '700'
    },
    newsDate: {
        fontSize: 11
    },
    publisher: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})