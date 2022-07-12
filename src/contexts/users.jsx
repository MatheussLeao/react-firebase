
import { getDatabase } from "firebase/database";
import { toast } from "react-toastify";

export const Users = ({ children }) => {
  const db = getDatabase();

  return console.log(db);
}