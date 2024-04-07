import { useNavigation } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

type itemProps = {
    item: any
}

const ProductItem = ({ item }: itemProps) => {
    const navigation = useNavigation();

    const getProducts = (item) => {
        navigation.navigate('Product', { 'product': item });
    }

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={() => getProducts(item)}>
                <View style={styles.imgContainer}>
                    <Image style={styles.prdImg} source={{ uri: `${item.thumbnail}` }} />
                </View>
                <View style={{ alignItems: 'flex-start', gap: 12 }} >
                    <Text style={{ fontSize: 12, fontWeight: '500', color: 'grey' }}>{item.title}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '800' }}>₹{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "gray",
        padding: 20,
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