import React from "react";
import { Link } from "react-router-dom";
// constants
import { postSmallTag } from "../../constants";
// utils
import { changeTimeZone } from "../../utils/timezone";

const SideBarPostCard = ({ postData }) => {
  return (
    <div>
      <Link
        className="c-sideBarPostCard_container"
        to={`/post/${postData.slug}`}
      >
        <div className="c-sideBarPostCard_img_container">
          <img src={postData.banerImg} alt="" className="c-img_hover-effect" />
        </div>

        <div className="c-sideBarPostCard_text_container">
          <span
            className={`c-tag_text-color ${
              postSmallTag[postData.category].bgColor
            }`}
          >
            {postData.category}
          </span>

          <h1 className="text-lg font-bold leading-5">{postData.title}</h1>

          <p className="text-[10px]">{changeTimeZone(postData.createdAt)}</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBarPostCard;
