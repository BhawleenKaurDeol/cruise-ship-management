# 🛳️ Cruise Ship Management System

A full-stack web application built to digitize the voyage experience on cruise ships. It enables voyagers to order catering/stationery, book services, and empowers crew members to manage operations efficiently through role-specific dashboards.

> ✅ Built using **HTML, CSS, JavaScript, Firebase Auth, and Firestore**

---

## 🚀 Features by Role

### 👤 Voyager

- Sign up / Login using Firebase Auth
- Order catering (snacks, beverages, etc.)
- Order stationery (books, gifts, etc.)
- Book:
  - 🎬 Movie tickets (with seat selection)
  - 💇 Beauty salon services
  - 🏋️ Fitness equipment (with time slot)
  - 🎉 Party halls (with type: wedding, birthday, etc.)
- Logs actions to Firestore
- Logout and session persistence

### 🛠️ Admin

- Login with Firebase Auth (role-based)
- Add / Edit / Delete:
  - Catering Items
  - Stationery Items
  - Movies
  - Fitness Equipment
  - Party Hall Types
- Manage Voyager registration (optional)

### 🧑‍💼 Manager

- View all bookings:
  - Movies
  - Salon
  - Fitness
  - Party Hall

### 👨‍🍳 Head-Cook

- View catering orders

### 📦 Supervisor

- View stationery orders

---

## 🔐 Firebase Collections

| Collection          | Purpose                         |
| ------------------- | ------------------------------- |
| `users`             | Voyager and role-based accounts |
| `orders_catering`   | Catering orders                 |
| `orders_stationery` | Stationery orders               |
| `bookings_movies`   | Movie ticket bookings           |
| `bookings_salon`    | Salon service bookings          |
| `bookings_fitness`  | Fitness equipment bookings      |
| `bookings_party`    | Party hall bookings             |
| `menu_catering`     | Admin-defined catering items    |
| `menu_stationery`   | Admin-defined stationery items  |
| `menu_movies`       | Movie list                      |
| `menu_fitness`      | Equipment list                  |
| `menu_partyhall`    | Party hall types                |
| `logs`              | Action logs with timestamps     |

---

## 💻 Tech Stack

| Layer           | Tech                           |
| --------------- | ------------------------------ |
| Frontend        | HTML, CSS, JS                  |
| Authentication  | Firebase Auth                  |
| Database        | Firebase Firestore             |
| Hosting         | Firebase Hosting _(or Vercel)_ |
| Logging         | Firestore-based, centralized   |
| Version Control | Git + GitHub (public repo)     |

---

## 📁 Project Structure

/public
├── index.html
├── admin.html
├── voyager.html
├── manager.html
├── headcook.html
├── supervisor.html
└── css/style.css

/js
├── firebase-config.js
├── voyager.js
├── admin.js
├── manager.js
├── headcook.js
├── supervisor.js
├── logAction.js

README.md

## ✅ Testing & Optimization

### Manual Test Cases

#### Voyager Dashboard

- ✅ Sign up and log in as Voyager
- ✅ Order catering (e.g., Snacks, Beverages) → Firestore → `orders_catering`
- ✅ Order stationery (e.g., Pens, Books) → Firestore → `orders_stationery`
- ✅ Book movie ticket → Firestore → `bookings_movies`
- ✅ Book beauty salon service → Firestore → `bookings_salon`
- ✅ Book fitness equipment with time slot → Firestore → `bookings_fitness`
- ✅ Book party hall with type → Firestore → `bookings_party`
- ✅ Log out works and redirects properly

#### Admin Dashboard

- ✅ Add/Edit/Delete Catering Items → Firestore → `menu_catering`
- ✅ Add/Edit/Delete Stationery Items → Firestore → `menu_stationery`
- ✅ Add Movies → Firestore → `menu_movies`
- ✅ Add Fitness Equipment → Firestore → `menu_fitness`
- ✅ Add Party Hall Types → Firestore → `menu_partyhall`

#### Manager Dashboard

- ✅ Can view bookings from all 4 booking modules
- ✅ Bookings appear in reverse chronological order

#### Head-Cook Dashboard

- ✅ Can view catering orders
- ✅ Handles both single and multi-item orders

#### Supervisor Dashboard

- ✅ Can view stationery orders
- ✅ Displays item list clearly

#### Logging

- ✅ Every Voyager/Admin action is logged to Firestore → `logs`

### Optimization Summary

- 🔁 **Reusable Logging**: Used `logAction(userId, action)` helper to standardize all logs
- 📉 **Firestore Reads**: Minimized unnecessary `.get()` calls and used `.orderBy()` only when needed
- 🧼 **UI Cleanup**: Cleared inputs after actions and updated UI without page reloads
- 🔐 **Security**: Role-based routing via Firebase Auth ensures proper user access
- 💥 **Error Handling**: All major Firebase actions wrapped with `.catch()` or `try/catch`
- ♻️ **Modular Code**: Each role (Voyager, Admin, Manager, etc.) has separate HTML/JS for maintainability
