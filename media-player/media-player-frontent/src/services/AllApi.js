import { commonAPI } from "./commonAPI";
import { downloadServerURL, serverURL } from "./serverUrl";
import { downloadAPI, videoDetailsAPI } from "./downloadAPI";

export const uploadVideo = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/videos`, reqBody);
};

export const getAllVideos = async () => {
  return await commonAPI("GET", `${serverURL}/videos`, "");
};

export const addNewCategory = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/category`, reqBody);
};

export const getAllCategories = async () => {
  return await commonAPI("GET", `${serverURL}/category`, "");
};

export const updateCategoryData = async (categoryId, category) => {
  return await commonAPI(
    "PUT",
    `${serverURL}/category/${categoryId}`,
    category
  );
};

export const deleteCategory = async (categoryId) => {
  return await commonAPI("DELETE", `${serverURL}/category/${categoryId}`, "");
};

export const addToHistory = async (video) => {
  return await commonAPI("POST", `${serverURL}/history`, video);
};

export const getAllHistory = async () => {
  return await commonAPI("GET", `${serverURL}/history`, "");
};

export const removeFromHistoryById = async (videoId) => {
  return await commonAPI("DELETE", `${serverURL}/history/${videoId}`, "");
};

export const downloadVideo = async (videoId) => {
  // return await downloadAPI('GET',`${downloadServerURL}/downloadVideo?id=${videoId}`,"");

  const blob = await downloadAPI(
    "GET",
    `${downloadServerURL}/downloadVideo?id=${videoId}`,
    ""
  );
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${videoId}.mp4`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const downloadAudio = async (videoId) => {
  const blob = await downloadAPI(
    "GET",
    `${downloadServerURL}/downloadAudio?id=${videoId}`,
    ""
  );

  if (blob) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${videoId}.mp3`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else {
    console.log("failed to start download");
  }
};

export const getVideoDetails = async (videoId) => {
  const response = await videoDetailsAPI(
    "GET",
    `${downloadServerURL}/getVideoDetails?id=${videoId}`,
    ""
  );
  if (response) {
    // console.log(response);
    return response;
  }
};

export const deleteVideo = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/videos/${id}`);
};
