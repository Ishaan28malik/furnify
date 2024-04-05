

import {TouchableOpacity, Image, Text, StyleSheet, View} from "react-native";

import { categoryData } from "./HomePage";
import { useNavigation } from "@react-navigation/native";
import { requestCategories, requestCategory } from "../store/slices/categorySlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useEffect } from "react";

import { requestProducts } from "../store/slices/productSlice";

import { CategoryType } from "../api/shop";

const Category = () => {
    const dispatch = useAppDispatch();
    
    const navigation = useNavigation();

    const { categories } = useAppSelector(state => state.category);
    
    useEffect(() => {
        dispatch(requestCategories());
    }, [])

    console.log("categories", categories);

    const handleCategory = (category:CategoryType) => {
        navigation.navigate('Products' as never);
        console.log("category", category);
        dispatch(requestCategory(category));
        dispatch(requestProducts());
    }

    return(
        <View>
            {categories.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => handleCategory(category)}>
                    <Image style={styles.categoryImage} source={{ uri: category.imageUrl }} />
                    <Text>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryItem: {
        marginRight: 20,
        alignItems: 'center',
    },
    categoryImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
})

export default Category;