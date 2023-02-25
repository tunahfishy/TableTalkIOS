import * as React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "../util/firebase";
import { useState } from "react";

const AuthScreen = () => {
  if (app) {
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

    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User account created successfully");
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Table Talk</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Fail!</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    flexDirection: "column",
  },
  text: {
    color: "#000000",
    fontSize: 21,
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
    padding: 8,
  },
});

export default AuthScreen;
