/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

import debounce from "lodash/debounce";
import SuggestionsList from "./SuggestionsList";
import useCache from "../hooks/UseCache";

const Autocomplete = ({
  staticData,
  fetchSuggestions,
  placeholder = "",
  customloading = "Loading...",
  caching = true,
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { setCache, getCache } = useCache("autocomplete", 3600);

  const SuggestionsListRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    const cachedSuggesion = getCache(query);
    if (cachedSuggesion && caching) {
      setSuggestions(cachedSuggesion);
    } else {
      setLoading(true);
      try {
        let result;
        if (staticData) {
          result = staticData.filter((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          });
        } else if (fetchSuggestions) {
          result = await fetchSuggestions(query);
        }
        setCache(query, result);
        setSuggestions(result);
      } catch (err) {
        setError("Failed to fetch suggestions", err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  useEffect(() => {
    setSelectedIndex(-1);
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const scrollIntoView = (index) => {
    if (SuggestionsListRef.current) {
      const suggestionElements =
        SuggestionsListRef.current.getElementsByTagName("li"); // Corrected method name
      if (suggestionElements[index]) {
        suggestionElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest", // Corrected spelling
        });
      }
    }
  };

  function hanKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) => {
          const newIndex = (prev + 1) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => {
          const newIndex = (prev - 1 + suggestions.length) % suggestions.length;
          scrollIntoView(newIndex);
          return newIndex;
        });
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        onKeyDown={hanKeyDown}
        aria-autocomplete="list"
        aria-controls="SuggestionsList"
        aria-activedescendant={`suggestion -${selectedIndex}`}
      />

      {(suggestions.length > 0 || loading || error) && (
        <ul
          ref={SuggestionsListRef}
          className="suggestions-list"
          role="listbox"
        >
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customloading}</div>}
          <SuggestionsList
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
