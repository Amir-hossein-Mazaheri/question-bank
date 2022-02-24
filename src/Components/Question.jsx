function Question({
  categories,
  title,
  correctAnswer,
  reports,
  numberHardnessLevel,
}) {
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

  const categoriesStyle = "px-3 py-1 bg-blue-500 text-white rounded-md";

  const commonPadding = "px-3 py-1 rounded-md";

  return (
    <div className="px-8 py-5 flex flex-col gap-7 shadow-lg rounded-lg shadow-gray-300/60 bg-white/20 backdrop-blur-3xl">
      <div className="flex items-center justify-between">
        <div>
          <p>{title}</p>
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
        <p className="px-5 py-2 rounded-md bg-green-200">{correctAnswer}</p>
      </div>
      <div className="flex gap-5 text-white self-end">
        <div className={`bg-green-500 cursor-pointer ${commonPadding}`}>
          مشاهده و ویرایش سوال
        </div>
        <div className={`flex gap-2 items-center bg-red-500 ${commonPadding}`}>
          <span>تعداد ریپورت ها</span>
          <span>{reports}</span>
        </div>
      </div>
    </div>
  );
}

export default Question;
