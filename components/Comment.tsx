import { useNavigation } from "@react-navigation/native";
import { deleteDoc, doc, DocumentReference } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { AuthContext } from "../navigation/AuthNavigator";
import { db } from "../util/firebase";
import getUser from "../util/getUser";

export default function Comment({ data, author, commentId, onDelete }) {
  //   const navigation = useNavigation();
  const user = useContext(AuthContext);
  const [userPost, setUserPost] = useState<boolean>(false);

  useEffect(() => {
    getUser(user).then((userData) => {
      if (userData) {
        setUserPost(userData.userObject.email == author.email);
      }
    });
  }, []);

  const deletePost = () => {
    const commentRef: DocumentReference = doc(db, "comments/" + commentId);
    deleteDoc(commentRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
        onDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.comments}>
      <Text>{data.text}</Text>
      <Text>{author.name}</Text>
      {userPost ? (
        <Button title={"delete"} onPress={deletePost}></Button>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
