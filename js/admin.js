// admin.js

firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    db.collection("users").doc(user.uid).get().then(doc => {
      if (!doc.exists || doc.data().role !== "admin") {
        alert("Access denied. Not an admin.");
        firebase.auth().signOut();
        window.location.href = "index.html";
      }
    });
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
});


// Add catering item
document.getElementById('add-catering-btn').addEventListener('click', () => {
  const itemName = document.getElementById('new-catering-item').value.trim();
  if (!itemName) return alert("Enter an item name");

  db.collection("menu_catering").add({ name: itemName }).then(() => {
    alert("Item added");
    document.getElementById('new-catering-item').value = "";
    loadCateringItems();
  });
});


// Load catering items on page load
function loadCateringItems() {
  const list = document.getElementById('catering-items-list');
  list.innerHTML = "";

  db.collection("menu_catering").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        db.collection("menu_catering").doc(doc.id).delete().then(() => {
          alert("Item deleted");
          loadCateringItems();
        });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

// Add stationery item
document.getElementById('add-stationery-btn').addEventListener('click', () => {
  const itemName = document.getElementById('new-stationery-item').value.trim();
  if (!itemName) return alert("Enter an item name");

  db.collection("menu_stationery").add({ name: itemName }).then(() => {
    alert("Item added");
    document.getElementById('new-stationery-item').value = "";
    loadStationeryItems();
  });
});

// Load stationery items
function loadStationeryItems() {
  const list = document.getElementById('stationery-items-list');
  list.innerHTML = "";

  db.collection("menu_stationery").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        db.collection("menu_stationery").doc(doc.id).delete().then(() => {
          alert("Item deleted");
          loadStationeryItems();
        });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

// Add a movie
document.getElementById('add-movie-btn').addEventListener('click', () => {
  const movieName = document.getElementById('new-movie-name').value.trim();
  if (!movieName) return alert("Enter a movie name");

  db.collection("menu_movies").add({ name: movieName }).then(() => {
    alert("Movie added");
    document.getElementById('new-movie-name').value = "";
    loadMovieList();
  });
});

// Load movie list
function loadMovieList() {
  const list = document.getElementById('movie-list');
  list.innerHTML = "";

  db.collection("menu_movies").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        db.collection("menu_movies").doc(doc.id).delete().then(() => {
          alert("Movie deleted");
          loadMovieList();
        });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

// Add fitness equipment
document.getElementById('add-fitness-btn').addEventListener('click', () => {
  const equipment = document.getElementById('new-fitness-item').value.trim();
  if (!equipment) return alert("Enter equipment name");

  db.collection("menu_fitness").add({ name: equipment }).then(() => {
    alert("Equipment added");
    document.getElementById('new-fitness-item').value = "";
    loadFitnessList();
  });
});

// Load fitness equipment
function loadFitnessList() {
  const list = document.getElementById('fitness-list');
  list.innerHTML = "";

  db.collection("menu_fitness").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        db.collection("menu_fitness").doc(doc.id).delete().then(() => {
          alert("Deleted");
          loadFitnessList();
        });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

// Add party hall type
document.getElementById('add-partyhall-btn').addEventListener('click', () => {
  const type = document.getElementById('new-partyhall-type').value.trim();
  if (!type) return alert("Enter a hall type");

  db.collection("menu_partyhall").add({ name: type }).then(() => {
    alert("Party hall type added");
    document.getElementById('new-partyhall-type').value = "";
    loadPartyHallTypes();
  });
});

// Load party hall types
function loadPartyHallTypes() {
  const list = document.getElementById('partyhall-list');
  list.innerHTML = "";

  db.collection("menu_partyhall").get().then(snapshot => {
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().name;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.onclick = () => {
        db.collection("menu_partyhall").doc(doc.id).delete().then(() => {
          alert("Deleted");
          loadPartyHallTypes();
        });
      };

      li.appendChild(delBtn);
      list.appendChild(li);
    });
  });
}

window.addEventListener('load', loadPartyHallTypes);


window.addEventListener('load', loadFitnessList);



window.addEventListener('load', loadMovieList);

window.addEventListener('load', loadStationeryItems);

window.addEventListener('load', loadCateringItems);
