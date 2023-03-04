import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CommentModal } from "../components/Modal";
import fetchFromCollection from "../util/fetchFromCollection";
import { app } from "../util/firebase";
import { CommentObject, User } from "../util/types";

const db = getFirestore(app);

export interface CommentDataObject {
  data: CommentObject;
  author: User;
}

export default function PostScreen({ route }) {
  const { post, postId, question, author } = route.params;
  const commentsRef = collection(db, "comments");
  const [comments, setComments] = useState<CommentDataObject[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    getComments();
    setRefreshing(false);
  };

  const getComments = () => {
    const commentsQuery = query(commentsRef, where("post", "==", postId));
    getDocs(commentsQuery).then((commentsSnapshot) => {
      const commentsData: CommentDataObject[] = [];
      commentsSnapshot.forEach((doc: any) => {
        const data: CommentObject = doc.data();
        commentsData.push({ data, author });
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
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.question}>{question?.text}</Text>
        <Text style={styles.text}>{post.content}</Text>
        <Text style={styles.text}>{author?.name}</Text>
      </View>
      {comments.map((commentObject, key) => {
        return (
          <View style={styles.comments} key={key}>
            <Text>{commentObject.data.text}</Text>
            <Text>{commentObject.author.name}</Text>
          </View>
        );
      })}
      <CommentModal post={post} postId={postId} />
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 26,
    minHeight: 100,
    margin: 16,
    borderRadius: 16,
    backgroundColor: "white",
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
