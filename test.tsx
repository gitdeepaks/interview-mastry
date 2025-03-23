import React, { useState } from "react";

export const FetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");

      if (!res.ok) {
        throw new Error("NetWork Error");
      }

      const fetcheddata = await res.json();
      setData(fetcheddata);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  });

  if (loading) return <div className="">loading...</div>;

  if (error) return <div className="">Error...</div>;

  return <div className="">{JSON.stringify(data)}</div>;
};
