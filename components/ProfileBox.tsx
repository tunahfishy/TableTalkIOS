import { useNavigation } from "@react-navigation/native";
import {
  doc,
  DocumentReference,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { db } from "../util/firebase";

export default function ProfileBox({ profileInfo, userId, onAdd }) {
  const [currUserRef, setCurrUserRef] = useState<DocumentReference>();
  const [userRef, setUserRef] = useState<DocumentReference>();
  const { userInfo, id } = profileInfo;

  useEffect(() => {
    const userRef = doc(db, "users/" + id);
    setUserRef(userRef);
    const currUserRef = doc(db, "users/" + userId);
    setCurrUserRef(currUserRef);
  }, []);

  const addFriend = () => {
    if (currUserRef && userRef) {
      updateDoc(currUserRef, {
        friends: arrayUnion(id),
      });
      updateDoc(userRef, {
        friends: arrayUnion(userId),
      });
    }
    alert("added friend!");
    onAdd();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => {
      //   navigation.navigate("Post", {
      //     post: post,
      //     postId: postId,
      //     question: question,
      //     author: author,
      //   });
      // }}
    >
      <Text style={styles.text}>{userInfo.name}</Text>
      <Button title="Add Friend" onPress={addFriend} />
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
