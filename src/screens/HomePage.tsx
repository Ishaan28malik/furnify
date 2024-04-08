import React from "react";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../components/CustomSearch";
import { useAppSelector } from "../hooks/useAppSelector";
import Footer from '../assets/images/footer.png';
import Sale from '../assets/images/sale.png';
import { useAppDispatch } from "../hooks/useAppDispatch";
import { requestCategory } from "../store/slices/categorySlice";

export const categoryData = [
    { title: 'Sofas', imageUrl: 'https://www.ikea.com/global/assets/range-categorisation/images/product/furniture-fu001.jpeg' },
    { title: 'Chairs', imageUrl: 'https://www.ikea.com/in/en/images/products/nisse-folding-chair-black__0728163_pe736118_s5.jpg' },
    { title: 'Tables', imageUrl: 'https://www.ikea.com/in/en/images/products/sandsberg-table-black__1074348_pe856162_s5.jpg' },
    { title: 'Cupboards', imageUrl: 'https://www.ikea.com/in/en/images/products/baggebo-cabinet-with-door-white__1016757_pe830615_s5.jpg' },
];

const HomePage = () => {
    const navigation = useNavigation();
    const [searchText, setSearch] = useState("");
    const dispatch = useAppDispatch();

    const { categories, categoryDetail } = useAppSelector(state => state.category);

    const onCartPage = () => {
        navigation.navigate('Cart' as never);
    }

    const showCategories = (categoryId: number) => {
        dispatch(requestCategory(categoryId));
        navigation.navigate('Products' as never)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={{ marginBottom: 25 }}>
                    <Text style={styles.subHeader}>Explore What</Text>
                    <Text style={styles.subHeader}>Your Home Needs</Text>
                </View>
                <View>
                    <SearchInput updateSearch={(searchText) => setSearch(searchText)} />
                </View>
                <View style={{ marginTop: 25, marginBottom: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={styles.categoryHeading}>Categories</Text>
                    <Text onPress={() => navigation.navigate('Category' as never)} style={{ color: 'orange' }}>{"See all ->"}</Text>
                </View>
                <ScrollView horizontal={true} style={styles.categoryList}>
                    {categories.map((category, index) => (
                        <Pressable key={index} style={styles.categoryItem} onPress={()=>showCategories(category.id)}>
                            <Text>{category.name}</Text>
                            <Image style={styles.categoryImage} source={{ uri: category.imageUrl }} />
                        </Pressable>
                    ))}
                </ScrollView>
                <Image style={styles.saleImage} source={Sale} />
            </ScrollView>
            <Pressable onPress={onCartPage} style={styles.footer}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
        padding: 25,
        marginTop: 65,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    categoryList: {
        flexDirection: 'row',
        padding: 20
    },
    categoryItem: {
        marginRight: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'lightgrey',
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
        marginLeft: 20
    },
    saleImage: {
        width: '100%',
        height: 110,
        marginTop: 50,
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

export default HomePage;
