export default interface Goal {
  _id?: string;
  uid: string;
  name: string;
  goalText: string;
  category: string;
  month: string;
  date: string;
  year: string;
  comments?: Comment[];
  likes?: number;
  completed?: boolean;
}
