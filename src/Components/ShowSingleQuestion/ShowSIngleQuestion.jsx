import axios from "axios";
import { useParams } from "react-router";
import useSWR from "swr";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import Container from "../../Layouts/Container";

function ShowSingleQuestion() {
  const params = useParams();
  const { id } = params;

  const fetcher = (url) =>
    axios(url).then((data) => ({
      ...data.data,
      categories: [
        data.data.major,
        data.data.grade,
        data.data.course,
        data.data.subject,
      ],
    }));

  const { data: question } = useSWR(`/questions/${id}/`, fetcher);

  if (!question) {
    return (
      <Container className="relative h-screen">
        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Container>
    );
  }

  console.log("single question", question);

  let hardnessLevel;

  switch (question.level) {
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

  console.log(question);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Link to="/">
              <div className="bg-red-500 text-white cursor-pointer px-3 py-1 rounded-md">
                بازگشت
              </div>
            </Link>
            <Link
              // onClick={setQuestionData(question)}
              to={`/edit-question/${id}`}
            >
              <div className="bg-green-500 text-white cursor-pointer px-3 py-1 rounded-md">
                مشاهده و ویرایش سوال
              </div>
            </Link>
          </div>

          <div>
            <ul className="flex gap-5">
              {question.categories.map((category) => (
                <li
                  key={category.toString()}
                  className="px-3 py-1 rounded-md bg-sky-500 text-white"
                >
                  {category.name}
                </li>
              ))}
              <li className="px-3 py-1 rounded-md bg-sky-500 text-white">
                {hardnessLevel}
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
      <div className="px-7 py-5 rounded-lg shadow-lg shadow-gray-200">
        <h1
          className="font-bold text-3xl"
          dangerouslySetInnerHTML={{ __html: question.description }}
        ></h1>
        <div>
          <ul className="space-y-3 mt-5">
            {question.choices.map((choice) => (
              <li
                className={`px-3 py-1 rounded-md relative ${
                  choice.is_correct ? "bg-green-500 text-white" : "bg-gray-100"
                }`}
                key={choice.id}
              >
                <span dangerouslySetInnerHTML={{ __html: choice.text }}></span>
                {choice.is_correct && (
                  <span className="absolute top-1/2 left-3 -translate-y-1/2">
                    گزینه صحیح
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-lg mb-3">پاسخ تشریحی : </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: question.complete_answer
                ? question.complete_answer
                : "پاسخ تشریحی وجود ندارد.",
            }}
          ></p>
        </div>
        {question.randomize && (
          <p className="mt-8 flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>ترتیب گزینه ها می تواند عوض شود.</span>
          </p>
        )}
      </div>
    </>
  );
}

export default ShowSingleQuestion;
