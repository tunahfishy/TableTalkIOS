import { useNavigation } from "@react-navigation/native";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import fetchFromCollection from "../util/fetchFromCollection";
import { Question } from "./HomeScreen";

export default function PostScreen({ route }) {
  const navigation = useNavigation();
  const { post } = route.params;
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    console.log(post.question.path);
    const questionInfo = fetchFromCollection(post.question.path);
    questionInfo.then((question) => {
      setQuestion(question.data() as Question);
      console.log(question);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question?.text}</Text>
      <Text style={styles.text}>{post.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    padding: 26,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
  },
  question: {
    fontStyle: "italic",
    fontSize: 20,
    paddingBottom: 12,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    paddingTop: 12,
    paddingBottom: 12,
  },
});
