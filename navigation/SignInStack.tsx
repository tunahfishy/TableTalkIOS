import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import AboutScreen from "../pages/About";
import Feed from "../pages/Feed";
import PostScreen from "../pages/PostScreen";
import SubmissionScreen from "../pages/Submission";
import FriendsScreen from "../pages/FriendsScreen";

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
