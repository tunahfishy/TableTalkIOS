import {
  collection,
  getFirestore,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, ScrollView } from "react-native";
import { app } from "../util/firebase";
import { RefreshControl } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthNavigator";
import getUser from "../util/getUser";
import ProfileBox from "../components/ProfileBox";

const db = getFirestore(app);

export interface UserInfo {
  userInfo: UserInfo;
  id: string;
}

export default function FriendsScreen({}) {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const usersRef = collection(db, "users");
  const [nonFriends, setNonFriends] = useState<UserInfo[]>([]);
  const [userId, setUserId] = useState<string>();

  const onRefresh = () => {
    setRefreshing(true);
    getFriends();
    setRefreshing(false);
  };

  const getFriends = () => {
    getDocs(usersRef).then((querySnapshot) => {
      const usersData: UserInfo[] = [];
      querySnapshot.forEach((doc: any) => {
        usersData.push({ userInfo: doc.data(), id: doc.id });
      });

      getUser(user).then((userData) => {
        if (userData) {
          const { userId, userObject } = userData;
          setUserId(userId);
          const userFriends = userObject.friends;
          const friendsData: DocumentReference[] = [];

          userFriends?.forEach((friend) => {
            friendsData.push(friend);
          });
          console.log(friendsData);

          const nonFriends = usersData.filter((friend) => {
            return friendsData.indexOf(friend.id) == -1 && friend.id !== userId;
          });
          setNonFriends(nonFriends);
        }
      });
    });
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <ScrollView
      style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {nonFriends.length > 0 ? (
          nonFriends.map((nonFriend, key) => (
            <ProfileBox
              key={key}
              profileInfo={nonFriend}
              userId={userId}
              onAdd={getFriends}
            ></ProfileBox>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.announcement}>No Friends To Add!</Text>
          </View>
        )}
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
    alignItems: "stretch",
  },
  empty: {
    alignItems: "center",
  },
  announcement: {
    fontSize: 16,
  }
});
