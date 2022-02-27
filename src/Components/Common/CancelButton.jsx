import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  RESET_CATEGORIES,
  RESET_QUESTION,
} from "../../Store/entities/question";
import Btn from "./Btn";

function CancelButton() {
  const dispatch = useDispatch();

  const resetQuestionData = useCallback(() => {
    dispatch(RESET_QUESTION());
    dispatch(RESET_CATEGORIES());
  }, [dispatch]);

  return (
    <Link to="/">
      <Btn onClick={resetQuestionData} className="bg-red-500 rounded-full px-8">
        لغو
      </Btn>
    </Link>
  );
}

export default CancelButton;
