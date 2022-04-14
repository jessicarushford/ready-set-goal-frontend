import Friend from "./Friend";

export default interface User {
  _id?: string;
  uid: string;
  name: string;
  friends: Friend[];
}
