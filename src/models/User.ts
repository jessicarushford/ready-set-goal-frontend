import Friend from "./Friend";
import Goal from "./Goal";

export default interface User {
  _id?: string;
  uid: string;
  friends: Friend[];
}
