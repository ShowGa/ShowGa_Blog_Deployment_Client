import React, { useRef, useState } from "react";
// css
import "../components.css";
// components
import PostCard from "../card/PostCard";
import Modal from "../modal/Modal.jsx";
// service
import PostService from "../../services/post-service.js";
// hot toast
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const searchData = useRef();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (searchData.current.value === "") {
      toast.error("Type some words !");
      return;
    }

    const postID = searchData.current.value;

    PostService.getPostAdmin(postID)
      .then((res) => {
        setPost(res.data.foundPost);
      })
      .catch((e) => {
        toast.error("Error occurred when searching posts !");
        console.log(e);
      });
  };

  const handleDeletePost = () => {
    PostService.deletePost(post._id)
      .then((res) => {
        toast.success(res.data.message);
        setPost(null);
        setShowModal(false);
      })
      .catch((e) => {
        toast.error("Error occurred when deleting posts !");
        console.log(e);
      });
  };

  return (
    <main className="w-[80%] mx-auto mt-12">
      <section className="w-full">
        <form onSubmit={handleSubmitForm} className="c-dash-search_form">
          <div>
            <label>Search Term :</label>
            <input id="searchTerm" type="text" ref={searchData} />
          </div>

          <button type="submit">Search</button>
        </form>
      </section>
      <section>
        {post && (
          <>
            <PostCard key={post._id} post={post} />
            <div>
              <Link to={`/update-editor/${post.slug}`}>Modify</Link>

              <button
                className="ml-2"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </section>

      {showModal && (
        <Modal
          handleAction={handleDeletePost}
          setShowModal={() => {
            setShowModal(false);
          }}
          condition={"delete post"}
        />
      )}
    </main>
  );
};

export default DashPosts;
