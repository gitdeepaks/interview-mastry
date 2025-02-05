import React, { useState } from "react";
import { tabs } from "./tabs.js"; // or wherever you defined tabs

export const TabForm = () => {
  const [data, setData] = useState({
    name: "Deepak",
    age: 33,
    email: "deepak@email.com",
    interest: ["coding", "swimming", "gym"],
    theme: "dark",
  });
  const [error, setError] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const ActiveTab = tabs[activeTab].component;

  const handleNextClick = () => {
    // Pass 'data' and 'setError' so the validate function can use them
    if (tabs[activeTab].validate(data, setError)) {
      setActiveTab((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (tabs[activeTab].validate(data, setError)) {
      setActiveTab((prev) => prev - 1);
    }
  };

  const handleSubmitClick = () => {
    // Final submission logic
    console.log(data);
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((tab, index) => (
          <div
            className="heading"
            key={index}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTab data={data} setData={setData} error={error} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrevClick}>Previous</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};
