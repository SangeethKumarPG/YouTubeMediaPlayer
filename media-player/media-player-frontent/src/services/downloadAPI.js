import axios from "axios";

export const downloadAPI = async (httpMethod, url, requestBody) => {
  let requestConfig = {
    method: httpMethod,
    url: url,
    data: requestBody,
    responseType:"blob",
    Headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios(requestConfig)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const videoDetailsAPI =  async (httpMethod, url, requestBody) => {
  let requestConfig = {
    method: httpMethod,
    url: url,
    data: requestBody,
    responseType: "json", 
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios(requestConfig)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.error("Error in downloadAPI:", error);
      return null;
    });
};
