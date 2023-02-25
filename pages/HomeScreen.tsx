import { useNavigation } from "@react-navigation/native";
import React, { createRef, useContext, useEffect, useState } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../util/firebase";
import { AuthContext } from "../navigation/AuthNavigator";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../util/firebase";

export interface Question {
  data: string,
  id: string
}

export default function HomeScreen({}) {
  const navigation = useNavigation();
  const user = useContext(AuthContext);
  const [questions, setQuestions] = useState<Question[]>([])

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
        console.log(doc.id, " => ", doc.data());
        questionsData.push({ id: doc.id, data: doc.data() });
      });
      setQuestions(questionsData);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}!</Text>
      <Button
        title="Question Of The Day"
        onPress={() => navigation.navigate("Submission", { question: questions[0]})}
      />
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("About")}
      />
      <Button title="Go to Feed" onPress={() => navigation.navigate("Feed")} />
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
    backgroundColor: "#ADD8E6",
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
  input: {
    width: 200,
    height: 70,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
});
