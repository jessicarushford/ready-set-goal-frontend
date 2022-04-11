import "./NewGoalForm.css";

const NewGoalForm = () => {
  return (
    <form className="NewGoalForm">
      <select name="category" id="category" placeholder="Category">
        <option value="exercise">Exercise</option>
        <option value="financial">Financial</option>
        <option value="leisure">Leisure</option>
        <option value="nutrition">Nutrition</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      <textarea name="goalText" id="goalText" cols={30} rows={10}></textarea>
      <button>ADD TODAY'S GOAL</button>
    </form>
  );
};

export default NewGoalForm;
