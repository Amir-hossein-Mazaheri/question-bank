import React, { useCallback, useState, useEffect } from "react";
import { Tree, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { SET_SUBJECT } from "../Store/entities/filters";

const formTreeData = (array) => {
  return array.map((major) => ({
    title: major.name,
    key: `major-${major.id}`,
    children: major.grades.map((grade) => ({
      title: grade.name,
      key: `grade-${major.id}-${grade.id}`,
      children: grade.courses.map((course) => ({
        title: course.name,
        key: `course-${major.id}-${grade.id}-${course.id}`,
        children: course.subjects.map((subject) => ({
          title: subject.name,
          key: `subject-${major.id}-${grade.id}-${course.id}-${subject.id}`,
        })),
      })),
    })),
  }));
};

function LessonFilter() {
  const [checkedValues, setCheckedValues] = useState([]);
  const dispatch = useDispatch();

  const fetcher = useCallback(
    (url) => axios(url).then((data) => formTreeData(data.data)),
    []
  );

  const { data } = useSWR(
    "/majors/",
    fetcher
  );

  console.log("lesson filters : ", data);

  useEffect(() => {
    const filteredValues = checkedValues.filter(
      (value) => value.split("-")[0] === "subject"
    );

    dispatch(SET_SUBJECT({ subject: filteredValues }));
  }, [checkedValues, dispatch]);

  const onCheck = (checkedKeysValue) => {
    setCheckedValues(checkedKeysValue);
  };

  if (!data) {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <Spin indicator={loadingIcon} />;
  }

  return (
    <div className="px-5 py-3 bg-white space-y-3 rounded-md">
      <h2>مبحث درسی :</h2>
      <Tree
        checkable
        // onExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        // checkedKeys={checkedKeys}
        // onSelect={onSelect}
        // selectedKeys={selectedKeys}
        treeData={data}
      />
    </div>
  );
}

export default LessonFilter;
