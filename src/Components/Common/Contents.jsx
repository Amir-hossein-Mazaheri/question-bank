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
import { useMemo, useState } from "react";

function Contents() {
  const [currentPage, setCurrentPage] = useState(1);

  const fetcher = (url) =>
    axios
      .get(url, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => res.data);

  const { data } = useSWR("/questions/", fetcher);

  console.log("data :", data);

  const questions = useMemo(() => {
    if (!data) return;
    return data.results.map((d) => ({
      ...d,
      categories: [d.major, d.grade, d.course, d.subject],
    }));
  }, [data]);

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
        {questions.length > 0 ? (
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
        ) : (
          <p>سوالی وجود ندارد</p>
        )}
        {}
      </Container>
    </ContentLayout>
  );
}

export default Contents;
