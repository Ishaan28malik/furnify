

import {TouchableOpacity, Image, Text, StyleSheet, View} from "react-native";

import { categoryData } from "./HomePage";
import { useNavigation } from "@react-navigation/native";

const Category = () => {
    
    const navigation = useNavigation();

    return(
        <View>
            {categoryData.map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => navigation.navigate('Products' as never)}>
                    <Image style={styles.categoryImage} source={{ uri: category.imageUrl }} />
                    <Text>{category.title}</Text>
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