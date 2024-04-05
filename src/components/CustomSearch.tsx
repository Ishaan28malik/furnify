

import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type searchProps = {
    value?: string | "",
    updateSearch: (value: string) => void
}

const SearchInput = ({ value, updateSearch }: searchProps) => {

    const [searchText, setText] = useState(value || "");

    const setValue = (value: string) => {
        setText(value);
        updateSearch(value);
    }

    return(
        <View style={styles.searchContainer}>
            <TextInput value={searchText} 
                placeholder="Search product by name"
                onChangeText={(value) => setValue(value)}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10
    },
})

export default SearchInput;