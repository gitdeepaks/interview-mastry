import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResuts, setShowResuts] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [cachedResults, setCachedResults] = useState({});

  async function fetchData() {
    if (cachedResults[input]) {
      console.log("Cached input", input);
      setResults(cachedResults[input]);
      return;
    }
    try {
      if (!input.trim()) {
        setResults([]);
        return;
      }

      console.log("API CALL", input);
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setResults(json?.recipes || []);
      setCachedResults((prev) => ({
        ...prev,
        [input]: json?.recipes || [],
      }));
      setError({ status: false, message: "" });
    } catch (err) {
      setError({
        status: true,
        message: err.message || "Something went wrong! Please try again.",
      });
      setResults([]);
    }
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  if (error.status) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error.message}</p>
        <button
          onClick={() => {
            setError({ status: false, message: "" });
            setInput("");
          }}
        >
          Try Again
        </button>
      </div>
    );
  } else
    return (
      <div className="content">
        <h1>Autocomplete Search Bar</h1>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResuts(true)}
          onBlur={() => setShowResuts(false)}
        />
        <div className="res-container">
          {showResuts &&
            results.map((res) => (
              <span className="res" key={res.id}>
                {res.name}
                <img
                  src={res.image}
                  alt="recipes"
                  className="result-image"
                  width={50}
                  height={50}
                />
              </span>
            ))}
        </div>
      </div>
    );
};
export default App;
