import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendHttpReq = useCallback(async (requestConfi, actionOnSuccess = () => {}) => {
    setIsLoading(true)
    try {
      const response = await fetch(requestConfi.url, {
        method: requestConfi.method ? requestConfi.method : "GET",
        body: requestConfi.body ? JSON.stringify(requestConfi.body) : null,
      });

      setIsLoading(false);

      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error.message);
      }
    
      actionOnSuccess(data);
    } catch (e) {
      alert(e);
    }
  },[]);

  return {sendHttpReq, isLoading};
};

export default useFetch;
