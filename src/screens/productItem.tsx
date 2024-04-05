import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

type itemProps = {
    item: any
}

const ProductItem = ({ item }: itemProps) => {

    const navigation = useNavigation();

    const getProducts = (item) => {
        console.log("currect item", item)
        navigation.navigate('Product', {'product': item});
    }

    // console.log("item new", item);
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={() => getProducts(item)}>
                <View style={styles.imgContainer}>
                    <Image style={styles.prdImg} source={{ uri: `${item.thumbnail}`}} />
                </View>
                <Text>{item.title}</Text>
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
        // width: 160,
        // height: 150,
        gap: 20,
        alignItems: 'center',
    },
    imgContainer: {
        backgroundColor: 'lightgray',
        height: 100,
        width: 100
    },
    prdImg: {
        width: "100%",
        height: '100%'
    }
})

export default ProductItem;