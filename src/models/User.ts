import Friend from "./Friend";

export default interface User {
  _id?: string;
  uid: string;
  friends: Friend[];
}
