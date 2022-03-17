import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

function TextEditor({ className, ...others }) {
  return (
    <div className={className}>
      <CKEditor
        editor={Editor}
        config={{
          ckfinder: {
            uploadUrl: "/upload",
          },
        }}
        {...others}
      />
    </div>
  );
}

export default TextEditor;
