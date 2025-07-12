// Sign Up
document.getElementById('signup-btn').addEventListener('click', () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        email: email,
        role: "voyager"
      });
    })
    .then(() => {
      alert("Voyager registered successfully!");
    })
    .catch(err => alert(err.message));
});

// Login handler
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).get();
    })
    .then(doc => {
      const userRole = doc.data().role;

      if (userRole === "admin") {
        window.location.href = "admin.html";
      } else if (userRole === "voyager") {
        window.location.href = "voyager.html";
      } else if (userRole === "manager") {
        window.location.href = "manager.html";
      }else if (userRole === "headcook") {
        window.location.href = "headcook.html";
      }else if (userRole === "supervisor") {
        window.location.href = "supervisor.html";
      }
      else {
        alert("Unknown role. Access denied.");
        auth.signOut();
      }
    })
    .catch(err => alert(err.message));
});


// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
  auth.signOut().then(() => location.reload());
});

document.getElementById('logout-btn-admin')?.addEventListener('click', () => {
  auth.signOut().then(() => location.reload());
});
