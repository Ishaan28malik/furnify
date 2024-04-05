

import { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet } from "react-native"

import ProductItem from "./productItem";
import List from "../components/CustomList";

type productListProps = {
    navigation: any
} 

const ProductList = ({ navigation }: productListProps) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
      }, []);

      const fetchProducts = async () => {
        try {
          const response = await fetch('https://dummyjson.com/products/category/furniture');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      console.log("products in render", products);

    return(
        <View style={styles.container}>
            <Text>Category</Text>
            <View style={styles.productListWrapper}>
                {products?.products?.map((product, index) => {
                    return (
                      <ProductItem item={product} />
                    )
                })}
                {/* <List data={products['products']} Item={ProductItem} navigation={navigation} /> */}
            </View>
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
      padding: 10
    }
})

export default ProductList;