import { useNavigation } from "@react-navigation/native";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import React, { Component, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import fetchFromCollection from "../util/fetchFromCollection";
import { Question, User } from "../util/types";

export default function PostScreen({ route }) {
  const navigation = useNavigation();
  const { post, question, author } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question?.text}</Text>
      <Text style={styles.text}>{post.content}</Text>
      <Text style={styles.text}>{author?.name}</Text>
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
