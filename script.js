
// 🔍 SEARCH FUNCTION (Map + Result)
function searchPlace() {
  const place = document.getElementById("placeInput").value;

  if (place === "") {
    alert("Please enter a place");
    return;
  }

  // Update Google Map
  document.getElementById("map").src =
    "https://www.google.com/maps?q=" + encodeURIComponent(place) + "&output=embed";

  // Show result text
  document.getElementById("results").innerHTML =
    `<p>Showing results for: <b>${place}</b></p>`;
}


// 📅 BOOK GUIDE FUNCTION (Calls Firebase from firebase.js)
function bookGuide() {
  const name = document.getElementById("name").value;
  const place = document.getElementById("place").value;

  if (name === "" || place === "") {
    alert("Please fill all fields");
    return;
  }

  // Save to Firestore
  db.collection("bookings").add({
    name: name,
    place: place,
    time: new Date()
  })
  .then(() => {
    alert("Booking Successful ✅");

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("place").value = "";
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Error ❌");
  });
}
