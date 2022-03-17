import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_HARDNESS } from "../Store/entities/filters";

function HardnessFilter() {
  const dispatch = useDispatch();
  const currentHardness = useSelector(
    (store) => store.entities.filters.hardness
  );

  const applyHardness = useCallback(
    (level) => {
      dispatch(SET_HARDNESS({ hardness: level }));
    },
    [dispatch]
  );

  const hardnessLevels = {
    همه: "all",
    سخت: "3",
    متوسط: "2",
    آسان: "1",
  };

  let filterElement = [];

  for (const key in hardnessLevels) {
    filterElement.push(
      <li
        onClick={() => applyHardness(hardnessLevels[key])}
        key={hardnessLevels[key]}
        className={`cursor-pointer rounded-md px-2 py-1 ${
          hardnessLevels[key] === currentHardness ? "bg-white text-black" : ""
        }`}
      >
        {key}
      </li>
    );
  }

  return (
    <div className="py-3 flex gap-5 items-center mb-3">
      <h3 className="text-white font-light">دشواری :</h3>
      <ul className="flex gap-3">{filterElement}</ul>
    </div>
  );
}

export default HardnessFilter;
