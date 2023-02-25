import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../pages/HomeScreen";
import AboutScreen from "../pages/About";
import Feed from "../pages/Feed";
import PostScreen from "../pages/PostScreen";
import SubmissionScreen from "../pages/Submission";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function SignInStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            // headerTitle: (props) => <Text {...props}>Hi</Text>,
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
