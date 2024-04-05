import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native"
import { RootStackParamList } from "../../App";
import { useEffect } from "react";

const image = { uri: 'https://www.ikea.com/ext/ingkadam/m/73e50cb0c61c4348/original/UGC100002336.jpg' };

interface HomeScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'HomePage'>;
}

const WelcomePage = ({ navigation }: HomeScreenProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('HomePage');
        }, 2000); // Change to the desired time in milliseconds (e.g., 5000 for 5 seconds)

        return () => clearTimeout(timeout);
    }, []);
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={{ marginLeft: '35%',marginBottom: '85%' }}>
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