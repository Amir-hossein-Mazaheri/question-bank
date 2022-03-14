import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Btn from "./Btn";
import CancelButton from "./CancelButton";

function EditAddControl({ sendDataFunction }) {
  const categories = useSelector(
    (store) => store.entities.question.questionCategories
  );

  const questionProperties = useSelector(
    (store) => store.entities.question.question
  );

  // const isCategoryEmpty = useCallback(() => {
  //   return Object.values(categories).some(
  //     (category) => category === "" || category.trim() === ""
  //   );
  // }, [categories]);

  // const validateFormData = useCallback(() => {
  //   if (isCategoryEmpty()) {
  //     message.error("لطفا همه دسته بندی ها رو تکمیل کنید.");
  //     console.log(isCategoryEmpty());
  //     console.log(categories);
  //     return;
  //   }
  //   console.log("ok");
  // }, [categories, isCategoryEmpty]);

  // const sendData = async () => {
  //   const postBody = {
  //     choices: questionProperties.set.map((choice, index) => ({
  //       text: choice,
  //       is_correct: questionProperties.answer === index + 1 ? true : false,
  //     })),
  //     description: questionProperties.title,
  //     image: null,
  //     level: questionProperties.hardness,
  //     randomize: questionProperties.randomize,
  //     subject: categories.subject,
  //   };
  //   console.log(postBody);
  //   try {
  //     await axios.post("/questions/", postBody);
  //     message.success("سوال یا موفقیت افزوده شد.");
  //   } catch (error) {
  //     console.log(error);
  //     message.error("یکی از فیلد ها خالی می باشد");
  //   }
  // };

  return (
    <div className="fixed bottom-5 left-5">
      <div className="flex gap-5 text-white">
        {/* <Link to="/">
          <Btn className="bg-red-500 rounded-full px-8">لغو</Btn>
        </Link> */}
        <CancelButton />
        <Btn onClick={sendDataFunction} className="bg-green-500 rounded-full px-8">
          ثبت
        </Btn>
      </div>
    </div>
  );
}

export default EditAddControl;
