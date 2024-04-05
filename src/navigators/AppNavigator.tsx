import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Chats, Conversation, Welcome} from '../screens';
import ChatHeader from '../components/headers/ChatHeader';
import {SafeAreaView} from 'react-native';
import ConversationHeader from '../components/headers/ConversationHeader';
import {useAppSelector} from '../hooks/useAppSelector';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {openedConversation} = useAppSelector(state => state.chat);

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}></Stack.Screen>
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{
              header: props => <ChatHeader {...props} />,
            }}></Stack.Screen>

          <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={{
              title: openedConversation?.title,
              header: props => <ConversationHeader {...props} />,
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
