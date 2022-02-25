import axios from "axios";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import ContentLayout from "../../Layouts/ContentsLayout";
import Question from "../Question";
import Container from "../../Layouts/Container";
import SortBy from "../SortBy";
import SearchBar from "../SearchBar";

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
    return <CircularProgress />;
  }

  console.log(questions);

  return (
    <ContentLayout>
      <Container>
        <div className="flex gap-7 items-center">
          <SearchBar className="grow" />
        </div>
        <SortBy
          sortTypes={{
            همه: "all",
            "بیشترین ریپورت": "most-reports",
            سخترین: "hardest",
          }}
        />
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
