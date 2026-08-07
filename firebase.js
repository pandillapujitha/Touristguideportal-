
// 🔥 YOUR FIREBASE CONFIG (PASTE YOUR REAL KEYS)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// 🔐 SIGNUP
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup Successful ✅");
    })
    .catch((error) => {
      alert(error.message);
    });
}


// 🔐 LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login Successful ✅");
    })
    .catch((error) => {
      alert(error.message);
    });
}


// 🔐 LOGOUT
function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert("Logged out ✅");
    });
}


// 👤 SHOW USER
firebase.auth().onAuthStateChanged((user) => {
  document.getElementById("user").innerText =
    user ? "Logged in as: " + user.email : "Not logged in";
});


// 📅 BOOK GUIDE (STORE DATA IN FIRESTORE)
function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please login first ❌");
    return;
  }

  db.collection("bookings").add({
    name: name,
    place: place,
    userEmail: user.email,
    createdAt: new Date()
  })
  .then(() => {
    alert("Booking Successful ✅");
  })
  .catch((error) => {
    alert("Error: " + error.message);
  });
}
