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
import { useState } from "react";

function Contents() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetcher = (url) =>
    axios
      .get(url, {
        params: {
          page: currentPage,
        },
      })
      .then((data) => data);

  const { data } = useSWR("http://192.168.43.66:8080/questions", fetcher);

  console.log("data :", data);

  const questions = data.results.map((d) => ({
    ...d,
    categories: [d.major, d.grade, d.course, d.subject],
  }));

  if (!data) {
    return (
      <Container className="relative h-screen">
        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Container>
    );
  }

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
              id={question.id}
              categories={question.categories}
              title={question.description}
              correctAnswer={
                question.choices.find((choice) => choice.is_correct).text
              }
              reports={120}
              numberHardnessLevel={question.level}
            />
          ))}
        </div>
        {}
      </Container>
    </ContentLayout>
  );
}

export default Contents;
