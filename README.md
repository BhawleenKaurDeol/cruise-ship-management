# cruise-ship-management

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
