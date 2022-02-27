import QuestionBody from "./QuestionBody";
import SelectCategory from "./SelectCategory";
import Submit from "./Submit";

function AddQuestion() {
  return (
    <>
      <SelectCategory />
      <QuestionBody />
      <Submit />
    </>
  );
}

export default AddQuestion;
