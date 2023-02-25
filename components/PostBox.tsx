import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import fetchFromCollection from "../util/fetchFromCollection";
import { Question, User } from "../util/types";

export default function PostBox({ post }) {
  const navigation = useNavigation();
  console.log(post);
  const [question, setQuestion] = useState<Question>();
  const [author, setAuthor] = useState<User>();

  useEffect(() => {
    const questionInfo = fetchFromCollection(post.question.path);
    questionInfo.then((questionInfo) => {
      setQuestion(questionInfo.data() as Question);
    });
    console.log("here:", question);

    const authorInfo = fetchFromCollection(post.author.path);
    authorInfo.then((authorInfo) => {
      setAuthor(authorInfo.data() as User);
    });
    console.log("here:", author);
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Post", {
          post: post,
          question: question,
          author: author,
        });
      }}
    >
      {/* <Text style={styles.text}>{question?.text}</Text> */}
      <Text style={styles.text}>{post.content}</Text>
      <Text style={styles.author}>{author?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    padding: 16,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
  },
  author: {
    fontSize: 16,
  },
});
