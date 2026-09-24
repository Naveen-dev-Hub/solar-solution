# SuryaPower Solar - Full Stack Website

This project contains the SolarPower Solar frontend and an Express + MongoDB Atlas backend.

## Folder structure

- `frontend/index.html` - website
- `frontend/css/style.css` - styling
- `frontend/js/script.js` - form submission
- `backend/server.js` - Express API and MongoDB connection
- `backend/.env.example` - environment variable example
- `backend/package.json` - backend dependencies

## Where form data is stored

When a visitor submits the Request Solar Quote form:

1. `frontend/js/script.js` sends the form data to `POST http://localhost:5000/api/solar-requests`.
2. `backend/server.js` receives the data.
3. The backend inserts it into MongoDB Atlas.
4. Database name: `SuryaPowerSolar` (from `DB_NAME`).
5. Collection name: `solarRequests`.

You can view the submissions in MongoDB Atlas:
`SuryaPowerSolar` database -> `solarRequests` collection.

## Setup

### 1. Install Node.js

Install Node.js if it is not already installed.

### 2. Open backend folder in VS Code

Open a terminal in the `backend` folder and run:

```bash
npm install
```

### 3. Create `.env`

Create a file named `.env` inside `backend`.

Copy the values from `.env.example` and replace the MongoDB username, password and cluster connection string.

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=SuryaPowerSolar
```

Do not upload `.env` to GitHub.

### 4. Start backend

Inside `backend`:

```bash
node server.js
```

You should see:

- MongoDB Atlas connected successfully
- Server running at http://localhost:5000

### 5. Run frontend

Open `frontend/index.html` with VS Code Live Server.

The form sends submissions to the backend on port 5000.

## Check saved data

Open MongoDB Atlas -> your cluster -> Browse Collections:

`SuryaPowerSolar` -> `solarRequests`

Every submitted form will appear as a document.

## Important

This is a demo enquiry website. Government subsidy information and eligibility should be verified on the official PM Surya Ghar/MNRE portal before applying.
