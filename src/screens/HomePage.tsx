import { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const categoryData = [
    { title: 'Sofas', imageUrl: 'https://www.ikea.com/global/assets/range-categorisation/images/product/furniture-fu001.jpeg' },
    { title: 'Chairs', imageUrl: 'https://www.ikea.com/in/en/images/products/nisse-folding-chair-black__0728163_pe736118_s5.jpg' },
    { title: 'Tables', imageUrl: 'https://www.ikea.com/in/en/images/products/sandsberg-table-black__1074348_pe856162_s5.jpg' },
    { title: 'Cupboards', imageUrl: 'https://www.ikea.com/in/en/images/products/baggebo-cabinet-with-door-white__1016757_pe830615_s5.jpg' },
];

const HomePage = ({}) => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Furnify</Text>
            <TextInput />
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={query}
                    onChangeText={setQuery}
                    // onSubmitEditing is called when the user submits the keyboard (e.g., pressing "search" or "enter")
                    // onSubmitEditing={() => onSearch(query)}
                />
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity> */}
            </View>
            <Text style={styles.categoryHeading}>Categories</Text>
            <ScrollView horizontal={true} style={styles.categoryList}>
                {categoryData.map((category, index) => (
                    <View key={index} style={styles.categoryItem}>
                        <Image style={styles.categoryImage} source={{ uri: category.imageUrl }} />
                        <Text>{category.title}</Text>
                    </View>
                ))}
            </ScrollView>
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
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
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
    },
    categoryImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    footerImage: {
        width: '100%',
        height: 150,
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