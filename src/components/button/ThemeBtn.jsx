import React, { useState } from "react";
// react icons
import { HiLightBulb } from "react-icons/hi";
// zustand
import useThemeStore from "../../zustand/useTheme";
// CSS module
import "../components.css";

const ThemeBtn = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div
      onClick={() => {
        toggleTheme();
        localStorage.setItem(
          "theme",
          JSON.stringify(theme === "light" ? "dark" : "light")
        );
      }}
      className="c-switch_container"
    >
      <div className="c-switch_background c-switch_background_light"></div>
      <div
        className={`c-switch_background c-switch_background_dark ${
          theme === "light" ? "" : "c-switch_background_dark_on"
        }`}
      ></div>

      <div className={`c-ball ${theme === "light" ? "" : "c-ball_effect"}`}>
        <HiLightBulb />
      </div>
    </div>
  );
};

export default ThemeBtn;
