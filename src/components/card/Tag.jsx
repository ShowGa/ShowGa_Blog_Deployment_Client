import React from "react";
import { Link } from "react-router-dom";

const Tag = (props) => {
  return (
    <Link
      className={`c-tag_container bg-opacity-80 dic ${props.bgColor}`}
      to={`/search?category=${props.tagName}`}
    >
      <div className="w-[35px]">
        <img src={props.tagImg} alt={props.tagName} />
      </div>

      <p className="c-tag_text-color">{props.tagName}</p>
    </Link>
  );
};

export default Tag;
