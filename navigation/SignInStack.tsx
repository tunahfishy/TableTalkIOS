import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import AboutScreen from "../pages/About";
import Feed from "../pages/Feed";
import PostScreen from "../pages/PostScreen";
import SubmissionScreen from "../pages/Submission";
import FriendsScreen from "../pages/FriendsScreen";
import { Text, StyleSheet, Pressable, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "",
          headerTitleStyle: { color: "#583C2C", fontSize: 24 },
          headerStyle: {
            backgroundColor: "#D8CCC4",
          },
          headerTintColor: "black",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={({ navigation }) => ({
            title: "Table Talk",
            headerLeft: () => (
              <Pressable
              // onPress={() => navigation.navigate("Submission" as never)}
              >
                <MaterialCommunityIcons
                  name="book"
                  style={styles.header}
                  size={32}
                  color={"#583C2C"}
                />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Friends" as never)}
              >
                <MaterialCommunityIcons
                  name="account"
                  style={styles.header}
                  size={32}
                  color={"#583C2C"}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
});
