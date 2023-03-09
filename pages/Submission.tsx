import { useNavigation } from "@react-navigation/native";
import { serverTimestamp, getFirestore } from "firebase/firestore";
import React, { Component, useContext, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../navigation/AuthNavigator";
import addToCollection from "../util/addToCollection";
import { app } from "../util/firebase";
import getUser from "../util/getUser";

const db = getFirestore(app);

export default function SubmissionScreen({ route }) {
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  const { question } = route.params;
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    getUser(user).then((userData) => {
      // Add a new document in collection "posts"
      addToCollection("posts", {
        content: text,
        author: userData?.userId,
        comments: [],
        likes: [],
        question: question.id,
        // timestamp: serverTimestamp()
      });
      navigation.navigate("Feed" as never);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Question: {question.data.text}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8CCC4",
    flex: 1,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    padding: 16,
  },
  input: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 8,
    // backgroundColor: "white",
  },
});
