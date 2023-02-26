import { collection, getFirestore, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import { app } from "../util/firebase";
import PostBox from "../components/PostBox";
import { RefreshControl } from "react-native-gesture-handler";
import { PostObject } from "../util/types";
import { AuthContext } from "../navigation/AuthNavigator";

const db = getFirestore(app);

export interface PostInfo {
  post: PostInfo;
  id: string;
}

export default function Feed({}) {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const postsRef = collection(db, "posts");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    getPosts();
    setRefreshing(false);
  };

  const getPosts = () => {
    getDocs(postsRef).then((querySnapshot) => {
      const postsData: PostInfo[] = [];
      querySnapshot.forEach((doc: any) => {
        postsData.push({ post: doc.data(), id: doc.id });
        console.log('id:', doc.id);
      });
      setPosts(postsData);
      // filterPosts();
    });
  };

  // TODO This will be replaced to be more secure in the future
  // Filter posts by friends 
  // const filterPosts = () => {
  //   if (!user) {
  //     return;
  //   }

  //   const userObject = fetchFromCollection("users/" + user.uid);
  //   userObject.then((userObject) => {
  //     const userData = userObject.data();
  //     const userFriends = userData?.friends;
  //     console.log(userFriends);

  //     userFriends?.forEach((friend) => {
  //       console.log(friend);
  //       friend.then((A) => {
  //         console.log(A.data());
  //       });
  //     });

  //     const newPosts = posts.filter((post) => {
  //       post.author === userData.uid || post.author in userData?.friends;
  //     });
  //     console.log(newPosts);
  //   });
  // };

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
        {posts.map((postInfo) => (
          <PostBox post={postInfo.post} postId={postInfo.id}></PostBox>
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
