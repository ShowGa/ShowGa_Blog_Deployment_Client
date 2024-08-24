import React, { useEffect, useState } from "react";
// i18next
import { useTranslation } from "react-i18next";
// components
import RecommendSideBar from "../components/section/RecommendSideBar";
import PostCard from "../components/card/PostCard";
// constants
import { tagInfo } from "../constants";
// CSS
import "./pages.css";
// react icons
import { FaSquarePlus } from "react-icons/fa6";
// react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// serviece
import PostService from "../services/post-service";
// react hot toast
import toast from "react-hot-toast";

const Search = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchPosts, setSearchPosts] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const [searchCondition, setSearchCondition] = useState({
    searchTerm: "",
    isFeatured: false,
    category: "",
    sort: "createdAt",
    order: "desc",
  });

  const handleDefaultSearch = () => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermURL = urlParams.get("searchTerm") || "";
    const sortURL = urlParams.get("sort") || "createdAt";
    const orderURL = urlParams.get("order") || "desc";
    const categoryURL = urlParams.get("category") || "";
    const isFeaturedURL = urlParams.get("isFeatured") || "";
    setSearchCondition({
      ...searchCondition,
      searchTerm: searchTermURL,
      isFeatured: isFeaturedURL,
      category: categoryURL,
      sort: sortURL,
      order: orderURL,
    });
    const searchQuery = urlParams.toString();

    PostService.getAllPosts(`/?${searchQuery}`)
      .then((res) => {
        setSearchPosts(res.data.foundPost);
        setIsEnd(res.data.isEnd);
      })
      .catch((e) => {
        toast.error("Error occurred when searching posts !");
        console.log(e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchCondition.searchTerm);
    urlParams.set("isFeatured", searchCondition.isFeatured);
    urlParams.set("category", searchCondition.category);
    urlParams.set("sort", searchCondition.sort);
    urlParams.set("order", searchCondition.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = () => {
    const startIndex = searchPosts.length;

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    PostService.getAllPosts(`/?${searchQuery}`)
      .then((res) => {
        console.log(res.data.foundPost);
        setSearchPosts([...searchPosts, ...res.data.foundPost]);
        setIsEnd(res.data.isEnd);
      })
      .catch((e) => {
        toast.error("Error occurred when searching posts !");
        console.log(e);
      });
  };

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchCondition({ ...searchCondition, searchTerm: e.target.value });
      return;
    }

    if (e.target.id === "sort_order") {
      const sort_order = e.target.value.split("_");
      console.log(sort_order);
      setSearchCondition({
        ...searchCondition,
        sort: sort_order[0],
        order: sort_order[1],
      });
      return;
    }

    if (e.target.id === "isFeatured") {
      setSearchCondition({
        ...searchCondition,
        isFeatured:
          e.target.value === "true"
            ? true
            : e.target.value === "false"
            ? false
            : "",
      });
    }

    if (e.target.classList.contains("p-span_item")) {
      setSearchCondition({
        ...searchCondition,
        category:
          searchCondition.category === e.target.innerText
            ? ""
            : e.target.innerText,
      });
    }
  };

  useEffect(() => {
    handleDefaultSearch();
  }, [location.search]);

  return (
    <div className="max-w-[80%] mx-auto max-md:max-w-[95%]">
      {/* Hero section */}
      <section>
        <div className="p-heroSec_intro_head_container">
          <h1>{t("search_title")}</h1>

          <p>{t("search_title_des")}</p>
        </div>
      </section>

      <section>
        <div className="p-search_section_container">
          <h1>{t("searching_text")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-search_section_system_form">
          <div className="p-search_form_Term">
            <label>{t("searchTerm_text")}</label>
            <input
              onChange={handleChange}
              id="searchTerm"
              type="text"
              value={searchCondition.searchTerm}
            />
          </div>

          <div className="p-search_form_tag">
            <label>{t("categories_text")}</label>
            <div className="p-tag_span_container">
              {tagInfo.map((info) => {
                return (
                  <span
                    onClick={handleChange}
                    key={info.tagName}
                    className={`p-span_item ${info.bgColor} ${
                      searchCondition.category === info.tagName
                        ? `scale-75`
                        : ""
                    }`}
                  >
                    {info.tagName}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="p-search_form_sort">
            <label>{t("sort_text")}</label>
            <select
              onChange={handleChange}
              id="sort_order"
              value={`${searchCondition.sort}_${searchCondition.order}`}
            >
              <option value="createdAt_asc">{t("select_old")}</option>
              <option value="createdAt_desc">{t("select_late")}</option>
              <option value="views_desc">{t("select_popular")}</option>
            </select>
          </div>

          <div className="p-search_form_featured">
            <label>{t("featured_text")} </label>
            <select
              onChange={handleChange}
              id="isFeatured"
              value={searchCondition.isFeatured}
            >
              <option value="true">{t("select_yes")}</option>
              <option value="false">{t("select_no")}</option>
              <option value="">{t("select_no_limit")}</option>
            </select>
          </div>

          <button type="submit" className="p-search_button">
            {t("search_text")}
          </button>
        </form>
      </section>

      {/* Post and Sidebar section */}
      <section className="p-post-sidebarSec">
        <div className="p-post-sidebarSec_container">
          <main className="flex-1">
            <h1 className="font-bold text-2xl">{t("select_result")}</h1>
            <div className="p-post-main_postcards_container">
              {searchPosts &&
                searchPosts.map((post) => {
                  return <PostCard key={post._id} post={post} />;
                })}

              {searchPosts && !isEnd && (
                <div>
                  <FaSquarePlus
                    onClick={handleShowMore}
                    className="p-load_more_button"
                  />
                </div>
              )}

              {searchPosts && searchPosts.length === 0 && (
                <div>
                  <p>Sadly, there no result</p>
                </div>
              )}
            </div>
          </main>

          <aside className="max-lg:hidden">
            <RecommendSideBar />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Search;
