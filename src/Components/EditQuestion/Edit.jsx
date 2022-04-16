import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import CancelButton from "../Common/CancelButton";
import Btn from "../Common/Btn";
import { useNavigate } from "react-router";

function Edit({ questionId }) {
  const navigate = useNavigate();
  const categories = useSelector(
    (store) => store.entities.question.questionCategories
  );

  console.log(categories);

  const questionProperties = useSelector(
    (store) => store.entities.question.question
  );

  const sendData = async () => {
    const res = await axios.get(`/questions/${questionId}`);
    const choicesBackEndGeneratedData = res.data.choices.map(
      (choice) => choice.id
    );
    console.log(choicesBackEndGeneratedData);
    const postBody = {
      choices: questionProperties.set.map((choice, index) => ({
        id: choicesBackEndGeneratedData[index],
        text: choice,
        is_correct: questionProperties.answer === index + 1 ? true : false,
      })),
      description: questionProperties.title,
      image: null,
      complete_answer: questionProperties.fullAnswer,
      level: questionProperties.hardness,
      randomize: questionProperties.randomize,
      subject: categories.subject.id,
    };
    console.log(postBody);
    try {
      await axios.patch(`/questions/${questionId}/`, postBody);
      message.success("سوال یا موفقیت ویرایش شد.");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.response);
      message.error("یکی از فیلد ها خالی می باشد");
    }
  };

  return (
    <div className="fixed bottom-5 left-5">
      <div className="flex gap-5 text-white">
        <CancelButton />
        <Btn onClick={sendData} className="bg-green-500 rounded-full px-8">
          اعمال تغییرات
        </Btn>
      </div>
    </div>
  );
}

export default Edit;
