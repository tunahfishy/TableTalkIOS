import {
  collection,
  getFirestore,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import { app } from "../util/firebase";
import PostBox from "../components/PostBox";
import { RefreshControl } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthNavigator";
import fetchFromCollection from "../util/fetchFromCollection";
import getUser from "../util/getUser";

const db = getFirestore(app);

export interface PostInfo {
  post: PostInfo;
  id: string;
}

export default function Feed({}) {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const postsRef = collection(db, "posts");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = useContext(AuthContext);

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
      });

      getUser(user).then((userData) => {
        if (userData) {
          const { userId, userObject } = userData;
          const userFriends = userObject.friends;

          const friendsData: DocumentReference[] = [];

          userFriends?.forEach((friend) => {
            friendsData.push(friend.id);
          });

          const newPosts = postsData.filter((post) => {
            return (
              post.post.author.id == userId ||
              friendsData.indexOf(post.post.author.id) !== -1
            );
          });
          setPosts(newPosts);
        }
      });
    });
  };
  // }

  useEffect(() => {
    console.log("refreshing");
    getPosts();
    console.log(posts);
  }, []);

  return (
    <ScrollView
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {posts.map((postInfo, key) => (
          <PostBox
            key={key}
            post={postInfo.post}
            postId={postInfo.id}
          ></PostBox>
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
