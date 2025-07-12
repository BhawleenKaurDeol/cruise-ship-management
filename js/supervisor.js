firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadStationeryOrders();
  }
});

function loadStationeryOrders() {
  const list = document.getElementById("stationery-orders-list");
  list.innerHTML = "";

  db.collection("orders_stationery").orderBy("timestamp", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      let itemList = "Unknown item(s)";

      if (Array.isArray(data.items)) {
        itemList = data.items.join(", ");
      } else if (typeof data.items === "string") {
        itemList = data.items;
      } else if (data.item) {
        itemList = data.item;
      }

      const li = document.createElement("li");
      li.textContent = `📦 ${itemList}`;
      list.appendChild(li);
    });
  });
}

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => window.location.href = "index.html");
});
