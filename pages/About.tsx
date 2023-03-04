import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Button, View, Text } from "react-native";

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Table Talk</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button
        title="Go to Friends"
        onPress={() => navigation.navigate("Friends")}
      />
    </View>
  );
}
