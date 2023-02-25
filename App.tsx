import { StyleSheet } from "react-native";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./navigation/AuthNavigator";

const Stack = createStackNavigator();

export default function App() {
  return <AuthNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#2353",
    flexDirection: "column",
  },
  item: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    color: "#000000",
    fontSize: 45,
    fontStyle: "italic",
    margin: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
  },
});
