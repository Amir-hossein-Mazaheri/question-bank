import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FORCE_TO_UPDATE, SET_URL_PARAMS } from "../../Store/entities/filters";
import HardnessFilter from "../HardnessFilter";
import LessonFilter from "../LessonFilter";
import Btn from "./Btn";
import Auth from "../../Helpers/Auth";

function Sidebar() {
  const dispatch = useDispatch();

  const { subject, hardness, searchQuery } = useSelector(
    (store) => store.entities.filters
  );
  const applyAllFilters = useCallback(() => {
    dispatch(
      SET_URL_PARAMS({
        params: {
          subjects: subject,
          level: hardness,
          q: searchQuery,
        },
      })
    );
    dispatch(FORCE_TO_UPDATE());
  }, [dispatch, hardness, searchQuery, subject]);

  const logOut = useCallback(() => {
    Auth.logout();
    window.location.replace("http://lapluse.ir/exam-login/");
  }, []);

  return (
    <div className="bg-stone-900 px-5 py-2 flex flex-col justify-between h-screen text-white">
      <div>
        <HardnessFilter />
        <LessonFilter />
        <Btn
          className="w-full block text-black mt-7 bg-white"
          onClick={applyAllFilters}
        >
          اعمال فیلتر ها
        </Btn>

        <div className="bg-red-300 px-7 py-5 rounded-md mt-5">
          <h2 className="font-bold leading-relaxed text-red-500">
            توجه : برای اعمال جستجو نیز باید بر روی دکمه اعمال فیلتر کلیک شود.
          </h2>
        </div>
      </div>

      <div>
        <Btn onClick={logOut} className="bg-red-500 text-white w-full py-3">
          <span>خروج</span>
        </Btn>
      </div>
    </div>
  );
}

export default Sidebar;
