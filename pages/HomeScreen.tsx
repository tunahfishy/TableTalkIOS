import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../util/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../util/firebase";
import { Question } from "../util/types";

export default function HomeScreen({}) {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState<Question[]>([]);

  async function logOut() {
    try {
      await auth.signOut();
    } catch (e) {
      console.error(e);
    }
  }

  const db = getFirestore(app);
  const questionsRef = collection(db, "questions");

  useEffect(() => {
    getDocs(questionsRef).then((querySnapshot) => {
      const questionsData: Question[] = [];
      querySnapshot.forEach((doc: any) => {
        questionsData.push({ id: doc.id, data: doc.data() });
      });
      setQuestions(questionsData);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the table!</Text>
      <Button
        title="Question Of The Day"
        onPress={() =>
          navigation.navigate("Submission" as never, { question: questions[0] } as never)
        }
      />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About" as never)}
      />
      <Button title="Go to Feed" onPress={() => navigation.navigate("Feed" as never)} />
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
    backgroundColor: "#D8CCC4",
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
});
