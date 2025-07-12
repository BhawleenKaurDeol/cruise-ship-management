firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // Optional: role-based check if needed
    loadAllBookings();
  }
});

function loadAllBookings() {
  loadList("bookings_movies", "movie-bookings-list", b => `🎬 ${b.movie} - Seat ${b.seat}`);
  loadList("bookings_salon", "salon-bookings-list", b => `💇 ${b.service}`);
  loadList("bookings_fitness", "fitness-bookings-list", b => `🏋️ ${b.equipment} at ${b.timeSlot}`);
  loadList("bookings_party", "party-bookings-list", b => `🎉 ${b.partyType}`);
}

function loadList(collection, listId, formatFn) {
  const list = document.getElementById(listId);
  list.innerHTML = "";

  db.collection(collection).orderBy("timestamp", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = formatFn(data);
      list.appendChild(li);
    });
  });
}

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => window.location.href = "index.html");
});
