import { UserInfo } from "firebase/auth";
import { collection, DocumentReference, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../navigation/AuthNavigator";
import { db } from "../util/firebase";
import getUser from "../util/getUser";

export default function FriendsScreen({}) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const [userData, setUserData] = useState<UserInfo>();

  const onRefresh = () => {
    setRefreshing(true);
    getProfile();
    setRefreshing(false);
  };

  const getProfile = () => {
    getUser(user).then((userData) => {
      if (userData) {
        const { userId, userObject } = userData;
        setUserData(userObject);
      }
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScrollView
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.profile}>{userData?.name}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#D8CCC4",
  },
  container: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    fontSize: 24,
  },
});
