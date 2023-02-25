import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PostBox({ post }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Post", { post: post });
      }}
    >
      <Text style={styles.text}>{post.content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
});
