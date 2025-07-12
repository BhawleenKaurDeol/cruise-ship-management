firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadCateringOrders();
  }
});

function loadCateringOrders() {
  const list = document.getElementById("catering-orders-list");
  list.innerHTML = "";

  db.collection("orders_catering").orderBy("timestamp", "desc").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      let itemList = "Unknown item(s)";

        if (Array.isArray(data.items)) {
        itemList = data.items.join(", ");
        } else if (typeof data.items === "string") {
        itemList = data.items;
        } else if (data.item) {
        itemList = data.item;
        }

        li.textContent = `🍽️ ${itemList}`;

      list.appendChild(li);
    });
  });
}

document.getElementById("logout-btn").addEventListener("click", () => {
  firebase.auth().signOut().then(() => window.location.href = "index.html");
});
