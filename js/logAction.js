function logAction(userId, action) {
  return db.collection("logs").add({
    userId: userId,
    action: action,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}
