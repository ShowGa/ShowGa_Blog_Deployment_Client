// react-quill
import "react-quill/dist/quill.bubble.css";
// hljs
import hljs from "./hljs_config";

export const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: "1" }, { header: "2" }, "image"],
    ["bold", "italic", "underline"],
    ["clean"],
    ["code-block"],
  ],
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];
