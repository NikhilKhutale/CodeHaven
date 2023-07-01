
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDNmoa4jrVeNG8PE82lqeHety6tbFuab8g",
  authDomain: "blogposts-b619e.firebaseapp.com",
  projectId: "blogposts-b619e",
  storageBucket: "blogposts-b619e.appspot.com",
  messagingSenderId: "341266133967",
  appId: "1:341266133967:web:5015c84c751f47215618ba",
  measurementId: "G-FMGCJ3K13K"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;