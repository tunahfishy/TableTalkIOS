import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AboutScreen from "../pages/About";
import Feed from "../pages/Feed";
import PostScreen from "../pages/PostScreen";
import SubmissionScreen from "../pages/Submission";
import FriendsScreen from "../pages/FriendsScreen";
import { Text, StyleSheet, Pressable, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Question } from "../util/types";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../util/firebase";
import ProfileScreen from "../pages/ProfileScreen";

const Stack = createStackNavigator();

export default function SignInStack() {
  const db = getFirestore(app);
  const questionsRef = collection(db, "questions");
  const [questions, setQuestions] = useState<Question[]>([]);

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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "",
          headerTitleStyle: { color: "#583C2C", fontSize: 24 },
          headerStyle: {
            backgroundColor: "#D8CCC4",
          },
          headerTintColor: "black",
        }}
      >
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={({ navigation }) => ({
            title: "Table Talk",
            headerLeft: () => (
              <Pressable
                onPress={() =>
                  navigation.navigate(
                    "Submission" as never,
                    { question: questions[0] } as never
                  )
                }
              >
                <MaterialCommunityIcons
                  name="book"
                  style={styles.header}
                  size={32}
                  color={"#583C2C"}
                />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Profile" as never)}
              >
                <MaterialCommunityIcons
                  name="account"
                  style={styles.header}
                  size={32}
                  color={"#583C2C"}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Submission" component={SubmissionScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Table Talk",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Friends" as never)}
            >
              <MaterialCommunityIcons
                name="account-sync"
                style={styles.header}
                size={32}
                color={"#583C2C"}
              />
            </Pressable>
          ),
        })}
         />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
  },
});
