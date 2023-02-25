import { collection, getFirestore, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { app } from "../util/firebase";

const db = getFirestore(app);
export interface Post {
  id: any;
  data: any;
}

export default function Feed({}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const postsRef = collection(db, "posts");

  useEffect(() => {
    getDocs(postsRef).then((querySnapshot) => {
      const postsData: Post[] = [];
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id, " => ", doc.data());
        postsData.push({ id: doc.id, data: doc.data() });
      });
      setPosts(postsData);
    });
  }, []);

  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <Text style={styles.title} key={post.id}>
          {post.data.content}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe2ff",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
    color: "#7f78d2",
  },
  button: {
    flexDirection: "row",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 160,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#481380",
  },
  buttonText: {
    color: "#ffe2ff",
    fontSize: 24,
    marginRight: 5,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 16,
    padding: 8,
  },
});
