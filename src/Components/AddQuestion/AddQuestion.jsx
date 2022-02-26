import QuestionBody from "./QuestionBody";
import SelectCategory from "./SelectCategory";
import Submit from "./Submit";

function AddQuestion() {
  return (
    <div>
      <SelectCategory />
      <QuestionBody />
      <Submit />
    </div>
  );
}

export default AddQuestion;
