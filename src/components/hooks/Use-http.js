import { useCallback } from "react";

const UseHttp = () => {
  const sendRequest = useCallback(async (reqConfig, applyData) => {
    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        headers: reqConfig.headers ? reqConfig.headers : {},
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return {
    sendRequest: sendRequest,
  };
};

export default UseHttp;
