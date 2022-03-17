import ContentLayout from "../../Layouts/ContentsLayout";
import Container from "../../Layouts/Container";
import SearchBar from "../SearchBar";
import Btn from "./Btn";
import { Link } from "react-router-dom";
import Questions from "./Questions";

function Contents() {
  return (
    <ContentLayout>
      <Container>
        <div className="relative after:absolute after:right-0 after:left-0 after:bottom-0 after:h-1">
          <div className="flex gap-7 items-center mb-10">
            <SearchBar className="grow" />
            <Link to="/add-question">
              <Btn className="bg-indigo-600 text-white">
                <span>اضافه کردن سوال</span>
              </Btn>
            </Link>
          </div>
        </div>
        <Questions />
      </Container>
    </ContentLayout>
  );
}

export default Contents;
