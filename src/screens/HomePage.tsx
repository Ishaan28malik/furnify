import { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchInput from "../components/CustomSearch";

export const categoryData = [
    { title: 'Sofas', imageUrl: 'https://www.ikea.com/global/assets/range-categorisation/images/product/furniture-fu001.jpeg' },
    { title: 'Chairs', imageUrl: 'https://www.ikea.com/in/en/images/products/nisse-folding-chair-black__0728163_pe736118_s5.jpg' },
    { title: 'Tables', imageUrl: 'https://www.ikea.com/in/en/images/products/sandsberg-table-black__1074348_pe856162_s5.jpg' },
    { title: 'Cupboards', imageUrl: 'https://www.ikea.com/in/en/images/products/baggebo-cabinet-with-door-white__1016757_pe830615_s5.jpg' },
];

const HomePage = ({}) => {

    const navigation = useNavigation();

    const getSearchData = (value: string) => {
        console.log("search data", value)

    }

    return (
        <ScrollView style={styles.container}>
             <Text style={styles.subHeader}>Explore What</Text>
            <Text style={styles.subHeader}>Your Home Needs</Text>
            <View>
                <SearchInput updateSearch={getSearchData}/>
            </View>
            <View>
                <Text style={styles.categoryHeading}>Categories</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Category' as never)}>
                    <Text>See all</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={styles.categoryList}>
                {categoryData.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => navigation.navigate('Products' as never)}>
                        <Image style={styles.categoryImage} source={{ uri: category.imageUrl }} />
                        <Text>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Image
                style={styles.footerImage}
                source={{ uri: 'footer_image_url' }}
                />
        <Image
            style={styles.footerImage}
            source={{ uri: 'footer_image_url' }}
        />
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    categoryList: {
        flexDirection: 'row',
    },
    categoryItem: {
        marginRight: 20,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
        marginLeft: 20
    },
    footerImage: {
        width: '100%',
        height: 150, // Adjust as needed
        marginTop: 20,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});

export default HomePage