import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
// Клік по іконці №1 веде на екран PostsScreen
// Клік по іконці №2 веде на екран CreatePostsScreen
// Клік по іконці №3 веде на екран ProfileScreen
// В хедері на екрані PostsScreen додати іконку для logout
const Tabs = createBottomTabNavigator();
function Posts() {
  return <PostsScreen />;
}

function CreatePosts() {
  return <CreatePostsScreen />;
}

function Profile() {
  return <ProfileScreen />;
}

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CreatePosts") {
            iconName = "add-circle";
          } else if (route.name === "Posts") {
            iconName = "grid-outline";
          } else if (route.name === "Profile") {
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
          backgroundColor: "fff",
        },
        tabStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
        },
      }}
    >
      <Tabs.Screen
        name="Posts"
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
      <Tabs.Screen name="CreatePosts" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default Home;
