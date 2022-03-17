import { useCallback } from "react";

import { Spin } from "antd";
import useSWRInfinite from "swr/infinite";
import Container from "../../Layouts/Container";
import Question from "../Question";
import Btn from "./Btn";
import fetcher from "../../Helpers/fetcher";

function Questions() {
  const getKey = useCallback((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/questions?page=${pageIndex + 1}`;
  }, []);

  const {
    data: questionsData,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

  if (!questionsData) {
    return (
      <Container className="relative h-screen">
        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Container>
    );
  }

  return (
    <div>
      {questionsData.map(({ results: questions }, index) => (
        <div key={index} className="space-y-8">
          {questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              categories={[
                question.major,
                question.grade,
                question.course,
                question.subject,
              ]}
              title={question.description}
              correctAnswer={
                question.choices.find((choice) => choice.is_correct)?.text
              }
              reports={120}
              numberHardnessLevel={question.level}
            />
          ))}
        </div>
      ))}
      <div className="mt-7 mb-5">
        <Btn
          onClick={() => setSize(size + 1)}
          className="border border-gray-300 flex items-center gap-1 mx-auto"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </span>
          <span>بارگزاری بیشتر</span>
        </Btn>
      </div>
    </div>
  );
}

export default Questions;
