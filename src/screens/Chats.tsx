import React from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SearchChat from '../components/SearchChat';
import {COLORS} from '../theme/colors';
import {ChatItem} from '../components';
import {useAppSelector} from '../hooks/useAppSelector';
import {GroupType, UserType, setOpenedConversation} from '../store/chatSlice';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../hooks/useAppDispatch';

const Chats = () => {
  const {groups, currentUser} = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  if (!currentUser) {
    return;
  }
  const allowedGroups = getAllowedGroups(currentUser, groups);

  const handleChatClick = (group: GroupType) => {
    dispatch(setOpenedConversation(group));
    navigation.navigate('Conversation' as never);
  };

  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 15}}>
        <SearchChat />
      </View>
      <FlatList
        data={allowedGroups}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor={COLORS.gray[100]}
            onPress={() => handleChatClick(item)}>
            <ChatItem
              title={item.title}
              lastMessage={item.messages[item.messages.length - 1].content}
              imageUrl={item.imageUrl}
            />
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

const getAllowedGroups = (currentUser: UserType, groups: GroupType[]) => {
  const allowedGroups = groups.filter(group =>
    group.members.includes(currentUser.id),
  );

  return allowedGroups;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
});

export default Chats;
