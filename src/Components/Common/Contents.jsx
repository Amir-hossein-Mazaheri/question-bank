import axios from "axios";
import { Spin } from "antd";
import useSWR from "swr";
import ContentLayout from "../../Layouts/ContentsLayout";
import Question from "../Question";
import Container from "../../Layouts/Container";
import SortBy from "../SortBy";
import SearchBar from "../SearchBar";
import Btn from "./Btn";
import { Link } from "react-router-dom";

function Contents() {
  const fetcher = (url) =>
    axios(url).then((data) =>
      data.data.map((d) => ({
        ...d,
        categories: [d.major, d.grade, d.course, d.subject],
      }))
    );

  const { data: questions } = useSWR(
    "https://mocki.io/v1/e7db7c3c-9aba-4fb1-a93d-9abb325d654c",
    fetcher
  );

  if (!questions) {
    return (
      <Container className="relative h-screen">
        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Container>
    );
  }

  console.log(questions);

  return (
    <ContentLayout>
      <Container>
        <div className="relative after:absolute after:right-0 after:left-0 after:bottom-0 after:h-1">
          <div className="flex gap-7 items-center">
            <SearchBar className="grow" />
            <Link to="/add-question">
              <Btn className="bg-indigo-600 text-white">
                <span>اضافه کردن سوال</span>
              </Btn>
            </Link>
          </div>
          <SortBy
            sortTypes={{
              همه: "all",
              "بیشترین ریپورت": "most-reports",
            }}
          />
        </div>
        <div className="space-y-8">
          {questions.map((question) => (
            <Question
              key={question.id}
              categories={question.categories}
              title={question.description}
              correctAnswer={question.answer.text}
              numberHardnessLevel={question.level}
              reports={120}
            />
          ))}
          {questions.map((question) => (
            <Question
              key={question.id}
              categories={question.categories}
              title={question.description}
              correctAnswer={question.answer.text}
              numberHardnessLevel={question.level}
              reports={120}
            />
          ))}
        </div>
      </Container>
    </ContentLayout>
  );
}

export default Contents;
