import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import LoginScreen from "./LoginScreen";
import ConversationListScreen from "./ConversationList";
import ChatRoomScreen from "./ChatRoom";
import HomeScreen from "./Home";
import HomeNewScreen from "./WelcomePage";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";

const FurnitureApp = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomePage'>
          <Stack.Screen name='WelcomePage' component={WelcomePage} />
          <Stack.Screen name='HomePage' component={HomePage} />
          {/* <Stack.Screen name='ConversationList' component={ConversationListScreen} /> */}
          {/* <Stack.Screen name='ChatRoom' component={ChatRoomScreen} options={({ route }) => ({ title: 'Group' + route.params?.groupId })}  /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default FurnitureApp