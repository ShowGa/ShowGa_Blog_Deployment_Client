import React, { useEffect, useRef, useState } from "react";
// i18next
import { useTranslation } from "react-i18next";
// components
import RecommendSideBar from "../components/section/RecommendSideBar";
import CommentCard from "../components/card/CommentCard";
// CSS
import "./pages.css";
// react icons
import { PiHandsClapping } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6";
import { FaRegComment, FaWindowClose } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
// zustand
import useAuthUserStore from "../zustand/useAuthUser";
import { Link, useParams } from "react-router-dom";
// react hot toast
import toast from "react-hot-toast";
// utils
import { changeTimeZone } from "../utils/timezone";
// Service
import PostService from "../services/post-service";
import CommentService from "../services/comment-service";
// react icons
import { FaSquarePlus } from "react-icons/fa6";
// utils
import { confettiAction } from "../utils/conffeti";
import { clapPlay } from "../utils/clapSound";
// assest
import clapAudio from "../assets/fireworks_pang01.mp3";

const Post = () => {
  const { t } = useTranslation();

  const params = useParams();

  const { authUser } = useAuthUserStore();

  const selectRef = useRef(null);
  const timeoutID = useRef(null);
  const waitingLike = useRef(0);
  const totalLikes = useRef(0);
  const clap = useRef(new Audio(clapAudio));

  const [showCommentSec, setShowCommentSec] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    belongUserID: authUser && authUser._id,
    belongPostID: null,
  });
  const [post, setpost] = useState(null);
  const [commentNum, setCommentNum] = useState(null);
  const [comments, setComments] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const handleGetPost = () => {
    PostService.getPost(params.postId)
      .then((res) => {
        setpost(res.data.foundPost);
        setFormData({ ...formData, belongPostID: res.data.foundPost._id });
        setCommentNum(res.data.postComments);
      })
      .catch((e) => {
        toast.error("Error occurred when getting article");
        console.log(e);
      });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (formData.content === "") {
      toast.error("Please type some comments !");
      return;
    }

    CommentService.createComment(formData)
      .then((res) => {
        toast.success("Submit comment successfully !");
        setFormData({ ...formData, content: "" });
        setComments([res.data.populateComment, ...comments]);
      })
      .catch((e) => {
        toast.error("Error occurred when trying to create comment !");
        console.log(e);
      });
  };

  // for first time click comment button
  const handleGetComments = () => {
    // click comment button check
    if (comments) {
      return;
    }

    CommentService.getPostComments(post._id, "")
      .then((res) => {
        setComments(res.data.foundComments);
        setIsEnd(res.data.isEnd);
      })
      .catch((e) => {
        toast.success("Error occurred when getting comment !");
        console.log(e);
      });
  };

  // for select get comments
  const handleSelectGetComments = () => {
    const urlParams = new URLSearchParams();
    const sort_order = selectRef.current.value.split("_");
    urlParams.set("sort", sort_order[0]);
    urlParams.set("order", sort_order[1]);

    const query = urlParams.toString();

    CommentService.getPostComments(post._id, `/?${query}`)
      .then((res) => {
        setComments(res.data.foundComments);
        setIsEnd(res.data.isEnd);
      })
      .catch((e) => {
        toast.success("Error occurred when getting comment !");
        console.log(e);
      });
  };

  // Show More Button
  const handleShowMore = () => {
    const urlParams = new URLSearchParams();
    const sort_order = selectRef.current.value.split("_");
    urlParams.set("startIndex", comments.length);
    urlParams.set("sort", sort_order[0]);
    urlParams.set("order", sort_order[1]);

    const query = urlParams.toString();

    CommentService.getPostComments(post._id, `/?${query}`)
      .then((res) => {
        setComments([...comments, ...res.data.foundComments]);
        setIsEnd(res.data.isEnd);
      })
      .catch((e) => {
        toast.success("Error occurred when showing more comment !");
        console.log(e);
      });
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleClickClap = () => {
    // set maximum clap
    if (totalLikes.current >= 20) {
      return;
    }

    setpost({ ...post, numOfLikes: post.numOfLikes + 1 });
    waitingLike.current++;
    totalLikes.current++;

    if (totalLikes.current % 5 === 1) {
      confettiAction({ y: 0.6, x: 0.2 });
      // clap sound
      clapPlay(clap, 0.3);
    }

    if (timeoutID.current) {
      clearTimeout(timeoutID.current);
    }

    timeoutID.current = setTimeout(() => {
      const data = {
        slug: post.slug,
        addLike: waitingLike.current,
      };

      PostService.postClap(data)
        .then((res) => {
          waitingLike.current = 0;
        })
        .catch((e) => {
          toast.error("Error occurred when clapping comment !");
          console.log(e);
        });
    }, 800);
  };

  useEffect(() => {
    handleGetPost();
  }, [params.postId]);

  return (
    <div className="min-h-screen max-w-[80%] mx-auto max-md:max-w-[95%]">
      {/* Hero section */}
      {post && (
        <>
          <section>
            <div className="p-post_page_heroSection_container">
              <div className="p-post_title_container">
                <h1>{post.title}</h1>
                <div className="p-author_container">
                  <img src={post.belongAuthorID.avatar} />
                  <div className="p-author_text">
                    <p>{post.belongAuthorID.username}</p>
                    <span>{changeTimeZone(post.createdAt)}</span>
                  </div>
                </div>

                <div className="p-post_title_function-list">
                  <button
                    onClick={handleClickClap}
                    className="p-function_clap_container"
                  >
                    {totalLikes.current > 0 ? (
                      <FaHandsClapping className="text-xl" />
                    ) : (
                      <PiHandsClapping className="text-xl" />
                    )}

                    <p>{post.numOfLikes}</p>
                  </button>

                  <button
                    className="p-function_comments_container"
                    onClick={() => {
                      setShowCommentSec(!showCommentSec);
                      handleGetComments();
                    }}
                  >
                    <FaRegComment className="text-xl" />
                    <p>{commentNum}</p>
                  </button>

                  <div className="p-function_clap_container">
                    <FaEye className="text-xl" />
                    <p>{post.views}</p>
                  </div>
                </div>
              </div>

              <div className="p-post_img_container">
                <img src={post.banerImg} />
              </div>
            </div>
          </section>

          {/* comments section */}
          <section
            className={`p-post_comments_section ${
              showCommentSec ? "p-comments_section-effect" : ""
            }`}
            onClick={() => {
              setShowCommentSec(!showCommentSec);
            }}
          >
            <div
              className="p-post_comments_container"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="p-row_flex_between">
                <p className="text-xl font-bold">{t("comment_text")}</p>
                <FaWindowClose
                  onClick={() => {
                    setShowCommentSec(!showCommentSec);
                  }}
                  className="text-2xl cursor-pointer"
                />
              </div>

              <div className="p-textarea_container">
                <form onSubmit={handleSubmitComment}>
                  {authUser ? (
                    <>
                      <textarea
                        onChange={handleOnChange}
                        value={formData.content}
                        id="content"
                      ></textarea>
                      <button type="submit">{t("comment_comment")}</button>
                    </>
                  ) : (
                    <div>
                      <p>
                        <Link to={"/login"} className="link">
                          {t("comment_login")}
                        </Link>{" "}
                        {t("comment_login_des")}
                      </p>
                    </div>
                  )}
                </form>
              </div>

              <div>
                {comments && comments.length !== 0 && (
                  <div>
                    <select
                      onChange={handleSelectGetComments}
                      ref={selectRef}
                      className="p-commentSec_select"
                    >
                      <option value="createdAt_desc">
                        {t("comment_select_recent")}
                      </option>
                      <option value="numOfLikes_desc">
                        {t("comment_select_like")}
                      </option>
                    </select>
                  </div>
                )}
                {comments &&
                  comments.map((comment) => {
                    return <CommentCard key={comment._id} comment={comment} />;
                  })}
                {comments && !isEnd && (
                  <div className="p-plus-button_container">
                    <button onClick={handleShowMore}>
                      <FaSquarePlus />
                    </button>
                  </div>
                )}
                {comments && comments.length === 0 && (
                  <p>{t("comment_nocommentYet")}</p>
                )}
              </div>
            </div>
          </section>

          {/* Post and Sidebar section */}
          <section className="p-post-sidebarSec">
            <div className="p-post-sidebarSec_container">
              <div className="p-article_container">
                <div
                  className="p-post"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              </div>

              <aside className="max-lg:hidden">
                <RecommendSideBar />
              </aside>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Post;
