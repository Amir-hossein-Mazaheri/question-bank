import { message } from "antd";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Btn from "../Common/Btn";

function Submit() {
  const categories = useSelector(
    (store) => store.entities.question.questionCategories
  );

  const questionProperties = useSelector(
    (store) => store.entities.question.question
  );

  const isCategoryEmpty = useCallback(() => {
    return Object.values(categories).some(
      (category) => category === "" || category.trim() === ""
    );
  }, [categories]);

  const validateFormData = useCallback(() => {
    if (isCategoryEmpty()) {
      message.error("لطفا همه دسته بندی ها رو تکمیل کنید.");
      console.log(isCategoryEmpty());
      console.log(categories);
      return;
    }
    console.log("ok");
  }, [categories, isCategoryEmpty]);

  return (
    <div className="fixed bottom-5 left-5">
      <div className="flex gap-5 text-white">
        <Link to="/">
          <Btn className="bg-red-500 rounded-full px-8">لغو</Btn>
        </Link>
        <Btn
          onClick={validateFormData}
          className="bg-green-500 rounded-full px-8"
        >
          ثبت
        </Btn>
      </div>
    </div>
  );
}

export default Submit;
