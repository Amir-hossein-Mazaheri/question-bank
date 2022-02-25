import { Input, Radio, Select } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_QUESTION_HARDNESS } from "../../Store/entities/question";

const { Option } = Select;

function QuestionBody() {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const dispatch = useDispatch();

  const applyHardness = useCallback(
    (value) => {
      dispatch(SET_QUESTION_HARDNESS({ hardness: value }));
    },
    [dispatch]
  );

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 mt-8 px-7 py-3">
      <div className="flex gap-5 items-center">
        <span>انتخاب دشواری : </span>
        <div>
          <Select
            defaultValue="دشواری"
            className="min-w-[10rem]"
            onChange={applyHardness}
          >
            <Option value={3}>سخت</Option>
            <Option value={2}>متوسط</Option>
            <Option value={1}>آسان</Option>
          </Select>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <Input placeholder="عنوان سوال" />
        <div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>متن سوال...</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-5 items-center">
          <span>گزینه ها : </span>
          <div className="flex gap-5 items-center grow">
            <Input placeholder="گزینه اول" />
            <Input placeholder="گزینه دوم" />
            <Input placeholder="گزینه سوم" />
            <Input placeholder="گزینه چهارم" />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <span>پاسخ تشریحی</span>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>متن سوال...</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
        </div>
      </div>

      <div>
        <Radio.Group
          options={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ]}
          value="1"
          optionType="button"
          buttonStyle="solid"
        />
      </div>
    </div>
  );
}

export default QuestionBody;
