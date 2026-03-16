# Organest

A full-stack MERN productivity platform with task management, notes, multi-factor authentication, and an AI-powered plagiarism checker.

> **Live Demo:** [https://organest-gilt.vercel.app/](https://organest-gilt.vercel.app/)

---

## Features

- **Authentication** — Secure sign up / sign in with bcrypt password hashing and JWT sessions
- **Multi-Factor Authentication (MFA)** — TOTP-based 2FA via Google Authenticator with QR code setup
- **Task Management** — Create, update, and delete tasks with priority levels, due dates, and status tracking
- **Notes** — Full CRUD notes with tagging and timestamps
- **AI Plagiarism Checker** — Upload PDF, DOCX, or TXT files and get paragraph-level similarity scores powered by Google Custom Search API
- **Email Notifications** — Automated emails on signup and login via Nodemailer
- **Protected Dashboard** — Role-based routing with a clean sidebar layout

---

## Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 19.1.1 |
| Vite | 7.1.2 |
| React Router DOM | 7.9.1 |
| Axios | 1.13.2 |
| Bootstrap | 5.3.8 |
| Lucide React | 0.544.0 |

### Backend
| Technology | Version |
|---|---|
| Node.js + Express | 5.1.0 |
| MongoDB + Mongoose | 8.18.2 |
| JSON Web Token | 9.0.2 |
| Bcrypt | 6.0.0 |
| Speakeasy (TOTP) | 2.0.0 |
| Nodemailer | 7.0.6 |
| Multer | 2.0.2 |
| Helmet | 8.1.0 |

---

## Project Structure

```
organest/
├── client/                   # React + Vite frontend
│   └── src/
│       ├── api/              # Axios API integration layer
│       ├── assets/           # Static page components
│       ├── components/       # Reusable UI components
│       ├── context/          # Auth context (React Context API)
│       ├── layouts/          # Public and private layout wrappers
│       └── pages/            # Route-level page components
│
└── server/                   # Express.js backend
    ├── controllers/          # Request handler logic
    ├── middlewares/          # JWT auth + file upload middleware
    ├── models/               # Mongoose schemas (User, Task, Note)
    ├── routes/               # API route definitions
    ├── services/             # Plagiarism detection service
    └── utils/                # Mailer and file parsing utilities
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or remote URI)
- Gmail account with App Password (for email notifications)
- Google Custom Search API key + Search Engine ID (for plagiarism checker)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd organest

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install
```

### Environment Variables

**Server — create `server/.env`:**

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/organest

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google Custom Search (Plagiarism Checker)
GOOGLE_API_KEY=your_google_api_key
SEARCH_ENGINE_ID=your_search_engine_id

# Server
PORT=5000
NODE_ENV=development
```

**Client — create `client/.env.development`:**

```env
VITE_API_BASE=http://localhost:5000/api
```

### Running in Development

```bash
# Terminal 1 — Start the backend
cd server
npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Start the frontend
cd client
npm run dev
# Runs on http://localhost:5173
```

### Building for Production

```bash
cd client
npm run build
# Output in client/dist/
```

---

## API Reference

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate and receive JWT |
| POST | `/logout` | Invalidate session |
| GET | `/profile` | Get current user profile |
| PUT | `/profile` | Update profile details |
| PUT | `/mfa-settings` | Enable or disable MFA |

### Tasks — `/api/tasks`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all tasks for current user |
| POST | `/` | Create a new task |
| PUT | `/:id` | Update a task |
| DELETE | `/:id` | Delete a task |

### Notes — `/api/notes`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all notes for current user |
| POST | `/` | Create a new note |
| PUT | `/:id` | Update a note |
| DELETE | `/:id` | Delete a note |

### Plagiarism — `/api/check`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Upload a file and receive a plagiarism report |

---

## Application Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/signin` | Public | Sign in |
| `/signup` | Public | Sign up with MFA setup |
| `/dashboard` | Protected | Dashboard home — task overview |
| `/dashboard/tasks` | Protected | Task management |
| `/dashboard/notes` | Protected | Notes management |
| `/dashboard/ai-check` | Protected | AI plagiarism checker |
| `/dashboard/settings` | Protected | Application settings |
| `/dashboard/profile` | Protected | User profile |

---

## Notes

- MFA is optional but recommended. Users receive a QR code via email upon enabling it.
- The Google Custom Search API free tier allows 100 queries/day. Plagiarism checks use exponential backoff to handle rate limits.
- The `/uploads` directory is created automatically on the server when a file is first uploaded.
- JWT tokens and user data are stored in `localStorage` on the client.
