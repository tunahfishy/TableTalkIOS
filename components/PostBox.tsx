import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, DocumentReference } from "firebase/firestore";
import React, { Component, useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import fetchFromCollection from "../util/fetchFromCollection";
import { db } from "../util/firebase";
import { Question, User } from "../util/types";

export default function PostBox({ post, postId, userId }) {
  const navigation = useNavigation();
  const [question, setQuestion] = useState<Question>();
  const [author, setAuthor] = useState<User>();
  // const [authorId, setAuthorId] = useState<string>();

  useEffect(() => {
    const questionInfo = fetchFromCollection("questions/" + post.question.path);
    questionInfo.then((questionInfo) => {
      setQuestion(questionInfo.data() as Question);
    });

    const authorInfo = fetchFromCollection("users/" + post.author);
    authorInfo.then((authorInfo) => {
      setAuthor(authorInfo.data() as User);
      // setAuthorId(authorInfo.id);
    });
  }, []);

  // const deletePost = () => {
  //   const commentRef: DocumentReference = doc(db, "comments/" + postId);
  //   deleteDoc(commentRef)
  //     .then(() => {
  //       console.log("Entire Document has been deleted successfully.");
  //       // onDelete(); delete post, refresh, and delete all comments
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Post", {
          post: post,
          postId: postId,
          question: question,
          author: author,
          userId: userId,
        });
      }}
    >
      <Text style={styles.text}>{post.content}</Text>
      <Text style={styles.author}>{author?.name}</Text>
      {/* {authorId == userId ? (
        <Button title={"delete"} onPress={deletePost} />
      ) : (
        <></>
      )} */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    padding: 16,
    minHeight: 125,
    margin: 16,
    borderRadius: 16,
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
  },
  author: {
    fontSize: 16,
  },
});
