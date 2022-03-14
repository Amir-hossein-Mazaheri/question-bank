import { Checkbox, Radio, Select } from "antd";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_QUESTION_HARDNESS,
  SET_QUESTION_Property,
  SET_QUESTION_SET,
} from "../../Store/entities/question";

const { Option } = Select;

function QuestionBody() {
  const dispatch = useDispatch();

  const applyHardness = useCallback(
    (value) => {
      dispatch(SET_QUESTION_HARDNESS({ hardness: value }));
    },
    [dispatch]
  );

  const questionProperties = useSelector(
    (store) => store.entities.question.question
  );

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 mt-8 px-7 py-5 question-body">
      <div className="flex gap-5 items-center">
        <span>انتخاب دشواری : </span>
        <div>
          <Select
            value={questionProperties.hardness || "دشواری"}
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
        <h6>صورت سوال : </h6>
        <CKEditor
          editor={Editor}
          data={questionProperties.title}
          onChange={(event, editor) => {
            const data = editor.getData();
            dispatch(SET_QUESTION_Property({ type: "title", data }));
          }}
        />
      </div>

      <div className="mt-8">
        <div className="space-y-4">
          <h6 className="grow">گزینه ها : </h6>
          <div className="grid grid-cols-2 gap-5 flex-wrap items-center grow">
            {[1, 2, 3, 4].map((choice, index) => (
              <div key={choice} className="space-y-2">
                <label htmlFor="">
                  <span>گزینه</span> <span>{index + 1}</span>
                </label>
                <CKEditor
                  key={choice}
                  editor={Editor}
                  data={questionProperties.set[index]}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    dispatch(SET_QUESTION_SET({ item: index, data }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <h6>پاسخ تشریحی : </h6>
        <div>
          <CKEditor
            editor={Editor}
            data={questionProperties.fullAnswer}
            onChange={(event, editor) => {
              const data = editor.getData();
              dispatch(SET_QUESTION_Property({ type: "fullAnswer", data }));
            }}
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3 items-center">
        <h6>گزینه صحیح : </h6>
        <Radio.Group
          buttonStyle="solid"
          className="grow"
          onChange={(event) => {
            dispatch(
              SET_QUESTION_Property({
                type: "answer",
                data: Number(event.target.value),
              })
            );
          }}
          value={questionProperties.answer || null}
        >
          <Radio.Button value={1}>گزینه اول</Radio.Button>
          <Radio.Button value={2}>گزینه دوم</Radio.Button>
          <Radio.Button value={3}>گزینه سوم</Radio.Button>
          <Radio.Button value={4}>گزینه چهارم</Radio.Button>
        </Radio.Group>

        <div>
          <Checkbox
            checked={questionProperties.randomize}
            onChange={() =>
              dispatch(
                SET_QUESTION_Property({
                  type: "randomize",
                  data: !questionProperties.randomize,
                })
              )
            }
          >
            <span>ترتیب گزینه ها می تواند تغییر کند</span>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}

export default QuestionBody;
