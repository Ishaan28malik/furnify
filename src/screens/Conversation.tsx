import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {COLORS} from '../theme/colors';
import {useAppSelector} from '../hooks/useAppSelector';
import {ChatBubble} from '../components';
import {ArrowUp} from '../../assets/icons';
import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {sendMessage} from '../store/chatSlice';

const Conversation = () => {
  const {openedConversation, currentUser} = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  if (!openedConversation || !currentUser) {
    return;
  }

  const handleSendMessage = (message: string) => {
    if (message === '') return;
    dispatch(sendMessage(message));
  };

  const reversedMessages = [...openedConversation.messages.slice().reverse()];

  return (
    <>
      <FlatList
        data={reversedMessages}
        inverted
        contentContainerStyle={{
          gap: 10,
          marginTop: 8,
          marginHorizontal: 10,
          paddingTop: 80,
        }}
        renderItem={({item}) => {
          const isCurrentUserSender = item.senderId === currentUser.id;
          return (
            <ChatBubble
              sender={item.senderName}
              align={isCurrentUserSender ? 'right' : 'left'}
              timeStamp={item.timestamp}>
              <Text
                style={{
                  color: isCurrentUserSender ? '#fff' : '#000',
                  fontFamily: 'Inter-Regular',
                  fontSize: 15,
                  maxWidth: '80%',
                }}>
                {item.content}
              </Text>
            </ChatBubble>
          );
        }}
      />

      <ChatSendMessageInputWithoutBlur onSend={handleSendMessage} />
    </>
  );
};

export default Conversation;

const ChatSendMessageInputWithoutBlur = ({
  onSend,
}: {
  onSend: (message: string) => void;
}) => {
  const [message, setMessage] = React.useState<string>('');

  const handleSendMessage = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={90}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      contentContainerStyle={{
        padding: 200,
        margin: 200,
        height: 20,
      }}
      style={[
        styles.blurContainer,
        {
          backgroundColor: COLORS.gray[200],
        },
      ]}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="send message"
            value={message}
            style={styles.textInput}
            blurOnSubmit={false}
            onSubmitEditing={handleSendMessage}
            onChangeText={val => setMessage(val)}
          />
          <TouchableHighlight
            style={styles.sendBtn}
            onPress={handleSendMessage}
            disabled={message === ''}
            activeOpacity={0.9}
            underlayColor={COLORS.blue[400]}>
            <ArrowUp color={'#fff'} width={20} height={20} />
          </TouchableHighlight>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  container: {
    paddingTop: 8,
    paddingBottom: 18,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 20,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    paddingLeft: 6,
  },

  sendBtn: {
    backgroundColor: COLORS.blue[600],
    borderRadius: 999,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 2,
  },
});
