import { useCallback, useState } from "react";

import { Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../Helpers/fetcher";
import Container from "../../Layouts/Container";
import { SET_CATEGORY } from "../../Store/entities/question";

const { Option } = Select;

function SelectCategory() {
  const [majorIndex, setMajorIndex] = useState(undefined);
  const [gradeIndex, setGradeIndex] = useState(undefined);
  const [courseIndex, setCourseIndex] = useState(undefined);

  const { major, grade, course, subject } = useSelector(
    (store) => store.entities.question.questionCategories
  );

  const { data: categories } = useSWR(`/majors/`, fetcher);

  const dispatch = useDispatch();

  const applySelectValue = useCallback(
    (type, value, id) => {
      dispatch(SET_CATEGORY({ type, id, value }));
    },
    [dispatch]
  );

  const partialCategoryReset = useCallback(
    (type) => {
      const reset = (name) => applySelectValue(name, undefined, "");

      switch (type) {
        case "major":
          setMajorIndex(0);
          reset("grade");
          reset("course");
          reset("subject");
          break;
        case "grade":
          reset("course");
          reset("subject");
          break;
        case "course":
          reset("subject");
          break;
        default:
          return;
      }
    },
    [applySelectValue]
  );

  const stringifyValue = useCallback((id, name, index) => {
    return JSON.stringify({
      id,
      name,
      index,
    });
  }, []);

  const changeSelect = useCallback(
    (value, type, indexSetter) => {
      // console.log("indexes", majorIndex, gradeIndex, courseIndex);
      partialCategoryReset(type);
      const { id, name, index } = JSON.parse(value);
      console.log(`${type} id is :`, id);
      console.log(`${type} name is :`, name);
      console.log(`${type} index is :`, index);
      applySelectValue(type, name, Number(id));
      if (indexSetter) {
        indexSetter(Number(index));
      }
      // console.log("indexes", majorIndex, gradeIndex, courseIndex);
    },
    [applySelectValue, partialCategoryReset]
  );

  if (!categories) {
    return (
      <Container className="relative h-screen">
        <Spin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </Container>
    );
  }

  console.log(categories);

  return (
    <div className="flex gap-7 items-center">
      <h2 className="font-medium text-lg">انتخاب دسته بندی سوال : </h2>
      <div className="flex gap-5 items-center">
        <div>
          <Select
            value={major.value || "رشته تحصیلی"}
            className="min-w-[10rem]"
            onChange={(value) => changeSelect(value, "major", setMajorIndex)}
          >
            {categories.map(({ name, id }, index) => (
              <Option key={id} value={stringifyValue(id, name, index)}>
                <span>{name}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            value={grade.value || "پایه تحصیلی"}
            disabled={major.id ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => changeSelect(value, "grade", setGradeIndex)}
          >
            {major.id &&
              categories[majorIndex]?.grades?.map(({ name, id }, index) => (
                <Option key={id} value={stringifyValue(id, name, index)}>
                  <span>{name}</span>
                </Option>
              ))}
          </Select>
        </div>
        <div>
          <Select
            value={course.value || "نام درس"}
            disabled={major.id && grade.id ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => changeSelect(value, "course", setCourseIndex)}
          >
            {grade.id &&
              categories[majorIndex]?.grades[gradeIndex]?.courses?.map(
                ({ name, id }, index) => (
                  <Option key={id} value={stringifyValue(id, name, index)}>
                    <span>{name}</span>
                  </Option>
                )
              )}
          </Select>
        </div>
        <div>
          <Select
            value={subject.value || "مبحث درسی"}
            disabled={major.id && grade.id && course.id ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => changeSelect(value, "subject")}
          >
            {course.id &&
              categories[majorIndex]?.grades[gradeIndex]?.courses[
                courseIndex
              ]?.subjects?.map(({ name, id }, index) => (
                <Option key={id} value={stringifyValue(id, name, index)}>
                  <span>{name}</span>
                </Option>
              ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
