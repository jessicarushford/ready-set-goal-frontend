import Friend from "./Friend";
import LastLogin from "./LastLogin";

export default interface User {
  _id?: string;
  uid: string;
  name: string;
  friends: Friend[];
  lastLogin: LastLogin;
}
