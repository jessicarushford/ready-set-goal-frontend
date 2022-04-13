import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Comment from "../models/Comment";
import "./CommentForm.css";

interface Props {
  onAddComment: (newComment: Comment) => void;
}

const CommentForm = ({ onAddComment }: Props) => {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState("");
  const id: string | undefined = useParams().id;

  const submitHandler = (e: FormEvent): void => {
    e.preventDefault();
    const newComment: Comment = {
      name: user?.displayName!,
      commentText,
    };
    onAddComment(newComment);
    setCommentText("");
  };

  return (
    <form className="CommentForm" onSubmit={submitHandler}>
      <textarea
        name="comment"
        id="comment"
        cols={30}
        rows={10}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment.."
      />
      <button>ADD COMMENT</button>
    </form>
  );
};

export default CommentForm;
