import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, WelcomePage } from "../screens";
import ProductList from "../screens/productList";
import ProductDetail from "../screens/productDetails";
import Category from "../screens/CategoryList";
import CartPage from "../screens/Cart";
import PaymentForm from "../screens/Payment";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomePage'>
          <Stack.Screen name='WelcomePage' component={WelcomePage} />
          <Stack.Screen name='HomePage' component={HomePage} options={
            {
              headerShown: false
            }
          }/>
          <Stack.Screen name="Category" component={Category}/>
          <Stack.Screen name="Products" component={ProductList} />
          <Stack.Screen name="Product" component={ProductDetail}/>
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Payment" component={PaymentForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
