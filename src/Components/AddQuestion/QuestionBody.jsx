import { Checkbox, Input, Radio, Select } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

  const checkedValue = useSelector(
    (store) => store.entities.question.question.randomize
  );

  return (
    <div className="rounded-lg shadow-lg shadow-gray-200 mt-8 px-7 py-5">
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
        <Input
          onChange={(event) =>
            dispatch(
              SET_QUESTION_Property({ type: "title", data: event.target.value })
            )
          }
          placeholder="عنوان سوال"
        />
        <div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>متن سوال...</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              dispatch(SET_QUESTION_Property({ type: "body", data }));
            }}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-5 items-center">
          <span>گزینه ها : </span>
          <div className="flex gap-5 items-center grow">
            <Input
              onChange={(event) =>
                dispatch(
                  SET_QUESTION_SET({ item: 0, data: event.target.value })
                )
              }
              placeholder="گزینه اول"
            />
            <Input
              onChange={(event) =>
                dispatch(
                  SET_QUESTION_SET({ item: 1, data: event.target.value })
                )
              }
              placeholder="گزینه دوم"
            />
            <Input
              onChange={(event) =>
                dispatch(
                  SET_QUESTION_SET({ item: 2, data: event.target.value })
                )
              }
              placeholder="گزینه سوم"
            />
            <Input
              onChange={(event) =>
                dispatch(
                  SET_QUESTION_SET({ item: 3, data: event.target.value })
                )
              }
              placeholder="گزینه چهارم"
            />
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
              dispatch(SET_QUESTION_Property({ type: "fullAnswer", data }));
            }}
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3 items-center">
        <span>گزینه صحیح : </span>
        <Radio.Group
          buttonStyle="solid"
          className="grow"
          onChange={(event) => {
            dispatch(
              SET_QUESTION_Property({
                type: "answer",
                data: event.target.value,
              })
            );
          }}
        >
          <Radio.Button value="1">گزینه اول</Radio.Button>
          <Radio.Button value="2">گزینه دوم</Radio.Button>
          <Radio.Button value="3">گزینه سوم</Radio.Button>
          <Radio.Button value="4">گزینه چهارم</Radio.Button>
        </Radio.Group>

        <div>
          <Checkbox
            checked={checkedValue}
            onChange={() =>
              dispatch(
                SET_QUESTION_Property({
                  type: "randomize",
                  data: !checkedValue,
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
