



import { Text, Image, View, StyleSheet } from "react-native"
import CustomButton from "../components/CustomButton"
import { useRoute } from "@react-navigation/native"

type productProps = {
    navigation: any
} 

const ProductDetail = ({ navigation }: productProps) => {

    const { params } = useRoute();
    const product = params?.product;

    const [cart, setCart] = useState([]);

    const onAddtoCart = () => {
        console.log("onAddtoCart")
    }

    // console.log("params product", product);

    return(
        <View style={styles.container}>
            <View style={styles.prdImg}>
                {/* <Text>product img</Text> */}
                <Image style={styles.prdImg} source={{ uri: `${product?.thumbnail}` }} />
            </View>
            <View style={styles.prdDetails}>
                <View style={styles.prdInfo}>
                    <View style={styles.basicInfo}>
                        <Text style={styles.text}>{product.title}</Text>
                        <Text style={styles.priceStyle}>₹{product.price}</Text>
                    </View>
                    <View style={styles.cartInfo}>
                        <Text>cart</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.descStyle}>{product.description}</Text>
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
        flex: 1,
        gap: 10,

    },
    prdInfo: {
        flexWrap: 'wrap',
        flexDirection: "row"
    },
    basicInfo: {
        width: "50%",
        gap: 10
    },
    cartInfo: {
        width: "50%"
    },
    text: {
        fontSize: 16
    },
    priceStyle: {
        color: "#E29547",
        fontWeight: '600'
    },
    btnStyle: {
        justifyContent: 'flex-end'
    },
    descStyle: {
        color: "#AAAAAA"
    }
})

export default ProductDetail;