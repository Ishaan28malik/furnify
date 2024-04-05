

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
    const { params } = useRoute();
    const searchQuery = params?.searchQuery || "";

    const [updatedPrds, setPrds] = useState(products);

    // const [products, setProducts] = useState([]);
    // const params = 

    useEffect(() => {
      let updatedPrds = products.filter((prd) => (prd.title.indexOf(searchQuery) >=0 ))
      setPrds(updatedPrds)
    }, [searchQuery])
    console.log("=======categoryDetail", categoryDetail);

    return(
        <View style={styles.container}>
            {searchQuery ?
              <View>
                <Text style={styles.searchBy}>Search by: {searchQuery}</Text>
              </View> :
              <Text>Category</Text>
            }
            <ScrollView>
              <View style={styles.productListWrapper}>
                  {updatedPrds?.map((product, index) => {
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
    searchBy: {
      backgroundColor: 'black',
      color: "#fff",
      padding: 10
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