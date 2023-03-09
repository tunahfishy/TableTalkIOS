import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import addToCollection from "../util/addToCollection";
import { auth } from "../util/firebase";
import { User } from "../util/types";

export default function CreateProfile({}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        const userObject: User = {
          name: name,
          email: email,
          friends: [],
        };
        addToCollection("users/", userObject);
        navigation.navigate("Home" as never);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={"Email"}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={name}
        placeholder={"Name"}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{"Create Profile!"}</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("Login" as never)}>
        <Text style={styles.signUp}>{"Log In"}</Text>
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
    color: "#3E2A1E",
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
