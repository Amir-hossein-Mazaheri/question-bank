import { Select, Spin } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../Helpers/fetcher";
import Container from "../../Layouts/Container";
import { SET_CATEGORY } from "../../Store/entities/question";

const { Option } = Select;

function SelectCategory() {
  const [majorIndex, setMajorIndex] = useState(0);
  const [gradeIndex, setGradeIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);

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
            onChange={(value) => {
              const [id, name, index] = value.split("-");
              console.log(id, index);
              applySelectValue("major", name, Number(id));
              setMajorIndex(Number(index));
            }}
          >
            {categories.map(({ name, id }, index) => (
              <Option key={id} value={`${id}-${name}-${index}`}>
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
            onChange={(value) => {
              const [id, name, index] = value.split("-");
              console.log(id, index);
              applySelectValue("grade", name, Number(id));
              setGradeIndex(Number(index));
            }}
          >
            {major.id &&
              categories[majorIndex]?.grades?.map(({ name, id }, index) => (
                <Option key={id} value={`${id}-${name}-${index}`}>
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
            onChange={(value) => {
              const [id, name, index] = value.split("-");
              console.log(id, index);
              applySelectValue("course", name, Number(id));
              setCourseIndex(Number(index));
            }}
          >
            {grade.id &&
              categories[majorIndex]?.grades[gradeIndex]?.courses?.map(
                ({ name, id }, index) => (
                  <Option key={id} value={`${id}-${name}-${index}`}>
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
            onChange={(value) => {
              const [id, name, index] = value.split("-");
              console.log(id, index);
              applySelectValue("subject", name, Number(id));
            }}
          >
            {course.id &&
              categories[majorIndex]?.grades[gradeIndex]?.courses[
                courseIndex
              ]?.subjects?.map(({ name, id }, index) => (
                <Option key={id} value={`${id}-${name}-${index}`}>
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
