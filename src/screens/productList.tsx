import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductItem from "./productItem";
import { useAppSelector } from "../hooks/useAppSelector";
import Footer from '../assets/images/footer.png';

const ProductList = () => {
  const navigation = useNavigation();
  const { categoryDetail } = useAppSelector(state => state.category);
  const { products } = useAppSelector(state => state.product);
  const { params } = useRoute();
  const searchQuery = params?.searchQuery || "";

  const [updatedPrds, setPrds] = useState(products);
  const [toggleFilter, setToggle] = useState(false);
  const [filter, setFilter] = useState("ascending");

  useEffect(() => {
    let filteredProducts = products;

    // Filter by category if categoryDetail is available
    if (categoryDetail?.id) {
      filteredProducts = filteredProducts.filter(prd => prd.category_id === categoryDetail.id);
    }

    // Further filter by searchQuery if it exists
    if (searchQuery.trim() !== "") {
      filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPrds(filteredProducts);
    }

    // Apply sorting based on the current filter state
    filteredProducts.sort((prd_a, prd_b) => {
      if (filter === "ascending") {
        return prd_a.price - prd_b.price;
      } else {
        return prd_b.price - prd_a.price;
      }
    });

    setPrds(filteredProducts);
  }, [products, searchQuery, categoryDetail, filter]);

  const setFilterBy = (filterBy: string) => {
    setFilter(filterBy);
    setToggle(!toggleFilter);
    let updatedPrdList;
    updatedPrdList = (filter === "ascending") ? updatedPrds.sort((prd_a, prd_b) => prd_b.price - prd_a.price) :
      updatedPrds.sort((prd_a, prd_b) => prd_a.price - prd_b.price);
    setPrds(updatedPrdList);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 25, paddingTop: 10 }}>
        <Text style={styles.subHeader}>Explore What</Text>
        <Text style={styles.subHeader}>Your Home Needs</Text>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <TouchableOpacity onPress={() => setToggle(!toggleFilter)} style={{ marginTop: 25, marginBottom: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
          {searchQuery ?
            <View>
              {/* <Text style={styles.searchBy}>Search by: {searchQuery}</Text> */}
            </View> :
            <Text style={styles.categoryTitle}>{categoryDetail?.name}</Text>
          }
          <Text style={styles.filterContent}>{"Filter ->"}</Text>
        </TouchableOpacity>
      </View>
      {toggleFilter &&
        <View style={styles.filterOption}>
          <TouchableOpacity onPress={() => setFilterBy("ascending")}>
            <Text style={filter === "ascending" && styles.activeFilter}>Price : low to high </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterBy("descending")}>
            <Text style={filter === "descending" && styles.activeFilter}>Price : high to low</Text>
          </TouchableOpacity>
        </View>
      }
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.productListWrapper}>
          {updatedPrds?.map((product, index) => {
            return (
              <ProductItem item={product} key={index} />
            )
          })}
        </View>
      </ScrollView>
      <Pressable onPress={() => navigation.navigate('Cart' as never)} style={styles.footer}>
        <Image source={Footer} style={styles.footerImage} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5,
    gap: 20
  },
  filterContent: {
    position: 'relative',
    color: 'orange'
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
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
    top: 150,
    width: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    gap: 15,
    marginLeft: '50%'
  },
  productListWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center'
  },
  activeFilter: {
    color: '#E29547'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerImage: {
    width: '100%',
    height: 40,
  },
});

export default ProductList;
