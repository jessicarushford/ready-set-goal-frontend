import "./CommentForm.css";

const CommentForm = () => {
  return (
    <form className="CommentForm">
      <textarea name="comment" id="comment" cols={30} rows={10}>
        Leave a comment..
      </textarea>
      <button>ADD COMMENT</button>
    </form>
  );
};

export default CommentForm;
