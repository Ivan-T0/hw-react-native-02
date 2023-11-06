import "react-native-gesture-handler";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home/Home";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Registration"
        options={{ headerShown: false }}
      >
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
