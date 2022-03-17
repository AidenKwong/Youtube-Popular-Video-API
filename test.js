const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const fetchData = async (url) => {
  const regionCode = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${process.env.YOUTUBE_API_KEY}`
  );

  console.log(regionCode.data);
};
fetchData();
