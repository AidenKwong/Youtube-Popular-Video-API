import axios from "axios";

export const mostPopular = (region) =>
  axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=20&key=AIzaSyBNKUVkKz9gCwPNZEc6mGvfCgi_IFRT5W0&regionCode=${region}`
    )
    .catch((error) => console.log(error));

export const regionRequest = () =>
  axios
    .get(
      "https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=AIzaSyBNKUVkKz9gCwPNZEc6mGvfCgi_IFRT5W0"
    )
    .catch((error) => console.log(error));
