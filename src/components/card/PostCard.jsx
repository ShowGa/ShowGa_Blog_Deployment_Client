import React from "react";
import { Link } from "react-router-dom";
// Components CSS
import "../components.css";
// p-post page CSS
import "../../pages/pages.css";
import { postSmallTag } from "../../constants";
// utils
import { changeTimeZone } from "../../utils/timezone";

const PostCard = ({ post }) => {
  return (
    <div>
      <Link className="c-postcard_container" to={`/post/${post.slug}`}>
        <div className="c-postcard_img_container">
          <img src={post.banerImg} className="c-img_hover-effect" />
        </div>

        <div className="c-postcard_text_container">
          <p className="text-sm">{changeTimeZone(post.createdAt)}</p>
          <h1 className="text-2xl font-bold max-sm:text-xl">{post.title}</h1>
          <div
            className="text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>

          <span
            className={`c-tag_text-color ${
              postSmallTag[post.category].bgColor
            }`}
          >
            {post.category}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
