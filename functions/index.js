const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");

admin.initializeApp();

const testingCron = "*/1 * * * *";

const productionCron = "0 */3 * * *";

exports.addRegions = functions.pubsub
  .schedule("0 0 1 */1 *")
  .onRun((context) => {
    return axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${process.env.BACKUP_YOUTUBE_API_KEY}`
      )
      .then((response) => {
        response.data.items.map(async (region) => {
          await admin
            .firestore()
            .collection("regions")
            .doc(region.snippet.name)
            .set(region);
        });
      });
  });

const fetch = (region) => {
  const date = new Date();
  const hour = date.getHours();
  const regionName = region.data().snippet.name;
  const regionId = region.data().id;
  axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=10&key=${process.env.BACKUP_YOUTUBE_API_KEY}&regionCode=${regionId}`
    )
    .then(async (response) => {
      return await admin
        .firestore()
        .collection("dates")
        .doc(date.toDateString())
        .collection(regionName)
        .doc("hour: " + hour + "(en-US)")
        .set({ content: response.data.items });
    });
};

exports.addVideos = functions.pubsub.schedule(testingCron).onRun((context) => {
  const promises = [];
  admin
    .firestore()
    .collection("regions")
    .get()
    .then(function (querySnapshot) {
      for (const region in querySnapshot.docs) {
        promises.push(fetch(region));
      }
      return Promise.all(promises);
    });
});

// exports.getRegions = functions.https.onCall(async (data, context) => {
//   const regions = await axios
//     .get(
//       `https://youtube.googleapis.com/youtube/v3/i18nRegions?part=snippet&key=${process.env.BACKUP_YOUTUBE_API_KEY}`
//     )
//     .catch((err) => console.log(err));

//   return { regions: regions.data.items };
// });

// exports.getVideos = functions.https.onCall((data, context) => {
//   functions.logger.log(data.region);
//   const date = new Date().toDateString();
//   return admin
//     .firestore()
//     .collection("dates")
//     .doc(date)
//     .collection(data.region)
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         functions.logger.log(doc.id);
//         functions.logger.log(doc.id, " => ", doc.data());
//       });
//     });
// });
