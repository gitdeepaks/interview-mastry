import { useEffect, useRef, useState } from "react";
import "./App.css";

// OTP input
const OTP_DIGIT_COUNT = 5;

const App = () => {
  const [inputArray, setInputArray] = useState(
    new Array(OTP_DIGIT_COUNT).fill("")
  );

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    console.log(value);
    const newValue = value.trim();
    const newArray = [...inputArray];
    newArray[index] = newValue.slice(-1);
    setInputArray(newArray);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    // console.log(e);
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="content">
      <h1>Validate OTP</h1>

      {inputArray.map((input, index) => {
        return (
          <input
            className="otp-input"
            type="text"
            key={index}
            value={inputArray[index]}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default App;
