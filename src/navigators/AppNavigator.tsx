import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, WelcomePage } from "../screens";
import ProductList from "../screens/productList";
import ProductDetail from "../screens/productDetails";
import Category from "../screens/CategoryList";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomePage'>
          <Stack.Screen name='WelcomePage' component={WelcomePage} />
          <Stack.Screen name='HomePage' component={HomePage} options={
            {
              headerShown: false
            }
          }/>
          <Stack.Screen name="Category" component={Category}/>
          <Stack.Screen name="Products" component={ProductList} />
          <Stack.Screen name="Product" component={ProductDetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
