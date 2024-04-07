

import { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

import ProductItem from "./productItem";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProductList = () => {

    const navigation = useNavigation();
    const { categoryDetail } = useAppSelector(state => state.category);
    const { products } = useAppSelector(state => state.product)
    const { params } = useRoute();
    const searchQuery = params?.searchQuery || "";

    const [updatedPrds, setPrds] = useState(products);
    const [toggleFilter, setToggle] = useState(false);
    const [filter, setFilter] = useState("ascending");

    useEffect(() => {
      let updatedPrdList = updatedPrds.filter((prd) => (
        prd.category_id === categoryDetail?.id
      ))
      setPrds(updatedPrdList)
    }, [categoryDetail])

    useEffect(() => {
      let updatedPrdList = updatedPrds.filter((prd) => (prd.title.indexOf(searchQuery) >=0))
      updatedPrdList = updatedPrdList.sort((prd_a, prd_b) => prd_a.price - prd_b.price)
      setPrds(updatedPrdList)
    }, [searchQuery])

    const setFilterBy = (filterBy:string) => {
      console.log("filterBy", filterBy);
      setFilter(filterBy);
      setToggle(!toggleFilter);
      let updatedPrdList;
      updatedPrdList = (filter === "ascending") ? updatedPrds.sort((prd_a, prd_b) => prd_b.price - prd_a.price) : 
        updatedPrds.sort((prd_a, prd_b) => prd_a.price - prd_b.price);
      setPrds(updatedPrdList)
    }

    return(
        <View style={styles.container}>
            {searchQuery ?
              <View>
                <Text style={styles.searchBy}>Search by: {searchQuery}</Text>
              </View> :
              <Text style={styles.categoryTitle}>Selected Category: {categoryDetail?.name}</Text>
            }
            <View>
              <TouchableOpacity onPress={() => setToggle(!toggleFilter)}>
                <Text style={styles.filterContent}>Filter</Text>
              </TouchableOpacity>
            </View>
            {toggleFilter &&
            <View style={styles.filterOption}>
              <TouchableOpacity onPress={() => setFilterBy("ascending")}>
                <Text style={filter === "ascending" && styles.activeFilter}>Sort by Price </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterBy("descending")}>
                <Text style={filter === "descending" && styles.activeFilter}>Sort by Price </Text>
              </TouchableOpacity>
            </View>
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
        padding: 10,
        gap: 20
    },
    filterContent: {
      position: 'relative'
    },
    searchBy: {
      backgroundColor: 'black',
      color: "#fff",
      padding: 10
    },
    categoryTitle: {
      fontSize: 16,
      fontWeight: '500'
    },
    filterOption: {
      zIndex: 3,
      position: 'absolute',
      top: 70,
      width: 200,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'lightgray',
      padding: 10,
      gap: 15
    },
    productListWrapper: {
      // flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center'
    },
    activeFilter: {
      color: '#E29547'
    }
})

export default ProductList;