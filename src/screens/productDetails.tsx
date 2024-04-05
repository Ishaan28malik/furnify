



import { Text, Image, View, StyleSheet } from "react-native"
import CustomButton from "../components/CustomButton"

type productProps = {
    navigation: any
} 

const ProductDetail = ({ navigation }: productProps) => {

    const onAddtoCart = () => {
        console.log("onAddtoCart")
    }

    return(
        <View style={styles.container}>
            <View style={styles.prdImg}>
                <Text>product img</Text>
            </View>
            <View style={styles.prdDetails}>
                <View style={styles.prdDetails}>
                    <Text style={styles.text}>Title</Text>
                    <Text style={styles.text}>Price</Text>
                    <Text style={styles.text}>Description</Text>
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
        gap: 20
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