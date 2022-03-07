import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native'
import { getCategories } from '../redux/categorySlice';
import CategoryItem from './CategoryItem'

const Categories = () => {
    const dispatch = useDispatch();
    const cat = useSelector(state => state.category.categoriesList)
    const allItem = {
        "id": 0,
        "attributes": {
            "name": "All",
        }
    }

    useEffect(() => {
        dispatch(getCategories())

    }, [dispatch])

    return (
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
            <CategoryItem item={allItem} />
            {cat && cat.map((category, index) => <CategoryItem key={index} item={category} />)}
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({
    scrollView: {
        margin: 8
    },
    itemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 4
    }

})