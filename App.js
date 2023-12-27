import "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/LoginScreen/LoginScreen";
import MapScreen from "./src/MapScreen/MapScreen";
import CommentsScreen from "./src/CommentsScreen/CommentsScreen";
import RegistrationScreen from "./src/RegistrationScreen/RegistrationScreen";
import { useFonts } from "expo-font";

import Home from "./src/Home/Home";
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
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
      </PersistGate>
    </Provider>
  );
}
