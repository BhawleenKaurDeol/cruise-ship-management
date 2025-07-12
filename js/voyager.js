// voyager.js

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    // Optional: verify role is 'voyager'
    db.collection("users").doc(user.uid).get().then(doc => {
      if (!doc.exists || doc.data().role !== "voyager") {
        alert("Access denied. Not a Voyager.");
        firebase.auth().signOut();
        window.location.href = "index.html";
      }
    });
  }
});

// Show catering form
document.getElementById('order-catering-btn').addEventListener('click', () => {
  document.getElementById('catering-form').style.display = 'block';
});

// Show stationery form
document.getElementById('order-stationery-btn').addEventListener('click', () => {
  document.getElementById('stationery-form').style.display = 'block';
});


// Submit catering order
document.getElementById('submit-catering-order').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#catering-form input[type="checkbox"]:checked');
  const selectedItems = Array.from(checkboxes).map(cb => cb.value);

  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  const user = firebase.auth().currentUser;

  db.collection("orders_catering").add({
    userId: user.uid,
    items: selectedItems,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Catering order placed!");
    document.getElementById('catering-form').style.display = 'none';
    checkboxes.forEach(cb => cb.checked = false);

    logAction(firebase.auth().currentUser.uid, `Placed catering order: ${selectedItems.join(", ")}`);

  }).catch(err => {
    console.error(err);
    alert("Failed to place order.");
  });
});

//submit stationary order

document.getElementById('submit-stationery-order').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#stationery-form input[type="checkbox"]:checked');
  const selectedItems = Array.from(checkboxes).map(cb => cb.value);

  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  const user = firebase.auth().currentUser;

  db.collection("orders_stationery").add({
    userId: user.uid,
    items: selectedItems,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Stationery order placed!");
    document.getElementById('stationery-form').style.display = 'none';
    checkboxes.forEach(cb => cb.checked = false);

    logAction(firebase.auth().currentUser.uid, `Placed stationery order: ${selectedItems.join(", ")}`);
  }).catch(err => {
    console.error(err);
    alert("Failed to place stationery order.");
  });
});

//show movie booking form

document.getElementById('book-movie-btn').addEventListener('click', () => {
  document.getElementById('movie-booking-form').style.display = 'block';
});


//movie booking submission

document.getElementById('submit-movie-booking').addEventListener('click', () => {
  const movie = document.getElementById('movie-select').value;
  const seat = document.getElementById('seat-number').value.trim();

  if (!seat) {
    alert("Please enter a seat number.");
    return;
  }

  const user = firebase.auth().currentUser;

  db.collection("bookings_movies").add({
    userId: user.uid,
    movie: movie,
    seat: seat,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Movie ticket booked!");
    document.getElementById('movie-booking-form').style.display = 'none';
    document.getElementById('seat-number').value = "";
    logAction(firebase.auth().currentUser.uid, `Booked movie: ${movie}, Seat: ${seat}`);

  }).catch((err) => {
    console.error(err);
    alert("Failed to book movie ticket.");
  });
});


// show beauty Salon form
document.getElementById('book-salon-btn').addEventListener('click', () => {
  document.getElementById('salon-booking-form').style.display = 'block';
});

//beauty salon booking submission

document.getElementById('submit-salon-booking').addEventListener('click', () => {
  const service = document.getElementById('salon-service').value;
  const user = firebase.auth().currentUser;

  db.collection("bookings_salon").add({
    userId: user.uid,
    service: service,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Salon booked!");
    document.getElementById('salon-booking-form').style.display = 'none';

    logAction(firebase.auth().currentUser.uid, `Booked salon service: ${service}`);
  }).catch((err) => {
    console.error(err);
    alert("Salon booking failed.");
  });
});


//book fitness center
document.getElementById('book-fitness-btn').addEventListener('click', () => {
  document.getElementById('fitness-booking-form').style.display = 'block';
});

//fitness center booking submission
document.getElementById('submit-fitness-booking').addEventListener('click', () => {
  const equipment = document.getElementById('equipment-select').value;
  const timeSlot = document.getElementById('time-slot').value;
  const user = firebase.auth().currentUser;

  db.collection("bookings_fitness").add({
    userId: user.uid,
    equipment,
    timeSlot,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Fitness slot booked!");
    document.getElementById('fitness-booking-form').style.display = 'none';

    logAction(firebase.auth().currentUser.uid, `Booked fitness: ${equipment} at ${timeSlot}`);

  }).catch((err) => {
    console.error(err);
    alert("Fitness booking failed.");
  });
});

//party booking form
document.getElementById('book-party-btn').addEventListener('click', () => {
  document.getElementById('party-hall-form').style.display = 'block';
});

//party booking submission
document.getElementById('submit-party-booking').addEventListener('click', () => {
  const partyType = document.getElementById('party-type').value;
  const user = firebase.auth().currentUser;

  db.collection("bookings_party").add({
    userId: user.uid,
    partyType,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Party hall booked!");
    document.getElementById('party-hall-form').style.display = 'none';

    logAction(firebase.auth().currentUser.uid, `Booked party hall for: ${partyType}`);

  }).catch((err) => {
    console.error(err);
    alert("Party hall booking failed.");
  });
});



// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
});
