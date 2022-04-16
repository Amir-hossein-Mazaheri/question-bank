import { useCallback } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import convertHardness from "../Helpers/convertHardness";
import Btn from "./Common/Btn";
import { message } from "antd";

function Question({
  id,
  categories,
  title,
  correctAnswer,
  reports,
  numberHardnessLevel,
}) {
  const deleteQuestion = useCallback(() => {
    axios
      .delete(`/questions/${id}`)
      .then((res) => {
        message.success("سوال با موفقیت حذف شد.");
        console.log(res);
      })
      .catch((err) => {
        message.error("در حذف سوال مشکلی پیش آمده است.");
        console.log(err.response);
      });
  }, [id]);

  const categoriesStyle = "px-3 py-1 bg-blue-500 text-white rounded-md";

  const commonPadding = "px-3 py-1 rounded-md";

  return (
    <div className="px-8 py-5 flex flex-col gap-7 shadow-md shadow-gray-200 rounded-lg bg-white/10 backdrop-blur-lg">
      <div className="flex items-center flex-wrap gap-y-5 justify-between">
        <div>
          <p>
            <div
              className="question-title"
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
          </p>
        </div>
        <ul className="flex gap-5">
          {categories.map((category) => (
            <li key={category} className={categoriesStyle}>
              {category}
            </li>
          ))}
          <li className={categoriesStyle}>
            {convertHardness(numberHardnessLevel)}
          </li>
        </ul>
      </div>
      <div>
        <p className="px-5 py-2 rounded-md bg-green-200">
          <span>جواب صحیح : </span>
          <div dangerouslySetInnerHTML={{ __html: correctAnswer }}></div>
        </p>
      </div>
      <div className="flex justify-between items-center text-white">
        <div>
          <Btn
            onClick={deleteQuestion}
            className="bg-red-500 text-white text-xs flex items-center gap-1"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>حذف سوال</span>
          </Btn>
        </div>
        <div className="flex gap-5">
          <Link to={`/question/${id}`}>
            <div className={`bg-green-500 cursor-pointer ${commonPadding}`}>
              مشاهده و ویرایش سوال
            </div>
          </Link>
          <div
            className={`flex gap-2 items-center bg-red-500 ${commonPadding}`}
          >
            <span>تعداد ریپورت ها</span>
            <span>{reports}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
