import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacityBase } from "react-native";
const Tabs = createBottomTabNavigator();
export default function Home() {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CreatePostsScreen") {
            iconName = "add-circle";
          } else if (route.name === "PostsScreen") {
            iconName = "grid-outline";
          } else if (route.name === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "#212121CC",
        labelStyle: { display: "none" },
        style: {
          backgroundColor: "#fff",
          tabStyle: {
            height: 83,
            paddingTop: 9,
            paddingBottom: 34,
          },
        },
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 16 }}>
              <Icon name="log-out" color={"#BDBDBD"} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" color={"#212121CC"} size={24} />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
