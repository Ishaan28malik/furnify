



import { Text, Image, View, StyleSheet } from "react-native"
import CustomButton from "../components/CustomButton"
import { useRoute } from "@react-navigation/native"

type productProps = {
    navigation: any
} 

const ProductDetail = ({ navigation }: productProps) => {

    const { params } = useRoute();
    const product = params?.product;

    const onAddtoCart = () => {
        console.log("onAddtoCart")
    }

    console.log("params product", product);

    return(
        <View style={styles.container}>
            <View style={styles.prdImg}>
                {/* <Text>product img</Text> */}
                <Image style={styles.prdImg} source={{ uri: `${product?.thumbnail}` }} />
            </View>
            <View style={styles.prdDetails}>
                <View style={styles.prdDetails}>
                    <Text style={styles.text}>{product.title}</Text>
                    <Text style={styles.text}>{product.price}</Text>
                    <Text style={styles.text}>{product.description}</Text>
                </View>
            </View>
            <View style={styles.btnStyle}>
                <CustomButton title="Add to cart" backgroundColor="black" onPress={onAddtoCart} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        gap: 20,
        backgroundColor: "#fff"
    },
    prdImg: {
        backgroundColor: 'lightgray',
        height: 200,
        width: 200
    },
    prdDetails: {
        gap: 10,

    },
    text: {
        fontSize: 16
    },
    btnStyle: {
        justifyContent: 'flex-end'
    }
})

export default ProductDetail;