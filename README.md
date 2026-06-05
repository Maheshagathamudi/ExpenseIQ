<div align="center">

# ⚡ ExpenseIQ

**Smart Personal Finance Dashboard**

Track income, expenses, set budgets, and analyze spending — built with a modern fintech UI.

[![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Node.js](https://img.shields.io/badge/Node.js_18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![MIT License](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE)

[Live Demo →](https://expenseiq-demo.vercel.app)

</div>

---

## Features

### 📊 Dashboard Analytics
- **KPI Cards** — Animated counters for income, expenses, balance, and savings rate
- **Interactive Charts** — Pie (category breakdown), bar (monthly comparison), area (cashflow trend)
- **Quick Stats** — Transaction count, budget count, and spend ratio at a glance

### 💰 Transaction Management
- Add income or expense entries with category, payment method, date, and notes
- Set up recurring transactions (daily / weekly / monthly)
- Filter by category and search through history
- Safe deletion with confirmation dialog

### 🎯 Budget Tracking
- Set monthly limits per category (Food, Rent, Travel, etc.)
- Circular + linear progress indicators per budget
- Smart status alerts: **Safe** (green) · **Warning** (yellow) · **Exceeded** (red)

### 📥 Data Import
- **CSV Import** — Drag-and-drop upload for bank-exported files
- **OCR Receipt Scanning** — Upload receipt photos; amount and category are auto-suggested
- Real-time upload progress with shimmer animation

### 🔐 Authentication
- JWT-based login and registration with HTTP-only cookies
- Password strength indicator during signup
- Protected routes — dashboard requires authentication

### 🎨 UI/UX
- Glassmorphism cards with backdrop blur
- Animated logo with rotating rings and floating particles
- Staggered fade-ins, hover lifts, and shine effects
- Fully responsive — sidebar collapses on mobile

---

## Tech Stack

**Frontend**

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router DOM | Client-side routing |
| Recharts | Data visualization |
| Lucide React | Icons |
| CSS3 | Styling (no Tailwind) |

**Backend**

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database + ODM |
| JWT | Authentication |
| Multer | File uploads |
| Tesseract.js | OCR receipt scanning |
| csv-parser | CSV import |

---

## Project Structure

```
ExpenseIQ/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable components (AnimatedLogo, etc.)
│       ├── pages/          # Dashboard, Transactions, Budgets, Import, Auth
│       ├── context/        # Auth context
│       ├── services/       # API service layer
│       └── index.css       # Global styles
│
└── server/                 # Node.js backend
    ├── config/             # DB connection
    ├── controllers/        # Route controllers
    ├── middleware/         # Auth & error handling
    ├── models/             # Mongoose schemas
    ├── routes/             # API routes
    ├── utils/              # OCR & CSV helpers
    └── server.js           # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1 · Clone

```bash
git clone https://github.com/Maheshagathamudi/expenseiq.git
cd expenseiq
```

### 2 · Backend

```bash
cd server
npm install
```

Create a `.env` file (see template below), then:

```bash
npm run dev
```

### 3 · Frontend

```bash
cd ../client
npm install
npm run dev
```

### 4 · Open

Visit `http://localhost:5173`

---

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expenseiq
JWT_SECRET=your_super_secret_jwt_key_here
```

---

## API Reference

**Auth** — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Create new account |
| POST | `/login` | Login and receive token |
| POST | `/logout` | Clear token |

**Transactions** — `/api/transactions`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all transactions |
| POST | `/` | Add new transaction |
| DELETE | `/:id` | Delete transaction |

**Budgets** — `/api/budgets`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all budgets |
| POST | `/` | Create budget |
| DELETE | `/:id` | Delete budget |

**Other**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/summary` | Dashboard stats |
| POST | `/api/import/csv` | Upload CSV file |
| POST | `/api/import/ocr` | Upload receipt image |

---

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#0066FF` | Buttons, active states, links |
| Deep Navy | `#0A2540` | Sidebar, dark backgrounds |
| Teal Accent | `#00C2B3` | Gradients, secondary accents |
| Success Green | `#10B981` | Income, safe status |
| Danger Red | `#EF4444` | Expenses, exceeded budgets |
| Warning Yellow | `#F59E0B` | Warning status |

**Font:** Inter · Weights: 300, 400, 500, 600, 700, 800

**Responsive Breakpoints**

| Breakpoint | Changes |
|---|---|
| 1200px | KPI cards 2×2, charts stack |
| 768px | Sidebar hidden, mobile toggle visible |
| 480px | Compact cards, full-width inputs |

---

## Deployment

**Frontend** (Vercel / Netlify)
1. Push to GitHub and connect the repo
2. Build command: `npm run build` · Output: `dist`

**Backend** (Render / Railway)
1. Push to GitHub and connect the repo
2. Root directory: `server`
3. Build: `npm install` · Start: `npm start`
4. Add environment variables in the dashboard

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add your feature'`
4. Push and open a Pull Request

---

## Contact

**Mahesh Agathamudhi**
[GitHub](https://github.com/Maheshagathamudi) · [LinkedIn](https://www.linkedin.com/in/maheshagathamudi/) · [maheshagathamudi@gmail.com](mailto:maheshagathamudi@gmail.com)

<div align="center">

Made with ❤️ and ⚡ by **Mahesh Agathamudhi**

</div>
