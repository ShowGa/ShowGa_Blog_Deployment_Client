import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// react-router-dom
import { useNavigate } from "react-router-dom";
// React icons
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlinePicture } from "react-icons/ai";
// React quill
import ReactQuill from "react-quill";
import { modules, formats } from "../config/react_quill_config";
// CSS
import "./pages.css";
// firebase
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
// firebase config
import { app } from "../firebase/firebase";
// constants
import { tagInfo } from "../constants";
import toast from "react-hot-toast";
// Post-service
import PostService from "../services/post-service";

const Editor = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [editorContent, setEditorContent] = useState("");
  const [plusBtnShow, setPlusBtnShow] = useState(false);
  const [postContent, setPostContent] = useState({
    title: "",
    banerImg: "",
    content: "",
    category: tagInfo[0].tagName,
    isFeatured: false,
  });

  const handleChange = (e) => {
    setPostContent({
      ...postContent,
      [e.target.id]: e.target.value,
    });
  };

  const handleImgBtnClick = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];

      if (file) {
        uploadImg(file);
      }
    };
  };

  const uploadImg = (file) => {
    const storage = getStorage(app);
    // add random info to specialize the file name
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(
          "Error occurred when uploading image ! \n Please check the file, file size must be less than 2MB ."
        );
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          genrateImgElement(downloadURL);
        });
      }
    );
  };

  // handle baner img file change
  const handleBanerImgChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadBanerImg(file);
    }
  };
  // uploadBanerImg
  const uploadBanerImg = (file) => {
    const storage = getStorage(app);
    // add random info to specialize the file name
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(
          "Error occurred when uploading image ! \n Please check the file, file size must be less than 2MB ."
        );
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPostContent({ ...postContent, banerImg: downloadURL });
          toast.success("Upload img successfully !");
        });
      }
    );
  };

  const genrateImgElement = (downloadURL) => {
    let imgContent;
    imgContent = `<img src="${downloadURL}"/>`;

    setEditorContent(editorContent + imgContent);
  };

  const handleSubmitPost = () => {
    const { title, banerImg, content } = postContent;

    if (title === "" || banerImg === "" || content === "") {
      return toast.error("Please fullfilled all the required content !");
    }

    PostService.createPost(postContent)
      .then((res) => {
        toast.success("Create post successfully !");
        navigate("/");
      })
      .catch((e) => {
        toast.error("Error occurred when try to create post !");
        console.log(e);
      });
  };

  useEffect(() => {
    setPostContent({
      ...postContent,
      content: editorContent,
    });
  }, [editorContent]);

  return (
    <div className="max-w-[50%] min-h-[100vh] mx-auto max-md:max-w-[95%] pt-11">
      <input
        onChange={handleChange}
        id="title"
        type="text"
        placeholder="Title"
        className="p-editor_title_input"
      />

      <div className="p-editor_banerImg_container">
        <span>Baner Image : </span>
        <input
          onChange={handleBanerImgChange}
          id="banerImg"
          type="file"
          placeholder="Baner Img"
        />
      </div>

      <div className="p-select_container">
        <div>
          <label className="font-bold">Featured :</label>
          <select onChange={handleChange} name="Featured" id="isFeature">
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>

        <div>
          <label className="font-bold">Category :</label>
          <select onChange={handleChange} name="Category" id="category">
            {tagInfo.map((tag) => {
              return (
                <option
                  value={tag.tagName}
                  className={`${tag.bgColor}`}
                  key={tag.tagName}
                >
                  {tag.tagName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <ReactQuill
        theme="bubble"
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
        placeholder="Tell us your story"
      />

      <div className="p-function_container">
        <button
          onClick={() => {
            setPlusBtnShow(!plusBtnShow);
          }}
        >
          <CiCirclePlus
            className={`p-plus_button ${plusBtnShow ? "p-rotate-effect" : ""}`}
          />
        </button>
        {plusBtnShow && (
          <div onClick={handleImgBtnClick} className="p-btn_container">
            <button>
              <AiOutlinePicture className="p-function_btn" />
            </button>
          </div>
        )}
      </div>

      <button onClick={handleSubmitPost} className="p-editor-publish_button">
        Publish
      </button>

      <div
        className="p-post"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      ></div>
    </div>
  );
};

export default Editor;
