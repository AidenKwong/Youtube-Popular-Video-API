import axios from "axios";
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001"
      : "https://youtube-popular-video-api.herokuapp.com",
});

export const regionAPI = async () => await API.get("/regions/allRegions");
export const countAPI = async () => await API.get("/videos/totalVideosCount");
export const videosAPI = async (region, date) =>
  await API.get("/videos/top10Videos", {
    params: {
      region: region,
      date: date,
    },
  });
export const mostFqWordsAPI = async (number) =>
  await API.get("/words/mostFrequentWords", { params: { number: number } });
export const videoCatsAPI = async () => await API.get("/videoCats");
export const channelAPI = async () => await API.get("/channel");
