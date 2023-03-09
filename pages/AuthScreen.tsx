import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen({}) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User signed in successfully");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={"Email"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{"Log In"}</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Sign Up" as never)}>
        <Text style={styles.signUp}>{"Sign Up"}</Text>
      </Pressable>
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
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 12,
    margin: 12,
  },
  signUp: {
    color: "#583C2C",
    textDecorationLine: "underline",
    fontSize: 20,
    paddingTop: 10,
  },
});
