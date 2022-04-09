export default interface Goal {
  _id?: string;
  uid: string;
  name: string;
  goalText: string;
  category: string;
  date: string;
  comments?: Comment[];
  likes?: number;
  completed?: boolean;
}
