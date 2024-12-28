import { useRef } from "react";

const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000);

const useCache = (key, expirationInSeconds) => {
  const cache = useRef(JSON.parse(localStorage.getItem(key)) || {});

  const setCache = (query, data) => {
    const timeStamp = getCurrentTimeStamp();

    caches.current[query] = { data, timeStamp };

    localStorage.setItem(key, JSON.stringify(cache.current));
  };

  const getCache = (query) => {
    const cacheData = cache.current[query];

    if (cacheData) {
      const { data, timeStamp } = cacheData;

      if (getCurrentTimeStamp() - timeStamp < expirationInSeconds) {
        return data;
      } else {
        delete cache.current[query];
        localStorage.setItem(key.JSON.stringify(cache.current));
      }
    }

    return null;
  };

  return { setCache, getCache };
};

export default useCache;
