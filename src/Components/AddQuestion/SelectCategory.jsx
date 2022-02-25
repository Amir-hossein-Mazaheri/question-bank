import { Select } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_CATEGORY } from "../../Store/entities/question";

const { Option } = Select;

function SelectCategory() {
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");

  const dispatch = useDispatch();

  const applySelectValue = useCallback(
    (value, setter, type) => {
      dispatch(SET_CATEGORY({ type, value }));
      setter(value);
    },
    [dispatch]
  );

  return (
    <div className="flex gap-7 items-center">
      <h2 className="font-medium text-lg">انتخاب دسته بندی سوال : </h2>
      <div className="flex gap-5 items-center">
        <div>
          <Select
            defaultValue="رشته تحصیلی"
            className="min-w-[10rem]"
            onChange={(value) => applySelectValue(value, setMajor, "major")}
          >
            <Option value="tajrobi">تجربی</Option>
            <Option value="riazi">ریاضی</Option>
            <Option value="ensani">انسانی</Option>
          </Select>
        </div>
        <div>
          <Select
            defaultValue="پایه تحصیلی"
            disabled={major ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => applySelectValue(value, setGrade, "grade")}
          >
            <Option value="10">دهم</Option>
            <Option value="11">یازدهم</Option>
            <Option value="12">دوازدهم</Option>
          </Select>
        </div>
        <div>
          <Select
            defaultValue="نام درس"
            disabled={major && grade ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => applySelectValue(value, setCourse, "course")}
          >
            <Option value="jack">ریاضی</Option>
            <Option value="lucy">فیزیک</Option>
          </Select>
        </div>
        <div>
          <Select
            defaultValue="مبحث درسی"
            disabled={major && grade && course ? false : true}
            className="min-w-[10rem]"
            onChange={(value) => applySelectValue(value, setSubject, "subject")}
          >
            <Option value="jack">ریاضی</Option>
            <Option value="lucy">فیزیک</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;
