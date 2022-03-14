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
  const { major, grade, course } = useSelector(
    (store) => store.entities.question.questionCategories
  );

  const { data: categories } = useSWR(`/majors/`, fetcher);

  const dispatch = useDispatch();

  const applySelectValue = useCallback(
    (value, type) => {
      dispatch(SET_CATEGORY({ type, value }));
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
            defaultValue={major || "رشته تحصیلی"}
            className="min-w-[10rem]"
            onChange={(value) => {
              const [id, index] = value.split("-");
              console.log(id, index);
              applySelectValue(Number(id), "major");
              setMajorIndex(Number(index));
            }}
          >
            {categories.map(({ name, id }, index) => (
              <Option ket={name} value={`${id}-${index}`}>
                <span>{name}</span>
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            defaultValue="پایه تحصیلی"
            disabled={major ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => {
              const [id, index] = value.split("-");
              console.log(id, index);
              applySelectValue(Number(id), "grade");
              setGradeIndex(Number(index));
            }}
          >
            {major &&
              categories[majorIndex].grades.map(({ name, id }, index) => (
                <Option ket={name} value={`${id}-${index}`}>
                  <span>{name}</span>
                </Option>
              ))}
          </Select>
        </div>
        <div>
          <Select
            defaultValue="نام درس"
            disabled={major && grade ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => {
              const [id, index] = value.split("-");
              console.log(id, index);
              applySelectValue(Number(id), "course");
              setCourseIndex(Number(index));
            }}
          >
            {grade &&
              categories[majorIndex].grades[gradeIndex].courses.map(
                ({ name, id }, index) => (
                  <Option ket={name} value={`${id}-${index}`}>
                    <span>{name}</span>
                  </Option>
                )
              )}
          </Select>
        </div>
        <div>
          <Select
            defaultValue="مبحث درسی"
            disabled={major && grade && course ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => {
              const [id, index] = value.split("-");
              console.log(id, index);
              applySelectValue(Number(id), "subject");
            }}
          >
            {course &&
              categories[majorIndex].grades[gradeIndex].courses[
                courseIndex
              ].subjects.map(({ name, id }, index) => (
                <Option ket={name} value={`${id}-${index}`}>
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
