import { useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

type searchProps = {
    value?: string | "",
    updateSearch: (value: string) => void
}

const SearchInput = ({ value, updateSearch }: searchProps) => {
    const navigation = useNavigation();
    const [searchText, setText] = useState(value || "");

    const setValue = (value: string) => {
        setText(value);
        updateSearch(value);
    }

    const handleSearchIconPress = () => {
        navigation.navigate('Products', { searchQuery: searchText });
    }

    return(
        <View style={styles.searchContainer}>
            <TextInput value={searchText} 
                placeholder="Search by category"
                onChangeText={(value) => setValue(value)}
             />
              <TouchableOpacity onPress={handleSearchIconPress}>
                <Image source={{uri : "https://static.vecteezy.com/system/resources/previews/021/620/238/large_2x/magnifying-glass-cartoon-icon-illustration-flat-illustration-of-cute-magnifying-glass-cartoon-style-icon-free-vector.jpg"}} style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchIcon:{
        width: 20,
        height: 20
    }
})

export default SearchInput;