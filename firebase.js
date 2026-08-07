
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  db.collection("bookings").add({
    name: name,
    place: place
  })
  .then(() => {
    alert("Booking Successful ✅");
  })
  .catch((error) => {
    console.error(error);
  });
}
