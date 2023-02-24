import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { AuthContext } from "../navigation/AuthNavigator";

export default function HomeScreen({}) {
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  console.log(user);

  async function logOut() {
    try {
      await auth.signOut()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}!</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Sign out 🤷</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe2ff",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
    color: "#7f78d2",
  },
  button: {
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 160,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#481380",
  },
  buttonText: {
    color: "#ffe2ff",
    fontSize: 24,
    marginRight: 5,
  },
});
