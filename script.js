// 🔍 SEARCH FUNCTION
function searchPlace() {
  const place = document.getElementById("placeInput").value;

  if (!place) {
    alert("Enter a place");
    return;
  }

  document.getElementById("map").src =
    "https://www.google.com/maps?q=" + encodeURIComponent(place) + "&output=embed";

  document.getElementById("results").innerHTML =
    "Showing results for: " + place;
}
