// Create a reference to the cities collection
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Create a query against the collection.

export default async function getUser(user) {
  const getQuery = async () => {
    let answer = null;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));

    await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        answer = { userId: doc.id, userObject: doc.data() };
        return answer;
      });
    });
    return answer;
  };

  const queryA = await getQuery();
  return queryA;
}
