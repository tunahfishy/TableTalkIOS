import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as React from "react";
import AuthComponent from "./AuthComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
// import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<null>(null);
  const auth = getAuth();
  // const navigation = useNavigation();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // navigation.navigate("Main");
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // navigation.navigate("Login");
    }
  });

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
    //     <Stack.Screen name="Login" component={AuthComponent} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={styles.container}>
      <Text style={styles.text}>Table Talk</Text>
      {/* <View style={styles.container}><Text style={styles.text}>Table Talk</Text></View> */}
      {user ? <View>Table Talk</View> : <AuthComponent />}
    </View>
  );
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
