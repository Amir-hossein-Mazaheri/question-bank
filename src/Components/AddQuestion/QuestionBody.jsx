import { Checkbox, Input, Radio, Select } from "antd";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MathType from "@wiris/mathtype-ckeditor5";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";

// import { InlineEditor } from "@ckeditor/ckeditor5-editor-inline";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_QUESTION_HARDNESS,
  SET_QUESTION_Property,
  SET_QUESTION_SET,
} from "../../Store/entities/question";

const { Option } = Select;

function QuestionBody() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

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
        <CKEditor
          editor={ClassicEditor}
          data={questionProperties.title || "<p>صورت سوال</p>"}
          onChange={(event, editor) => {
            const data = editor.getData();
            dispatch(SET_QUESTION_Property({ type: "title", data }));
          }}
          config={{
            language: "fa",
          }}
        />
        <div>
          <CKEditor
            editor={ClassicEditor}
            data="<p>متن سوال...</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              dispatch(SET_QUESTION_Property({ type: "body", data }));
            }}
            config={{
              language: "fa",
              image: {
                toolbar: [
                  "imageTextAlternative",
                  "imageStyle:inline",
                  "imageStyle:block",
                  "imageStyle:side",
                ],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
              plugins: [
                Autoformat,
                BlockQuote,
                Bold,
                CKFinder,
                CKFinderUploadAdapter,
                Essentials,
                Heading,
                Image,
                ImageCaption,
                ImageStyle,
                ImageToolbar,
                ImageUpload,
                Indent,
                Italic,
                Link,
                List,
                MathType,
                MediaEmbed,
                Paragraph,
                PasteFromOffice,
                Table,
                TableToolbar,
                TextTransformation,
              ],
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "outdent",
                "indent",
                "|",
                "imageUpload",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "undo",
                "redo",
                "MathType",
                "ChemType",
              ],
            }}
          />
          {/* <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>متن سوال...</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | image",
              content_style:
                "body { font-family: inherit,sans-serif; font-size:16px, text-align: right; direction: rtl }",
            }}
          /> */}
        </div>
      </div>

      <div className="mt-8">
        {" "}
        {
          //192.168.43.66:8000/questions/
        }
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
            <CKEditor
              editor={ClassicEditor}
              data={questionProperties.set[1] || "<p>گزینه دوم</p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                dispatch(SET_QUESTION_SET({ item: 1, data }));
              }}
              config={{
                language: "fa",
              }}
            />
            <CKEditor
              editor={ClassicEditor}
              data={questionProperties.set[2] || "<p>گزینه سوم</p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                dispatch(SET_QUESTION_SET({ item: 2, data }));
              }}
              config={{
                language: "fa",
              }}
            />
            <CKEditor
              editor={ClassicEditor}
              data={questionProperties.set[3] || "<p>گزینه چهارم</p>"}
              onChange={(event, editor) => {
                const data = editor.getData();
                dispatch(SET_QUESTION_SET({ item: 3, data }));
              }}
              config={{
                language: "fa",
              }}
            />
            {/* <CKEditor editor={InlineEditor} /> */}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <span>پاسخ تشریحی : </span>
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={questionProperties.fullAnswer || "<p>پاسخ کامل سوال...</p>"}
            onChange={(event, editor) => {
              const data = editor.getData();
              dispatch(SET_QUESTION_Property({ type: "fullAnswer", data }));
            }}
            config={{
              language: "fa",
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
