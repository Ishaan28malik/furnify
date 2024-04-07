import React, { useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import CustomButton from "../components/CustomButton";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { updateQuantity, addToCart, updateTotalPrice } from "../store/slices/cartSlice";
import Footer from '../assets/images/footer.png';

type productProps = {
    navigation: any
};

const ProductDetail = ({ navigation }: productProps) => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector(state => state.cart);
    const { params } = useRoute();
    const product = params?.product;

    const onAddtoCart = () => {
        let updatePrd;
        let prd = findProduct();
        if (prd?.quantity) {
            dispatch(updateQuantity({ productID: prd.id, quantity: prd.quantity + 1 }));
            dispatch(updateTotalPrice());
        } else {
            updatePrd = {
                ...product,
                'quantity': 1,
                'totalPrice': product.price
            };
            dispatch(addToCart(updatePrd));
            dispatch(updateTotalPrice());
        }
    };

    const findProduct = () => {
        let prd = items.find(prd => (prd.id === product.id));
        return prd ? prd : product;
    };

    const addQuantity = () => {
        let prd = findProduct();
        dispatch(updateQuantity({ productID: prd.id, quantity: prd.quantity + 1 }));
        dispatch(updateTotalPrice());
    };

    const decreaseQuantity = () => {
        let prd = findProduct();
        if (prd.quantity > 0) {
            dispatch(updateQuantity({ productID: prd.id, quantity: prd.quantity - 1 }));
            dispatch(updateTotalPrice());
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.prdImg}>
                <Image style={styles.prdImg} source={{ uri: `${product?.thumbnail}` }} />
            </View>
            <View style={styles.prdDetails}>
                <View style={styles.prdInfo}>
                    <View style={styles.basicInfo}>
                        <Text style={styles.text}>{product.title}</Text>
                        <Text style={styles.priceStyle}>₹{product.price}</Text>
                    </View>
                    {findProduct()?.quantity &&
                        <View style={styles.cartInfo}>
                            <TouchableOpacity onPress={decreaseQuantity}>
                                <Text style={styles.quantityStyle}>-</Text>
                            </TouchableOpacity>
                            <Text>{findProduct()?.quantity}</Text>
                            <TouchableOpacity onPress={addQuantity}>
                                <Text style={styles.quantityStyle}>+</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <View>
                    <Text style={styles.descStyle}>{product.description}</Text>
                </View>
                <View style={styles.btnStyle}>
                    <CustomButton title="Add to cart" backgroundColor="black" onPress={onAddtoCart} />
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Cart' as never)} style={styles.footer}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    prdImg: {
        backgroundColor: 'white',
        height: 200,
        width: '100%',
    },
    prdDetails: {
        flex: 1,
        gap: 10,
        borderWidth: 2,
        borderColor: 'lightgrey',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20
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
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 18
    },
    priceStyle: {
        color: "#E29547",
        fontWeight: '600',
        fontSize: 20
    },
    btnStyle: {
        marginTop: '40%'
    },
    descStyle: {
        color: "#AAAAAA",
        fontWeight: '500',
        fontSize: 16
    },
    quantityStyle: {
        borderWidth: 1,
        borderColor: '#E29547',
        color: '#E29547',
        width: 20,
        height: 20,
        borderRadius: 5,
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    footerImage: {
        width: '100%',
        height: 30,
    },
});

export default ProductDetail;
