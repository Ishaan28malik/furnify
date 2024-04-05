import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

type itemProps = {
    item: any
}

const ProductItem = ({ item }: itemProps) => {

    const navigation = useNavigation();

    console.log("item new", item);
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product' as never)}>
                <Text>{item.title}</Text>
                <Image source={{ uri: `${item.thumbnail}`}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        padding: 20,
        width: 150,
        height: 150
    }
})

export default ProductItem;