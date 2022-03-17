import axios from "axios";
import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { SET_FILTERED_QUESTIONS } from "../../Store/entities/filters";
import HardnessFilter from "../HardnessFilter";
import LessonFilter from "../LessonFilter";
import Btn from "./Btn";

function Sidebar() {
  const dispatch = useDispatch();

  const { subject, hardness, searchQuery } = useSelector(
    (store) => store.entities.filters
  );
  const applyAllFilters = useCallback(() => {
    const numbericHardness = Number(hardness);
    axios
      .get("/questions/", {
        params: {
          q: searchQuery,
          subject,
          level: numbericHardness,
        },
      })
      .then((res) => dispatch(SET_FILTERED_QUESTIONS({ questions: res.data })))
      .catch((err) => console.log(err.response));
  }, [dispatch, hardness, searchQuery, subject]);

  return (
    <div className="bg-stone-900 px-5 py-2 h-screen text-white">
      <HardnessFilter />
      <LessonFilter />
      <Btn
        className="w-full block text-black mt-7 bg-white"
        onClick={applyAllFilters}
      >
        اعمال فیلتر ها
      </Btn>

      <div className="bg-red-300 px-7 py-5 rounded-md mt-5">
        <h2 className="font-bold text-sm text-red-500">
          توجه: این فیلتر ها شامل جستجو هم می شود.
        </h2>
      </div>
    </div>
  );
}

export default Sidebar;
