import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { Component, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
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
        navigation.navigate("Home");
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
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(name) => setName(name)}
      />
      <Button title="Create Profile" onPress={handleSignUp} />
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

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
