if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

export const firebaseConfig = {
  apiKey: "AIzaSyC0R35s-u9bZCZOpwg8jVIzYg77HeKgr0Y",
  authDomain: "weee.city",
  databaseURL: "https://wecity-223ab.firebaseio.com",
  projectId: "wecity-223ab",
  storageBucket: "wecity-223ab.appspot.com",
  messagingSenderId: "766690753861",
  appId: "1:766690753861:web:dd74263fa376676b10922c",
  measurementId: "G-017VVRXFJC"
};

export const mapboxConfig = {
  accessToken: process.env.MAPBOX_TOKEN
}