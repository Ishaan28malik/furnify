import React from "react"
import { FlatList, Text, View, StyleSheet } from "react-native"
// import Item from "../screens/chat/chatPage"

interface itemProps {
    name: string,
    recentMessage?: string,
    avatar?: string,
    id: number
}

type listProps = {
    Item: any,
    data: itemProps[],
    navigation: any
}

const List = ({ Item, data, navigation }: listProps) => {
    console.log("====data=====", data)
    return(
        <View style={styles.productListWrapper}>
            <FlatList 
                data={data}
                renderItem={({item}) => <Item item={item} navigation={navigation} />}
                keyExtractor={item => item.id.toString()}
                extraData={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productListWrapper: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'column',
      gap: 20,
      padding: 20
    }
})

export default List