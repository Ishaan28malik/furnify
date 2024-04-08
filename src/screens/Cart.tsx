import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigation } from "@react-navigation/native";
import { updateQuantity, removeItemFromCart, updateTotalPrice } from "../store/slices/cartSlice";
import CustomButton from "../components/CustomButton";
import Footer from '../assets/images/footer.png'; // Import Footer image

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const { items, grandTotal } = useAppSelector(state => state.cart);

    const addQuantity = (prd) => {
        dispatch(updateQuantity({ productID: prd.id, quantity: prd.quantity + 1 }));
        dispatch(updateTotalPrice());
    };

    const decreaseQuantity = (prd) => {
        if(prd.quantity - 1 == 0) {
            dispatch(removeItemFromCart(prd.id));
            dispatch(updateTotalPrice());
        }
        else {
            dispatch(updateQuantity({ productID: prd.id, quantity: prd.quantity - 1 }));
            dispatch(updateTotalPrice());
        }
    };

    const onDeleteCartItem = (prd) => {
        dispatch(removeItemFromCart(prd.id));
        dispatch(updateTotalPrice());
    };

    const onPaymentPage = () => {
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.cartTitle}>My Shopping Bag</Text>
            <View style={styles.cartWrapper}>
                {items.map((cartItem) => {
                    return (
                        <View style={styles.cartItem} key={cartItem.id}>
                            <View>
                                <Image style={styles.imgStyle} source={{ uri: `${cartItem.thumbnail}` }} />
                            </View>
                            <View style={styles.cartInfoWrapper}>
                                <Text>{cartItem.title}</Text>
                                <Text>Qty: {cartItem.quantity}</Text>
                                <View style={styles.cartInfo}>
                                    <TouchableOpacity onPress={() => decreaseQuantity(cartItem)}>
                                        <Text style={styles.quantityStyle}>-</Text>
                                    </TouchableOpacity>
                                    <Text>{cartItem.quantity}</Text>
                                    <TouchableOpacity onPress={() => addQuantity(cartItem)}>
                                        <Text style={styles.quantityStyle}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.deleteCart}>
                                <TouchableOpacity onPress={() => onDeleteCartItem(cartItem)}>
                                    <Text style={styles.deleteIcon}>x</Text>
                                </TouchableOpacity>
                                <Text style={styles.price}>₹{cartItem.totalPrice}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
            {items.length > 0 ?
            <View style={styles.bottomStyle}>
                <View>
                    <Text>Total</Text>
                    <Text>₹{grandTotal}</Text>
                </View>
                <View style={{ marginLeft: 'auto' }}>
                    <CustomButton title="Proceed to checkout" backgroundColor="#000" onPress={onPaymentPage} />
                </View>
            </View> :
            <Text>Your cart is empty</Text>
}
            <Pressable style={styles.footer} onPress={() => navigation.navigate('HomePage')}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        gap: 20
    },
    bottomStyle: {
        flexDirection: 'row',
    },
    imgStyle: {
        width: 80,
        height: 80
    },
    cartTitle: {
        fontSize: 20
    },
    cartWrapper: {
        flexDirection: 'column',
        gap: 10
    },
    cartInfoWrapper: {
        gap: 10
    },
    cartItem: {
        flexDirection: 'row',
        borderColor: '#DEDEDE',
        borderBottomWidth: 1,
        gap: 20,
        paddingBottom: 20
    },
    cartInfo: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    deleteCart: {
        flexDirection: 'column',
        gap: 10,
    },
    price: {
        color: '#E29547'
    },
    deleteIcon: {
        color: '#E29547',
        borderWidth: 1,
        borderColor: '#E29547',
        color: '#E29547',
        width: 20,
        height: 20,
        borderRadius: 10,
        textAlign: 'center',
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

export default CartPage;
