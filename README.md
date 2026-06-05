⚡ ExpenseIQ
Smart Personal Finance Dashboard — Track income, expenses, set budgets, and analyze spending patterns with a modern fintech UI.
https://react.dev
https://vitejs.dev
https://nodejs.org
https://mongodb.com
LICENSE
🎥 Demo
Live Demo: https://expenseiq-demo.vercel.app (replace with your deployed URL)
✨ Features
📊 Dashboard Analytics
Real-time KPI Cards — Income, Expense, Balance, Savings Rate with animated counters
Interactive Charts — Pie chart (category spending), Bar chart (monthly comparison), Area chart (cashflow trend)
Quick Stats — Transaction count, budget count, spend ratio
💰 Transaction Management
Add Transactions — Income/Expense with category, payment method, date, notes
Recurring Transactions — Set up monthly/weekly/daily recurring entries
Filter & Search — Filter by category, search through history
Delete with Confirmation — Safe deletion with confirmation dialog
🎯 Budget Tracking
Category Budgets — Set monthly limits for Food, Rent, Travel, etc.
Visual Progress — Circular progress indicator + linear progress bar
Smart Alerts — Safe (green) / Warning (yellow) / Exceeded (red) status
Color-coded Cards — Each category has its own icon and color
📥 Data Import
CSV Import — Upload bank-style CSV files with drag & drop
OCR Receipt Scanning — Upload receipt images, extract text and auto-suggest amount/category
Upload Progress — Real-time progress bar with shimmer animation
🔐 Authentication
JWT-based Auth — Secure login/register with HTTP-only cookies
Password Strength — Visual indicator during registration
Protected Routes — Dashboard accessible only after login
🎨 Premium UI/UX
Glassmorphism Design — Frosted glass cards with backdrop blur
Animated Logo — Rotating rings, floating particles, draw-on-load lightning bolt
Smooth Animations — Staggered fade-ins, hover lifts, shine effects
Fully Responsive — Sidebar collapses on mobile, touch-friendly
Dark Sidebar — Navy gradient sidebar with active state indicators
🛠️ Tech Stack
Frontend
Table
Technology	Purpose
React 18	UI Framework
Vite	Build Tool
React Router DOM	Client-side Routing
Recharts	Data Visualization
Lucide React	Icon Library
CSS3	Styling (no Tailwind)
Backend
Table
Technology	Purpose
Node.js	Runtime
Express.js	Web Framework
MongoDB	Database
Mongoose	ODM
JWT	Authentication
Multer	File Uploads
Tesseract.js	OCR (Receipt Scanning)
CSV-Parser	CSV Import
📁 Project Structure
plain
ExpenseIQ/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable Components
│   │   │   └── AnimatedLogo.jsx
│   │   ├── pages/          # Page Components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Transactions.jsx
│   │   │   ├── Budgets.jsx
│   │   │   ├── ImportData.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/        # Auth Context
│   │   ├── services/       # API Service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Global Styles
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Node.js Backend
│   ├── config/             # DB Config
│   ├── controllers/        # Route Controllers
│   ├── middleware/         # Auth & Error Middleware
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   ├── utils/              # OCR & CSV Helpers
│   ├── .env.example        # Environment Template
│   ├── package.json
│   └── server.js           # Entry Point
│
├── .gitignore
└── README.md
🚀 Getting Started
Prerequisites
Node.js 18+ and npm
MongoDB Atlas account (or local MongoDB)
1. Clone the Repository
bash
git clone https://github.com/yourusername/expenseiq.git
cd expenseiq
2. Setup Backend
bash
cd server
npm install
Create .env file:
env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expenseiq
JWT_SECRET=your_super_secret_jwt_key_here
Start server:
bash
npm run dev
3. Setup Frontend
bash
cd ../client
npm install
npm run dev
4. Open in Browser
Visit: http://localhost:5173
📝 Environment Variables
Server .env
Table
Variable	Description	Required
PORT	Server port (default: 5000)	Yes
MONGO_URI	MongoDB connection string	Yes
JWT_SECRET	Secret key for JWT tokens	Yes
🔑 API Endpoints
Authentication
Table
Method	Endpoint	Description
POST	/api/auth/register	Create new account
POST	/api/auth/login	Login & get token
POST	/api/auth/logout	Clear token
Transactions
Table
Method	Endpoint	Description
GET	/api/transactions	Get all transactions
POST	/api/transactions	Add new transaction
DELETE	/api/transactions/:id	Delete transaction
Budgets
Table
Method	Endpoint	Description
GET	/api/budgets	Get all budgets
POST	/api/budgets	Create budget
DELETE	/api/budgets/:id	Delete budget
Dashboard
Table
Method	Endpoint	Description
GET	/api/dashboard/summary	Get dashboard stats
Import
Table
Method	Endpoint	Description
POST	/api/import/csv	Upload CSV file
POST	/api/import/ocr	Upload receipt image
🎨 Design System
Colors
Table
Token	Hex	Usage
Primary Blue	#0066FF	Buttons, active states, links
Deep Navy	#0A2540	Sidebar, dark backgrounds
Teal Accent	#00C2B3	Gradients, secondary accents
Success Green	#10B981	Income, safe status
Danger Red	#EF4444	Expense, exceeded status
Warning Yellow	#F59E0B	Warning status
Typography
Font: Inter (Google Fonts)
Weights: 300, 400, 500, 600, 700, 800
📱 Responsive Breakpoints
Table
Breakpoint	Layout Changes
1200px	KPI cards 2×2, charts stack, budgets single column
768px	Sidebar hides, mobile toggle appears, single column
480px	Compact cards, stacked topbar, full-width inputs
🚢 Deployment
Frontend (Vercel/Netlify)
Push code to GitHub
Connect repo to Vercel
Set build command: npm run build
Set output directory: dist
Backend (Render/Railway)
Push code to GitHub
Connect repo to Render
Set root directory: server
Set build command: npm install
Set start command: npm start
Add environment variables
Full-Stack (Render)
Use the root package.json with concurrently to run both frontend and backend.
🤝 Contributing
Contributions are welcome! Please follow these steps:
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License — see the LICENSE file for details.
🙏 Acknowledgments
React — UI Library
Vite — Build Tool
Recharts — Charts
Lucide — Icons
MongoDB — Database
📬 Contact
Mahesh Agathamudhi
GitHub: 
LinkedIn: 
Email:maheshagathamudi@gmail.com
<p align="center">
  Made with ❤️ and ⚡ by <strong>Mahesh Agathamudhi</strong>
</p>