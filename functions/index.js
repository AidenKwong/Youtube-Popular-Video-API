const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addRegions = functions.pubsub
  .schedule("0 0 1 */1 *")
  .onRun(async (context) => {
    const regions = await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${process.env.BACKUP_YOUTUBE_API_KEY}`
      )
      .catch((err) => console.log(err));

    regions.data.items.map(async (region) => {
      await admin
        .firestore()
        .collection("regions")
        .doc(region.snippet.name)
        .set(region);
    });
  });

exports.addVideos = functions.pubsub
  .schedule("0 */3 * * *")
  .onRun((context) => {
    const date = new Date();
    const hour = date.getHours();

    return admin
      .firestore()
      .collection("regions")
      .get()
      .then((regions) => {
        regions.forEach((region) => {
          const regionName = region.data().snippet.name;
          const regionId = region.data().id;
          axios
            .get(
              `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=10&key=${process.env.BACKUP_YOUTUBE_API_KEY}&regionCode=${regionId}`
            )
            .then((response) => {
              admin
                .firestore()
                .collection("dates")
                .doc(date.toDateString())
                .collection(regionName)
                .doc("hour: " + hour + "(en-US)")
                .set({ content: response.data.items });
            });
        });
      });
  });
// exports.getRegions = functions.https.onCall(async (data, context) => {
//   const regions = await axios
//     .get(
//       `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${process.env.BACKUP_YOUTUBE_API_KEY}`
//     )
//     .catch((err) => console.log(err));

//   regions.data.items.map(async (region) => {
//     await admin
//       .firestore()
//       .collection("regions")
//       .doc(region.snippet.name)
//       .set(region);
//   });
//   return { regions: regions.data.items };
// });

// exports.getVideos = functions.https.onCall(async (data, context) => {
//   const date = new Date();
//   const hour = date.getHours();

//   const regions = await admin.firestore().collection("regions").get();

//   const fetchVideos = async (regionId) => {
//     const { data } = await axios.get(
//       `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=10&key=${process.env.BACKUP_YOUTUBE_API_KEY}&regionCode=${regionId}`
//     );
//     return data.items;
//   };
//   regions.forEach(async (region) => {
//     const regionName = region.data().snippet.name || "";
//     const list = await fetchVideos(region.data().id);
//     await admin
//       .firestore()
//       .collection("dates")
//       .doc(date.toDateString())
//       .collection(regionName)
//       .doc("hour: " + hour + "(en-US)")
//       .set({ content: list });
//   });
// });
