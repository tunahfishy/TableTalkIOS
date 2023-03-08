import { doc, getFirestore } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Button,
} from "react-native";
import { AuthContext } from "../navigation/AuthNavigator";
import addToCollection from "../util/addToCollection";
import { app } from "../util/firebase";
import { CommentObject } from "../util/types";

const db = getFirestore(app);

export const CommentModal = ({ post, postId, onSubmit }) => {
  const user = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    // Add a new document in collection "comments"
    if (user) {
      console.log("user:", user);
      const comment: CommentObject = {
        author: user?.uid,
        post: postId,
        text: text,
      };
      addToCollection("comments", comment);
      setModalVisible(false);
      onSubmit();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Leave a comment!</Text>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={(text) => setText(text)}
            ></TextInput>
            <Button title="Comment" onPress={handleSubmit} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 100,
    border: 2,
    borderColor: "black",
    borderRadius: 8,
    padding: 16,
  },
});
