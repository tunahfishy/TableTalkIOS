import { collection, getFirestore, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import { app } from "../util/firebase";
import PostBox from "../components/PostBox";
import { RefreshControl } from "react-native-gesture-handler";
import { PostObject } from "../util/types";

const db = getFirestore(app);

export default function Feed({}) {
  const [posts, setPosts] = useState<PostObject[]>([]);
  const postsRef = collection(db, "posts");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    console.log("refreshing!");
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  };

  const getPosts = () => {
    getDocs(postsRef).then((querySnapshot) => {
      const postsData: PostObject[] = [];
      querySnapshot.forEach((doc: any) => {
        console.log(doc.id, " => ", doc.data());
        postsData.push(doc.data() as PostObject);
      });
      setPosts(postsData);
    });
  };

  useEffect(() => {
    console.log("refreshing");
    getPosts();
  }, []);

  return (
    <ScrollView
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {posts.map((post) => (
          <PostBox post={post}></PostBox>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ADD8E6",
  },
  container: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "stretch",
  },
});
