import { useCallback } from "react";

const useFetch = () => {
  const sendHttpReq = useCallback(async (requestConfi, actionOnSuccess = () => {}) => {
    try {
      const response = await fetch(requestConfi.url, {
        method: requestConfi.method ? requestConfi.method : "GET",
        body: requestConfi.body ? JSON.stringify(requestConfi.body) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      actionOnSuccess(data);
    } catch (e) {
      alert(e);
    }
  },[]);

  return sendHttpReq;
};

export default useFetch;
