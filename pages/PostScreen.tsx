import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CommentModal } from "../components/Modal";
import fetchFromCollection from "../util/fetchFromCollection";
import { app } from "../util/firebase";
import { CommentObject } from "../util/types";

const db = getFirestore(app);

export default function PostScreen({ route }) {
  const { post, postId, question, author } = route.params;
  const commentsRef = collection(db, "comments");
  const [comments, setComments] = useState<CommentObject[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    console.log("refreshing!");
    setRefreshing(true);
    getComments();
    setRefreshing(false);
  };

  const getComments = () => {
    getDocs(commentsRef).then((querySnapshot) => {
      const commentsData: CommentObject[] = [];
      querySnapshot.forEach((doc: any) => {
        const data: CommentObject = doc.data();
        if (data.post.id === postId) {
          commentsData.push(data);
        }
      });
      setComments(commentsData);
    });
  };

  useEffect(() => {
    console.log("refreshing");
    getComments();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.question}>{question?.text}</Text>
        <Text style={styles.text}>{post.content}</Text>
        <Text style={styles.text}>{author?.name}</Text>
      </View>
      {comments.map((comment) => {
        return (
          <View style={styles.comments}>
            <Text>{comment.text}</Text>
            {/* <Text>{comment.author}</Text> */}
          </View>
        );
      })}
      <CommentModal post={post} postId={postId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 26,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
  },
  question: {
    fontStyle: "italic",
    fontSize: 20,
    paddingBottom: 12,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    paddingTop: 12,
    paddingBottom: 12,
  },
  comments: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 26,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
  },
});
