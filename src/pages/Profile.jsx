import React, { useEffect, useRef, useState } from "react";
// zustand
import useAuthUserStore from "../zustand/useAuthUser";
// Conponents
import Modal from "../components/modal/Modal";
// firebase
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
// firebase config
import { app } from "../firebase/firebase";
// toast
import toast from "react-hot-toast";
// progressbar
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// User-service
import UserService from "../services/user-service";
// i18next
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();

  const filePickerRef = useRef();

  const { authUser, loginSetAuthUser } = useAuthUserStore();

  const [showModal, setShowModal] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [imgUploadProgress, setImguploadProgress] = useState(null);
  const [formData, setFormData] = useState({});

  const handleImgChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (checkFormData() === "error") {
      return;
    }

    UserService.updateUser(authUser._id, formData)
      .then((res) => {
        loginSetAuthUser(res.data.updatedUser);
        toast.success("Update user profile successfully !");
      })
      .catch((e) => {
        toast.error("Error occurred when trying to update user profile !");
        console.log(error);
      });
  };

  const handleDeleteAccount = () => {
    UserService.deleteUser(authUser._id)
      .then((res) => {
        loginSetAuthUser(null);
        toast.success("Delete account successfully !");
      })
      .catch((e) => {
        toast.error("Error occurred when trying delete account !");
        console.log(e);
      });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const uploadImg = () => {
    const storage = getStorage(app);
    // add random info to specialize the file name
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImguploadProgress(progress.toFixed(0));
      },
      (error) => {
        toast.error(
          "Error occurred when uploading image ! \n File must less than 2MB ."
        );
        setImguploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
          setImguploadProgress(null);
        });
      }
    );
  };

  const checkFormData = () => {
    // check if there's new user info
    if (Object.keys(formData).length === 0) {
      toast.error("No changes of user information !");
      return "error";
    }
    if (formData.username.length > 20) {
      toast.error("Username should be less than 20 characters !");
      return "error";
    }
  };

  useEffect(() => {
    if (imgFile) {
      uploadImg();
    }
  }, [imgFile]);

  return (
    <main className="p-profile-page_wrapper">
      <h1 className="p-profile-title">{t("profile_title")}</h1>
      <div className="p-profile-head_container">
        <img
          src={imgUrl || authUser.avatar}
          alt="img"
          onClick={() => {
            filePickerRef.current.click();
          }}
        />
        {imgUploadProgress && (
          <CircularProgressbar
            value={imgUploadProgress || 0}
            strokeWidth={3}
            className="p-profileImg-progressbar"
            styles={{
              root: {
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(251, 180, 0, ${imgUploadProgress / 100})`,
              },
            }}
          />
        )}
      </div>

      <form onSubmit={handleUpdateSubmit} className="p-profile-body_container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImgChange}
          ref={filePickerRef}
          hidden
        />

        <label>{t("profile_name")}</label>
        <input
          onChange={handleFormChange}
          id="username"
          type="text"
          defaultValue={authUser.username}
        />

        <label>{t("profile_email")}</label>
        <input
          disabled={true}
          onChange={handleFormChange}
          id="email"
          type="email"
          defaultValue={authUser.email}
        />

        <button type="submit">{t("profile_update")}</button>
      </form>

      <div
        onClick={() => {
          setShowModal(true);
        }}
        className="p-profile-function_button_container"
      >
        <span>{t("delete_account")}</span>
      </div>

      {showModal && (
        <Modal
          handleAction={handleDeleteAccount}
          setShowModal={() => {
            setShowModal(false);
          }}
          condition={"delete profile"}
        />
      )}
    </main>
  );
};

export default Profile;
