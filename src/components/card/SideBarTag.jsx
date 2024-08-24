import React from "react";
import { Link } from "react-router-dom";

const SideBarTag = (props) => {
  return (
    <Link
      className={`c-sideBarTag_container ${props.bgColor}`}
      to={`/search?category=${props.tagName}`}
    >
      <p className="c-tag_text-color">{props.tagName}</p>
    </Link>
  );
};

export default SideBarTag;
