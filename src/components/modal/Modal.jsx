import React, { useState } from "react";
// i18next
import { useTranslation } from "react-i18next";

const Modal = ({ handleAction, setShowModal, condition }) => {
  const { t } = useTranslation();

  const [confirmInput, setConfirmInput] = useState("");

  const handleCondition = () => {
    if (condition === "delete profile") {
      return t("delete_profile_des");
    }

    if (condition === "delete post") {
      return t("delete_post_des");
    }
  };

  return (
    <div className="c-delete-modal_wrapper" onClick={setShowModal}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="c-delete-modal_container"
      >
        <span onClick={setShowModal}>X</span>
        <h3>{handleCondition()}</h3>

        <div className="c-delete-confirmation">
          <p>{t("delete_confirm")}</p>
          <input
            type="text"
            onChange={(e) => {
              setConfirmInput(e.target.value);
            }}
          />
        </div>

        <button disabled={confirmInput !== "delete"} onClick={handleAction}>
          {t("delete_text")}
        </button>
      </div>
    </div>
  );
};

export default Modal;
