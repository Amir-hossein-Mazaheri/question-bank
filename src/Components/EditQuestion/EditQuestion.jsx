import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  RESET_CATEGORIES,
  RESET_QUESTION,
  SET_CATEGORY,
  SET_QUESTION_Property,
  SET_ROUTE_BY_BUTTON,
} from "../../Store/entities/question";
import QuestionBody from "../AddQuestion/QuestionBody";
import SelectCategory from "../AddQuestion/SelectCategory";
import Edit from "./Edit";

function EditQuestion() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const setQuestionData = useCallback(
    (question) => {
      dispatch(SET_ROUTE_BY_BUTTON({ value: true }));
      dispatch(
        SET_QUESTION_Property({ type: "hardness", data: question.level })
      );
      dispatch(
        SET_QUESTION_Property({ type: "title", data: question.description })
      );
      dispatch(
        SET_QUESTION_Property({
          type: "set",
          data: question.choices.map((choice) => choice.text),
        })
      );
      dispatch(
        SET_QUESTION_Property({
          type: "answer",
          data: question.choices.findIndex((answer) => answer.is_correct) + 1,
        })
      );
      dispatch(
        SET_QUESTION_Property({
          type: "fullAnswer",
          data: question.complete_answer || "",
        })
      );
      dispatch(
        SET_QUESTION_Property({ type: "randomize", data: question.randomize })
      );
      const steps = ["major", "grade", "course", "subject"];
      for (let i = 0; i < steps.length; i++) {
        const category = question.categories[i];
        dispatch(
          SET_CATEGORY({
            type: steps[i],
            id: category.id,
            value: category.name,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    axios.get(`/questions/${id}`).then((res) => {
      const convertedData = {
        ...res.data,
        categories: [
          res.data.major,
          res.data.grade,
          res.data.course,
          res.data.subject,
        ],
      };
      console.log(convertedData);
      setQuestionData(convertedData);
    });
  }, [id, setQuestionData]);

  useEffect(() => {
    return () => {
      dispatch(RESET_QUESTION());
      dispatch(RESET_CATEGORIES());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SelectCategory />
      <QuestionBody />
      <Edit questionId={id} />
    </>
  );
}

export default EditQuestion;
