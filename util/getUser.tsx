import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export default async function getUser(user) {
  const getQuery = async () => {
    let answer = null;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));

    await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        answer = { userId: doc.id, userObject: doc.data() };
        return answer;
      });
    });
    return answer;
  };

  const queryA = await getQuery();
  return queryA;
}
