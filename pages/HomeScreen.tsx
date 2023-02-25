import { useNavigation } from "@react-navigation/native";
import React, { createRef, useContext, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../util/firebase";
import { AuthContext } from "../navigation/AuthNavigator";
import addToCollection from "../util/addToCollection";

export default function HomeScreen({}) {
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    // Add a new document in collection "posts"
    addToCollection("posts", {
      content: text,
      author: user?.uid,
      comments: [],
      likes: [],
      // timestamp:
    });
  };

  async function logOut() {
    try {
      await auth.signOut();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}!</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
      <Button title="Go to Feed" onPress={() => navigation.navigate("Feed")} />
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
    backgroundColor: "#ADD8E6",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
    color: "black",
  },
  button: {
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 160,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    width: 200,
    height: 70,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
});
