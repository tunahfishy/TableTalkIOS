import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function PostBox({ post }) {
  return (
    <View style={styles.container}>
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
