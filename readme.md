# 📝 My Notes — Full Stack Notes App (Frontend)

A beautiful, mobile-optimised notes app built with **React + Tailwind CSS**.  
Features Apple-style liquid glass UI, JWT authentication, and full CRUD backed by a MongoDB API.

---

## ✨ Features

- 🔐 **Login & Signup** — JWT-based authentication
- 📝 **Create, Edit, Delete** notes in real time
- 💾 **Auto-save** — notes save automatically as you type
- 🗂️ **Categories** — Personal, Work, Ideas, Others
- 🔍 **Search** — filter notes instantly by title or content
- 🌙 **Dark / Light Mode** — toggle with persistent preference
- 📱 **Mobile Optimised** — slide-in sidebar, full-screen editor, smooth transitions
- 🍎 **Glass UI** — Apple-style frosted glass panels throughout

---

## 🛠️ Tech Stack

| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| Tailwind CSS 3 | Styling |
| Vite 5 | Build tool & dev server |
| Context API | Global state (auth + notes) |
| Fetch API | HTTP requests to backend |
| localStorage | Token & theme persistence |

---

## 📁 Project Structure

```
notes-frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── auth.js          # login & register API calls
│   │   └── notes.js         # CRUD API calls (with JWT token)
│   ├── components/
│   │   ├── NoteCard.jsx     # single note preview card
│   │   ├── NoteEditor.jsx   # full note editor with auto-save
│   │   ├── NoteList.jsx     # list of filtered note cards
│   │   ├── SearchBar.jsx    # search input
│   │   └── Sidebar.jsx      # categories, theme toggle, logout
│   ├── context/
│   │   ├── AuthContext.jsx  # login/register/logout state
│   │   └── NotesContext.jsx # notes CRUD + filter state
│   ├── hooks/
│   │   └── useLocalStorage.js  # persists data to localStorage
│   ├── pages/
│   │   └── AuthPage.jsx     # login & signup page
│   ├── utils/
│   │   └── helpers.js       # formatDate, truncateText
│   ├── App.jsx              # main layout + routing logic
│   ├── main.jsx             # React entry point
│   └── index.css            # Tailwind + custom glass styles
├── .env                     # API URL config (never push to GitHub)
├── .gitignore
├── index.html
├── netlify.toml             # Netlify SPA routing config
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone or extract the project

```bash
cd notes-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your backend URL

Open `.env` and set your backend URL:

```env
# Local development
VITE_API_URL=http://localhost:5000

# Production (your Render backend URL)
VITE_API_URL=https://your-backend.onrender.com
```

> ⚠️ All Vite env variables must start with `VITE_`

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready to deploy.

---

## 🌐 Deploy to Netlify

### Option A — Drag & Drop (fastest)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder onto the Netlify dashboard

### Option B — Connect GitHub (recommended)
1. Push your code to GitHub (`.env` is in `.gitignore` — it won't be pushed)
2. Go to Netlify → **Add new site → Import from Git**
3. Set build settings:
   ```
   Build command:  npm run build
   Publish dir:    dist
   ```
4. Add environment variable on Netlify:
   ```
   Key:    VITE_API_URL
   Value:  https://your-backend.onrender.com
   ```
5. Click **Deploy**

> The `netlify.toml` file already handles SPA routing — no 404 on page refresh.

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend base URL (no trailing slash) | `https://notes-api.onrender.com` |

**Local** → set in `.env` file  
**Netlify** → set in Site Settings → Environment Variables

---

## 🔗 Backend Requirements

This frontend connects to a **Node.js / Express / MongoDB** backend.

Expected API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user, returns JWT |
| `GET` | `/api/notes` | Get all notes (auth required) |
| `POST` | `/api/notes` | Create note (auth required) |
| `PUT` | `/api/notes/:id` | Update note (auth required) |
| `DELETE` | `/api/notes/:id` | Delete note (auth required) |

Every notes request sends JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## 📱 Mobile Experience

| Action | Behaviour |
|---|---|
| Open app | Note list fills full screen |
| Tap hamburger | Sidebar slides in from left |
| Tap a note | Editor slides in, full screen |
| Tap ← Back | Returns to note list |
| Tap + button | Creates new note and opens editor |

---

## 🎨 Design System

| Element | Value |
|---|---|
| Display font | Playfair Display (headings) |
| Body font | DM Sans |
| Primary accent | Indigo → Purple gradient |
| Glass effect | `backdrop-filter: blur(24px)` + white/10 bg |
| Dark mode | Triggered by `.dark` class on `<html>` |
| Persistence | Theme saved to `localStorage` |

---

## 👨‍💻 Made By

**Monu** — BCA Student, MERN Stack Developer  
GitHub: [@Monu-Devvv](https://github.com/Monu-Devvv)

---

## 📄 License

MIT — free to use and modify.