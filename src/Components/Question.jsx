import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  SET_CATEGORY,
  SET_QUESTION_Property,
} from "../Store/entities/question";
// hardness: "", // 1 for easy 2 for medium 3 for hard
//   title: "",
//   set: ["", "", "", ""],
//   answer: "",
//   fullAnswer: "",
//   randomize: true,
function Question({
  id,
  categories,
  hardness,
  title,
  set,
  correctAnswer,
  fullAnswer,
  randomize,
  reports,
  numberHardnessLevel,
}) {
  const dispatch = useDispatch();
  let hardnessLevel;

  switch (numberHardnessLevel) {
    case 1:
      hardnessLevel = "آسون";
      break;
    case 2:
      hardnessLevel = "متوسط";
      break;
    case 3:
      hardnessLevel = "سخت";
      break;
    default:
      hardnessLevel = "نامشخص";
  }

  const setQuestionData = useCallback(() => {
    dispatch(SET_QUESTION_Property({ type: "hardness", data: hardness }));
    dispatch(SET_QUESTION_Property({ type: "title", data: title }));
    dispatch(SET_QUESTION_Property({ type: "set", data: set }));
    dispatch(
      SET_QUESTION_Property({
        type: "answer",
        data: set.findIndex((answer) => answer === correctAnswer) + 1,
      })
    );
    dispatch(SET_QUESTION_Property({ type: "fullAnswer", data: fullAnswer }));
    dispatch(SET_QUESTION_Property({ type: "randomize", data: randomize }));
    const steps = ["major", "grade", "course", "subject"];
    for (let i = 0; i < steps.length; i++) {
      dispatch(SET_CATEGORY({ type: steps[i], value: categories[i] }));
    }
  }, [
    categories,
    correctAnswer,
    dispatch,
    fullAnswer,
    hardness,
    randomize,
    set,
    title,
  ]);

  const categoriesStyle = "px-3 py-1 bg-blue-500 text-white rounded-md";

  const commonPadding = "px-3 py-1 rounded-md";

  return (
    <div className="px-8 py-5 flex flex-col gap-7 shadow-md shadow-gray-200 rounded-lg bg-white/10 backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <div>
          <p>
            <div dangerouslySetInnerHTML={{ __html: title }}></div>
          </p>
        </div>
        <ul className="flex gap-5">
          {categories.map((category) => (
            <li key={category.toString()} className={categoriesStyle}>
              {category}
            </li>
          ))}
          <li className={categoriesStyle}>{hardnessLevel}</li>
        </ul>
      </div>
      <div>
        <p className="px-5 py-2 rounded-md bg-green-200">
          <span>جواب صحیح : </span>
          <div dangerouslySetInnerHTML={{ __html: correctAnswer }}></div>
        </p>
      </div>
      <div className="flex gap-5 text-white self-end">
        <Link onClick={setQuestionData} to={`/edit-question/${id}`}>
          <div className={`bg-green-500 cursor-pointer ${commonPadding}`}>
            مشاهده و ویرایش سوال
          </div>
        </Link>
        <div className={`flex gap-2 items-center bg-red-500 ${commonPadding}`}>
          <span>تعداد ریپورت ها</span>
          <span>{reports}</span>
        </div>
      </div>
    </div>
  );
}

export default Question;
