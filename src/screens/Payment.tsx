import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image, Pressable } from 'react-native';
import Payment from '../assets/images/payment.png';
import Footer from '../assets/images/footer.png'; // Import Footer image
import { useNavigation } from '@react-navigation/native';

const PaymentForm: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const navigation = useNavigation();

    const handlePayment = () => {
        // console.log('Processing payment with card details:', { cardNumber, cardHolderName, cvv });
        const cardNumberRegex = /^[0-9]{16}$/; // Regex to validate card number (assuming 16 digits)
        const cvvRegex = /^[0-9]{3,4}$/; // Regex to validate CVV (assuming 3 or 4 digits)

        if (!cardNumberRegex.test(cardNumber)) {
            Alert.alert('Error', 'Please enter a valid card number.');
        } else if (!cvvRegex.test(cvv)) {
            Alert.alert('Error', 'Please enter a valid CVV.');
        } else if (!cardHolderName.trim()) {
            Alert.alert('Error', 'Please enter the card holder name.');
        } else {
            setPaymentSuccess(true);
        }
    };

    const image = { uri: "https://cdn.pixabay.com/photo/2021/09/20/08/55/credit-card-6640238_1280.png" };

    if (paymentSuccess) {
        return (
           <View  style={styles.container}>
             <View style={styles.successContainer}>
                <Image source={Payment} style={{ width: 100, height: 100 }} />
                <Text style={styles.successText}>Payment Successful!</Text>
            </View>
                <Pressable style={styles.footer} onPress={() => navigation.navigate('HomePage' as never)}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
           </View>
        );
    }

    return (
        <View style={styles.container}>
           <View style={{padding: 25}}>
           <Image style={styles.saleImage} source={image} />
            <View style={{ marginTop: '20%' }}>
                <TextInput
                    placeholder="Card Number"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    style={styles.input}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Card Holder Name"
                    value={cardHolderName}
                    onChangeText={setCardHolderName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="CVV"
                    value={cvv}
                    onChangeText={setCvv}
                    style={styles.input}
                    keyboardType="numeric"
                    secureTextEntry
                />
                <Button title="Pay Now" onPress={handlePayment} />
            </View>
           </View>
            <Pressable style={styles.footer} onPress={() => navigation.navigate('HomePage' as never)}>
                <Image source={Footer} style={styles.footerImage} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightblue',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
        color: 'blue'
    },
    successContainer: {
        padding: 20,
        alignItems: 'center',
        marginTop: 100,
        height: '100%',
        width: '100%',
    },
    successText: {
        fontSize: 22,
        color: 'blue',
        marginTop: 30
    },
    saleImage: {
        width: 300,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
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

export default PaymentForm;
