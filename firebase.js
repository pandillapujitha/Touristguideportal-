
const firebaseConfig = {
  apiKey: "AIzaSyAbRR9xtwBa7Yv93Q7U9UfSd7SqzfOXL6o",
  authDomain: "touristguideportal.firebaseapp.com",
  projectId: "touristguideportal",
  storageBucket: "touristguideportal.appspot.com", // ✅ FIXED
  messagingSenderId: "928040050366",
  appId: "1:928040050366:web:d5cb67a371f8f8b82848ef",
  measurementId: "G-JQRL29FV1L"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
