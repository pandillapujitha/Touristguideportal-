
// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function for button
function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  db.collection("bookings").add({
    name: name,
    place: place
  })
  .then(() => {
    document.getElementById("result").innerText = "Booking Successful ✅";
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("result").innerText = "Error ❌";
  });
}
