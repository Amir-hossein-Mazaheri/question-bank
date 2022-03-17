import React, { useCallback } from "react";

import { Tree, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { SET_SUBJECT } from "../Store/entities/filters";
import fetcher from "../Helpers/fetcher";
import convertCategory from "../Helpers/categoryConvertor";
import convertChecker from "../Helpers/categoryChcker.js";

function LessonFilter() {
  const dispatch = useDispatch();

  const { data } = useSWR("/majors/", fetcher);

  const setCategory = useCallback(
    (checkedKeysValue) => {
      const onlySubjectIds = convertChecker(checkedKeysValue);
      console.log(checkedKeysValue);
      console.log(onlySubjectIds);
      dispatch(SET_SUBJECT({ subjectIds: onlySubjectIds }));
    },
    [dispatch]
  );

  if (!data) {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <Spin indicator={loadingIcon} />;
  }

  return (
    <div className="px-5 py-3 bg-white space-y-3 rounded-md">
      <h2>مبحث درسی :</h2>
      <Tree checkable onCheck={setCategory} treeData={convertCategory(data)} />
    </div>
  );
}

export default LessonFilter;
