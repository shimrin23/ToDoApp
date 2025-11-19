# ToDo App (Frontend)

A small, clean, and easy-to-read frontend for a ToDo application built with React — created as a learning project to study monostack technologies and the basic full-stack ideas. The UI focuses on the common CRUD flows for tasks and integrates with a simple backend API.

---

## 🔷 Quick overview

* **Purpose:** Learning project to practice frontend React and how it connects to a backend (the “mono/monostack” learning stack).
* **What it does:** Create, read, update (mark complete), and delete tasks.
* **Project location:** `ToDoApp/frontend` (this README is for the frontend).

---

## ✨ Features

* Add new tasks with a title (and optional details).
* View all tasks — filters for `all`, `active`, and `completed`.
* Mark tasks as completed / toggle completed state.
* Edit or delete tasks.
* Simple, responsive UI suitable for extension.

---

## 💻 Tech stack

* **React** (Create React App)
* **Axios** — HTTP client for API calls
* **CSS3 / Flexbox** — basic styling (or your preferred styling solution)
* Optional: React Router (if you add routing), localStorage fallback for offline/testing.

> Note: This frontend is written to talk to a backend API. For a monostack learning setup you might combine this with a Node/Express + MongoDB backend (MERN-style), but any RESTful backend works.

---

## 🚀 Getting started (development)

### Prerequisites

* Node.js (v14+ recommended)
* npm (comes with Node) or yarn

### Install & run

1. Clone your repo:

```bash
git clone https://github.com/shimrin23/ToDoApp.git
```

2. Move into the frontend directory:

```bash
cd ToDoApp/frontend
```

3. Install dependencies:

```bash
npm install
# or
yarn
```

4. Create a `.env` file in the `frontend` directory and set the backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Run the app:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) — the app will reload on code changes.

---

## Available scripts

* `npm start` — runs the app in development mode ([http://localhost:3000](http://localhost:3000)).
* `npm test` — runs the test runner in interactive watch mode.
* `npm run build` — builds the app for production into `build/`.
* `npm run eject` — **one-way** operation to eject CRA configs (only if you need to customize build toolchain).

---

## 📡 API (example contract)

This frontend expects a RESTful API with endpoints like the examples below. Adjust to match your backend.

* **GET /tasks** — get list of tasks
  Response example:

  ```json
  [
    { "_id": "1", "title": "Buy milk", "completed": false, "createdAt": "2025-11-20T..." },
    { "_id": "2", "title": "Read book", "completed": true, "createdAt": "2025-11-19T..." }
  ]
  ```

* **POST /tasks** — create a new task
  Request body:

  ```json
  { "title": "New task" }
  ```

  Response: created task object.

* **PATCH /tasks/:id** — update a task (e.g., toggle completed)
  Request body (partial update):

  ```json
  { "completed": true }
  ```

* **DELETE /tasks/:id** — delete a task

### Example curl

```bash
# create
curl -X POST $REACT_APP_API_URL/tasks -H "Content-Type: application/json" -d '{"title":"Test task"}'

# list
curl $REACT_APP_API_URL/tasks

# update
curl -X PATCH $REACT_APP_API_URL/tasks/<id> -H "Content-Type: application/json" -d '{"completed":true}'

# delete
curl -X DELETE $REACT_APP_API_URL/tasks/<id>
```

---

## ⚙️ Frontend folder structure (suggested)

```
frontend/
├─ src/
│  ├─ components/     # TaskItem, TaskList, TaskForm, Header, Footer...
│  ├─ pages/          # optional: Home, About, Settings
│  ├─ services/       # api.js (axios instance + API helper functions)
│  ├─ styles/         # css or scss files
│  ├─ App.js
│  └─ index.js
├─ public/
├─ .env
└─ package.json
```

---

## Tips & suggestions (to practice monostack ideas)

* Add a small Node/Express backend that stores tasks in MongoDB — this completes the “mono/monostack” learning loop.
* Add authentication (JWT) so each user has their own task list.
* Add sorting, due dates, and local offline sync (localStorage fallback).
* Add unit tests for components using React Testing Library + Jest.

---

## Troubleshooting

* If API calls fail, confirm `REACT_APP_API_URL` is correct and backend server is running.
* If `npm start` fails with port error, maybe another process uses port 3000 — try `PORT=3001 npm start`.
* For CORS errors, enable CORS on the backend (e.g., `cors` middleware in Express).

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`
2. Commit your changes: `git commit -m "feat: add ..."`
3. Push and open a pull request.

Be descriptive in PRs and include screenshots for UI changes.

---

## Screenshots & demo

*(Add screenshots or a short GIF here to show the UI — helpful for README readers.)*

---

## License

Use whichever license you prefer. Example:

```
MIT License
```

---

## Contact / Author

* shimrin — (add your email or GitHub profile link if you want contact details)

---

### Final notes

This README is optimized for clarity and learning. If you want, I can:

* Expand the backend README to match (Node/Express + MongoDB).
* Create the `services/api.js` axios wrapper example.
* Produce a screenshot-ready sample or a `README.md` file you can drop straight into `frontend/`.

Would you like me to generate the `api.js` service file and a short example `TaskList` React component next?
