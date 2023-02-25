import { useNavigation } from "@react-navigation/native";
import React, { Component, useContext, useState } from "react";
import { Button, View, Text, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../navigation/AuthNavigator";
import addToCollection from "../util/addToCollection";

export default function SubmissionScreen({ route }) {
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  const { question } = route.params;
  const [text, setText] = useState<string>("");
  console.log('id:', question.id)

  const handleSubmit = () => {
    // Add a new document in collection "posts"
    addToCollection("posts", {
      content: text,
      author: user?.uid,
      comments: [],
      likes: [],
      question: question.id
      // timestamp:
    });
    navigation.navigate("Feed");
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
    backgroundColor: "pink",
    borderWidth: 2,
    padding: 16,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    padding: 16,
  },
  input: {
    width: 200,
    height: 300,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
});
