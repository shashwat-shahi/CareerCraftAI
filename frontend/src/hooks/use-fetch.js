import {useEffect, useState} from "react";

const useFetch = (url, options = {method: "GET", credentials: "include"}) => {
  const [val, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {...options});
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (url && !url.endsWith("null")) {
      fetchData();
    }
  }, [url]); // its optional to give "options" here

  return {val, loading, error};
};

export default useFetch;
