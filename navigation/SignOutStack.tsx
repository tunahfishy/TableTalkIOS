import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../pages/AuthScreen";
import CreateProfile from "../pages/CreateProfile";
import LandingScreen from "../pages/LandingScreen";

const Stack = createStackNavigator();

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "",
          headerStyle: {
            backgroundColor: "#D8CCC4",
          },
          headerTintColor: "black",
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={AuthScreen} />
        <Stack.Screen name="Sign Up" component={CreateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
