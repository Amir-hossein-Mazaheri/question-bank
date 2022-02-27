import { message } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import QuestionBody from "../AddQuestion/QuestionBody";
import SelectCategory from "../AddQuestion/SelectCategory";
import Edit from "./Edit";

function EditQuestion() {
  const isRouteByButton = useSelector(
    (store) => store.entities.question.routeByButton
  );
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    if (!isRouteByButton) {
      navigate("/", { replace: true });
      message.error("دسترسی غیر مجاز");
    }
  }, [isRouteByButton, navigate]);

  return (
    <>
      <SelectCategory />
      <QuestionBody />
      <Edit questionId={id} />
    </>
  );
}

export default EditQuestion;
