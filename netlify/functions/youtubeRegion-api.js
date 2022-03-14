const axios = require("axios");

exports.handler = async function (event, context) {
  const { YOUTUBE_API_KEY } = process.env;

  const regionRequest = () =>
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${YOUTUBE_API_KEY}`
      )
      .catch((error) => console.log(error));

  const { data } = await regionRequest();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
