# Mini Social Post Application

[cite_start]A full-stack, responsive mini social media feed application built as part of the internship assignment selection process[cite: 1, 40]. [cite_start]Users can securely create accounts, log in, publish text posts with local image uploads, and interact with other users' posts via real-time likes and comments[cite: 4, 11, 12, 15, 21].

[cite_start]The user interface is fully optimized for desktop and mobile displays, taking direct layout and visual inspiration from the TaskPlanet app's social feed[cite: 4, 9, 36, 56].

## 🚀 Tech Stack

- [cite_start]**Frontend:** React.js (Vite) [cite: 25]
- [cite_start]**Backend:** Node.js + Express [cite: 26]
- [cite_start]**Database:** MongoDB Atlas (Utilizing exactly 2 collections: `users` and `posts`) [cite: 37, 49]
- [cite_start]**Styling:** Custom Vanilla CSS (**Zero TailwindCSS used**) [cite: 32, 33]

---

## ✨ Features Implemented

1. [cite_start]**Stricter Authentication Flow:** Secure signup and login parsing with hashed passwords via `bcryptjs` and session tokens via `jsonwebtoken`[cite: 12]. [cite_start]Users are strictly routed from Signup ➡️ Login ➡️ Feed view[cite: 38].
2. [cite_start]**Flexible Post Creation:** Supports posting text, local image files (parsed efficiently as Base64 strings directly into the collection), or both[cite: 15]. [cite_start]Neither field is mandatory[cite: 17].
3. [cite_start]**Double-Submission Prevention:** The submission pipeline implements a loading latch state that freezes inputs and debounces the posting trigger, completely eliminating duplicate content uploads[cite: 58].
4. [cite_start]**Interactive Public Feed:** A centralized timeline viewable by all users[cite: 18]. [cite_start]Displays author names, custom content, dynamically generated colorful profile avatars based on user initials, and explicit reaction counts[cite: 19, 22].
5. [cite_start]**Instant UI Synchronization:** Likes and comments append to the user interface dynamically, updating interactive states immediately without forcing page reloads[cite: 39].
6. [cite_start]**Efficient Pagination Logic:** Implements server-assisted chunk pagination matching performance standards to dynamically load posts without degrading client responsiveness[cite: 57]. [cite_start]Includes React rendering protection against Strict Mode double-fetching bugs during local assembly[cite: 58].

---

## 📂 Project Structure

```text
mini-social-app/
[cite_start]├── backend/            # Express Node Server Layer 
│   ├── middleware/    # Authentication Gatekeepers
[cite_start]│   ├── models/        # Mongoose Schemas (Strictly User & Post collections) [cite: 37]
│   ├── routes/        # Auth and Post API Endpoints
│   └── server.js      # Server Bootstrap File
[cite_start]└── frontend/           # Vite React Web Client Layer 
    ├── src/
    │   ├── components/# Modular UI Blocks (Navbar, CreatePost, PostCard)
    │   ├── pages/     # Login, Signup, and Feed Layout Views
    │   └── App.jsx    # Application Router Routing Core