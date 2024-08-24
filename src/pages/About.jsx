import React from "react";
// Images
import { steam } from "../assets";
// i18next
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <section className="p-about_section_container">
        <h1>{t("about_title")}</h1>
        <div className="p-social-link_container">
          <a
            href="https://steamcommunity.com/profiles/76561198265945254/"
            target="_blank"
          >
            <img src={steam} />
          </a>
        </div>
        <div className="p-about-content">
          <h2>關於ShowGa</h2>
          <p>
            水分子組成的人，沒有固定的形狀或形式。可以是一個坐在電腦前一整天的宅男，也可以是騎著喜愛的Ubike到處走馬看花的遊客。
            <br />
            <br />
            在2023年接觸寫程式，目標是找到網頁全端工程實習，學習企業級的軟體從無到有的建造過程。
          </p>
          <h2>關於部落格</h2>
          <p>
            ShowGa
            Blog是使用MERN架構和上千行手刻程式碼建造而成。製作這個部落格目的是希望能夠將人生中的體驗用文字和圖片記錄下來。在未來個人技術和美感得到提升後，對Blog持續進行修改。
            <br />
            <br />
            一開始本想說使用痞克幫或是Medium等等知名的部落格就好。但在思考過後希望能讓網站更有個人特色，和考量製作一個能反映軟體工程能力提升軌跡的項目（持續修改），最終選擇自己手刻程式碼製作ShowGa
            Blog。
          </p>
          <h2>個人愛好</h2>
          <p>
            在這個部落格中，"分類"是其中一種功能，能夠透過分類搜尋文章，而這些分類主題也是我個人感興趣的事物。
            在本頁大標題下方有放上個人的Steam和自己創立的Discord群組－"新朋友"。希望能藉由遊戲或各種興趣愛好認識新朋友。
          </p>
          <br />
          <br />
          <h2>本站聲明</h2>
          <p>
            ShowGa Blog的"登入"功能使用"Google開放授權(Google
            OAuth)"，本站將儲存Google所授權的資訊，列舉您的Google暱稱、頭像以及Gmail郵箱地址。Google授權資訊僅限於本站內功能授權使用(例如留言功能)，絕無用於其他用途或提供給外部人士。
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
