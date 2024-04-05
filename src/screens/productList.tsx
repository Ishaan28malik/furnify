

import { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native"

import ProductItem from "./productItem";
import List from "../components/CustomList";
import { useAppSelector } from "../hooks/useAppSelector";
import { useRoute } from "@react-navigation/native";

type productListProps = {
    navigation: any
} 

const ProductList = ({ navigation }: productListProps) => {

    const { categoryDetail } = useAppSelector(state => state.category);
    const { products } = useAppSelector(state => state.product)
    const params = useRoute();

    // const [products, setProducts] = useState([]);
    // const params = 

    // console.log("categoryDetail", categoryDetail, products, params);

    return(
        <View style={styles.container}>
            <Text>Category</Text>
                <ScrollView>
            <View style={styles.productListWrapper}>
                {products?.map((product, index) => {
                    return (
                      <ProductItem item={product} />
                    )
                })}
                {/* <List data={products['products']} Item={ProductItem} navigation={navigation} /> */}
            </View>
                </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productListWrapper: {
      // flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 20,
      padding: 10,
      justifyContent: 'center'
    }
})

export default ProductList;