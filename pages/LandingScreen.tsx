import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Talk</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>{"Log In"}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={styles.buttonText}>{"Sign Up"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8CCC4",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#291C14",
    fontSize: 38,
    paddingBottom: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    maxHeight: 200,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: 200,
    borderRadius: 32,
    elevation: 3,
    backgroundColor: "#583C2C",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
});
