import { Link } from "react-router-dom";
import convertHardness from "../Helpers/convertHardness";

function Question({
  id,
  categories,
  title,
  correctAnswer,
  reports,
  numberHardnessLevel,
}) {
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
      <div className="flex gap-5 text-white self-end">
        <Link to={`/question/${id}`}>
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
