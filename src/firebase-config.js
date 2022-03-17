import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAGKpVcGNJtmFQ7PCv7YvIdQaESjXeKxVw",
  authDomain: "api-1bf93.firebaseapp.com",
  projectId: "api-1bf93",
  storageBucket: "api-1bf93.appspot.com",
  messagingSenderId: "523587904901",
  appId: "1:523587904901:web:c88f75377d443389fad0ec",
  measurementId: "G-BCD1H1JZV2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const functions =
  window.location.hostname === "localhost"
    ? getFunctions(getApp())
    : getFunctions(app);
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}
