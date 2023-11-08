import "react-native-gesture-handler";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import MapScreen from "../Screens/MapScreen/MapScreen";
import CommentsScreen from "../Screens/CommentsScreen/CommentsScreen";
import RegistrationScreen from "../Screens/RegistrationScreen/RegistrationScreen";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PostsScreen from "./PostsScreen/PostsScreen";
import Home from "../Screens/Home/Home";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function App() {
  const MainStack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../Screens/Fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../Screens/Fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            title: "Коментарі",
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-left" color={"#212121CC"} size={24} />
              </TouchableOpacity>
            ),
            tabBarStyle: { display: "none" },
          })}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
