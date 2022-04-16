import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Btn from "../Common/Btn";
import { useNavigate } from "react-router";
import CancelButton from "../Common/CancelButton";
import { useDispatch } from "react-redux";
import {
  RESET_CATEGORIES,
  RESET_QUESTION,
} from "../../Store/entities/question";

function Submit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (store) => store.entities.question.questionCategories
  );

  const questionProperties = useSelector(
    (store) => store.entities.question.question
  );

  const sendData = async () => {
    const postBody = {
      choices: questionProperties.set.map((choice, index) => ({
        text: choice,
        is_correct: questionProperties.answer === index + 1 ? true : false,
      })),
      description: questionProperties.title,
      image: null,
      level: questionProperties.hardness,
      randomize: questionProperties.randomize,
      complete_answer: questionProperties.fullAnswer,
      subject: categories.subject.id,
    };
    console.log(postBody);
    try {
      await axios.post("/questions/", postBody);
      message.success("سوال با موفقیت افزوده شد.");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      message.error("یکی از فیلد ها خالی می باشد");
    }
    // reset form data
    dispatch(RESET_CATEGORIES());
    dispatch(RESET_QUESTION());
  };

  return (
    <div className="fixed bottom-5 left-5">
      <div className="flex gap-5 text-white">
        <CancelButton />
        <Btn onClick={sendData} className="bg-green-500 rounded-full px-8">
          ثبت
        </Btn>
      </div>
    </div>
  );
}

export default Submit;
