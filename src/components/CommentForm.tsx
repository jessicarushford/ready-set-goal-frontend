import { FormEvent, useState } from "react";
import Comment from "../models/Comment";
import "./CommentForm.css";

interface Props {
  onAddComment: (id: string) => void;
}

const CommentForm = ({ onAddComment }: Props) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newComment: id = {
      name,
      commentText,
    };
    onAddComment(id);
  };

  return (
    <form className="CommentForm" onSubmit={submitHandler}>
      <textarea name="comment" id="comment" cols={30} rows={10}>
        Leave a comment..
      </textarea>
      <button>ADD COMMENT</button>
    </form>
  );
};

export default CommentForm;
