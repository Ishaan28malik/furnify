import React, { useEffect } from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { requestCategories, requestCategory } from "../store/slices/categorySlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { requestProducts } from "../store/slices/productSlice";
import { CategoryType } from "../api/shop";
import Footer from '../assets/images/footer.png';

const Category = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { categories } = useAppSelector(state => state.category);

    useEffect(() => {
        dispatch(requestCategories());
    }, []);

    const handleCategory = (category: CategoryType) => {
        navigation.navigate('Products' as never);
        dispatch(requestCategory(category.id));
        dispatch(requestProducts());
    }

    const renderCategoryItem = ({ item }: { item: CategoryType }) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategory(item)}>
            <Image style={styles.categoryImage} source={{ uri: item.imageUrl }} />
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    const onCartPage = () => {
        navigation.navigate('Cart' as never);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.subHeader}>Explore What</Text>
                <Text style={styles.subHeader}>Your Home Needs</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.subContainer}
            />
            <Pressable onPress={onCartPage} style={styles.footer}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        paddingHorizontal: 25,
        paddingVertical: 25,
        marginBottom: 25
    },
    subContainer: {
        paddingHorizontal: 10,
        paddingBottom: 80,
        paddingTop: 5,
        gap: 32,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        padding: 20,
        borderRadius: 25,
        borderWidth: 1
    },
    categoryImage: {
        width: 150,
        height: 150,
        marginBottom: 5,
        borderRadius: 25,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    footerImage: {
        width: '100%',
        height: 40,
    },
});

export default Category;
