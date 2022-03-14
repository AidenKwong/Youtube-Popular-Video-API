const axios = require("axios");

exports.handler = async function (event, context) {
  const { YOUTUBE_API_KEY } = process.env;

  const { region } = event.queryStringParameters;
  const mostPopular = (region) =>
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=20&key=${YOUTUBE_API_KEY}&regionCode=${region}`
      )
      .catch((error) => console.log(error));

  const { data } = await mostPopular(region);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
