
// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// 🔐 SIGNUP
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup Successful ✅"))
    .catch((e) => alert(e.message));
}

// 🔐 LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert("Login Successful ✅"))
    .catch((e) => alert(e.message));
}

// 🔐 LOGOUT
function logout() {
  firebase.auth().signOut()
    .then(() => alert("Logged out ✅"));
}

// 👤 SHOW USER
firebase.auth().onAuthStateChanged((user) => {
  document.getElementById("user").innerText =
    user ? "Logged in as: " + user.email : "Not logged in";
});

// 📅 BOOK (ONLY IF LOGGED IN)
function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please login first ❌");
    return;
  }

  db.collection("bookings").add({
    name,
    place,
    userEmail: user.email,
    time: new Date()
  })
  .then(() => alert("Booking Successful ✅"))
  .catch(() => alert("Error ❌"));
}
