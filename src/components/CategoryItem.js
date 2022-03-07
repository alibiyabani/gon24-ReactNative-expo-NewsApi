import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeNewsCategory } from '../redux/selectedCategorySlice'

import { appTheme } from '../appTheme'

const CategoryItem = ({ item }) => {
    const categoryId = useSelector(state => state.selectedCategoryId.catId)
    const dispatch = useDispatch()

    const getIdHandler = () => {
        dispatch(changeNewsCategory(item?.id))
    }

    const getstyle = () => {
        if (item?.id == categoryId) {
            return {
                backgroundColor: '#fff',
                borderColor: appTheme.colors.primary,
                borderWidth: 1
            };
        }
        else {
            return {
                backgroundColor: '#fff'
            };
        }
    }
    return (
        <Pressable onPress={getIdHandler}>
            <View style={[styles.itemWrapper, getstyle()]}>
                {item && <Text style={styles.title}>{item?.attributes.name}</Text>}
            </View>
        </Pressable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderColor: appTheme.colors.primary,
        shadowColor: appTheme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 8,
        marginRight: 4,
        minWidth: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 12,
        color: appTheme.colors.primary
    }
})