import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

async function deleteHabbit(collection, id) {
  try {
    await deleteDoc(doc(db, collection, id));
  } catch (err) {
    console.log(err);
  }
}

export { deleteHabbit };
