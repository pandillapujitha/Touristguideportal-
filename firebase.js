
// 🔥 Firebase Configuration (REPLACE WITH YOUR KEYS)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// 🔌 Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 📦 Firestore DB
const db = firebase.firestore();

// =====================================================
// 🔐 AUTHENTICATION FUNCTIONS
// =====================================================

// ✅ SIGNUP
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup Successful ✅");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// ✅ LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login Successful ✅");
    })
    .catch((error) => {
      alert(error.message);
    });
}

// ✅ LOGOUT
function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert("Logged out ✅");
    });
}

// =====================================================
// 👤 AUTH STATE (SHOW USER)
// =====================================================

firebase.auth().onAuthStateChanged((user) => {
  const userText = document.getElementById("user");

  if (user) {
    userText.innerText = "Logged in as: " + user.email;
  } else {
    userText.innerText = "Not logged in";
  }
});

// =====================================================
// 📅 BOOKING FUNCTION (PROTECTED 🔒)
// =====================================================

function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  const user = firebase.auth().currentUser;

  // 🔒 Restrict if not logged in
  if (!user) {
    alert("Please login first ❌");
    return;
  }

  if (!name || !place) {
    alert("Fill all fields");
    return;
  }

  db.collection("bookings").add({
    name: name,
    place: place,
    userEmail: user.email,
    time: new Date()
  })
  .then(() => {
    alert("Booking Successful ✅");

    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("place").value = "";
  })
  .catch((error) => {
    console.error(error);
    alert("Error ❌");
  });
}
