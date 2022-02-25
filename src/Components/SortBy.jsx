import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SORT } from "../Store/entities/filters";

function SortBy({ sortTypes }) {
  const dispatch = useDispatch();

  const currentSort = useSelector((store) => store.entities.filters.sortBy);

  const applyFilter = useCallback(
    (event, type) => {
      dispatch(SET_SORT({ sortType: type }));
    },
    [dispatch]
  );

  const sortKeys = Object.keys(sortTypes);

  return (
    <div className="flex gap-6 px-5 py-3 my-3 items-center">
      <div>
        <h2 className="font-medium text-lg">مرتب سازی بر اساس : </h2>
      </div>
      <div>
        <ul className="flex gap-5">
          {Object.values(sortTypes).map((type, index) => (
            <li
              className={`hover:bg-gray-200 cursor-pointer
               px-3 py-1 transition-colors rounded-md
                ${currentSort === type ? "bg-gray-200" : ""}
               `}
              key={type}
              onClick={(event) => applyFilter(event, type)}
            >
              {sortKeys[index]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SortBy;
