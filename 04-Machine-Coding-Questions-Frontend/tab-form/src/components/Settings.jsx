import React from "react";

export const Settings = ({ data = { interests: [] }, setData }) => {
  const { theme } = data;

  function handleChangeTheme(e) {
    e.preventDefault();
    setData((prevState) => ({
      ...prevState,
      theme: e.target.name,
    }));
  }
  return (
    <div>
      <div className="">
        <label htmlFor="">
          <input
            type="radio"
            name="dark"
            checked={theme === "dark"}
            onChange={handleChangeTheme}
          />
          Dark
        </label>
      </div>
      <div className="">
        <label htmlFor="">
          <input
            type="radio"
            name="light"
            checked={theme === "light"}
            onChange={handleChangeTheme}
          />
          Light
        </label>
      </div>
    </div>
  );
};
