import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import { useEffect } from "react";

const image = { uri: 'https://www.ikea.com/ext/ingkadam/m/73e50cb0c61c4348/original/UGC100002336.jpg' };

const WelcomePage = ({ }) => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('HomePage' as never);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={{ marginLeft: '35%', marginBottom: '85%' }}>
                    <Text>{"Make Your"}</Text>
                    <Text style={{ fontSize: 24 }}>{"Home Beautiful"}</Text>
                    <Text style={{ color: 'grey' }}>{"ORDER NOW"}</Text>
                </View>
            </ ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default WelcomePage