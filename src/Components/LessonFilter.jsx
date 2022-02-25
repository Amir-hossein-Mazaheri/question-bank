import React, { useCallback, useState, useEffect } from "react";
import { Tree } from "antd";
import axios from "axios";
import useSWR from "swr";
import { useDispatch } from "react-redux";

const treeData = [
  {
    title: "0-3",
    key: "0-5",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          {
            title: "0-0-0-0",
            key: "0-0-0-0",
          },
          {
            title: "0-0-0-1",
            key: "0-0-0-1",
          },
          {
            title: "0-0-0-2",
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          {
            title: "0-0-1-0",
            key: "0-0-1-0",
          },
          {
            title: "0-0-1-1",
            key: "0-0-1-1",
          },
          {
            title: "0-0-1-2",
            key: "0-0-1-2",
          },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      {
        title: "0-1-0-0",
        key: "0-1-0-0",
      },
      {
        title: "0-1-0-1",
        key: "0-1-0-1",
      },
      {
        title: "0-1-0-2",
        key: "0-1-0-2",
      },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
];

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

  const fetcher = (url) => axios(url).then((data) => formTreeData(data.data));

  const { data } = useSWR(
    "https://mocki.io/v1/ecdc6a8b-010a-4214-815c-752a2429c350",
    fetcher
  );

  console.log("lesson filters : ", data);

  useEffect(() => {
      dispatch();
  }, [checkedValues, dispatch]);

  //   const onExpand = (expandedKeysValue) => {
  //     console.log("onExpand", expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //     // or, you can remove all expanded children keys.

  //     setExpandedKeys(expandedKeysValue);
  //     setAutoExpandParent(false);
  //   };

  const onCheck = (checkedKeysValue) => {
    setCheckedValues(checkedKeysValue);
  };

  //   const onSelect = (selectedKeysValue, info) => {
  //     console.log("onSelect", info);
  //     setSelectedKeys(selectedKeysValue);
  //   };

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-5 py-3 bg-white space-y-3">
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
