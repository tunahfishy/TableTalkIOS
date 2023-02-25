import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function PostScreen({ route }) {
  const navigation = useNavigation();
  const { post } = route.params;

  return (
    <View style={styles.container}>
      <Text>{post.content}</Text>
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
