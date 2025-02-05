import React from "react";

export const Interests = ({ data = { interests: [] }, setData, error }) => {
  const { interests } = data;
  function handleChangeData(e, name) {
    e.preventDefault();
    setData((prevState) => ({
      ...prevState,
      interests: Array.isArray(prevState.interests) // Check if it's an array
        ? e.target.checked
          ? [...prevState.interests, e.target.name]
          : prevState.interests.filter((i) => i !== e.target.name)
        : [e.target.name], // If it's not an array, initialize it as an array
    }));
  }
  console.log(interests);

  return (
    <div>
      <div className="">
        <label htmlFor="">
          <input
            type="checkbox"
            name="coding"
            checked={interests?.includes("coding")}
            onChange={handleChangeData}
          />
          Coding
        </label>
      </div>
      <div className="">
        <label htmlFor="">
          <input
            type="checkbox"
            name="swimming"
            checked={interests?.includes("swimming")}
            onChange={handleChangeData}
          />
          Swimming
        </label>
      </div>
      <div className="">
        <label htmlFor="">
          <input
            type="checkbox"
            name="gym"
            checked={interests?.includes("gym")}
            onChange={handleChangeData}
          />
          Gym
        </label>
        {error.interests && <span className="error">{error.interests}</span>}
      </div>
    </div>
  );
};
