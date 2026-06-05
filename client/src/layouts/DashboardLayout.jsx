import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnimatedLogo from "../components/AnimatedLogo";  // ← ADD THIS
import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Upload,
  LogOut,
  Sparkles,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/transactions", label: "Transactions", icon: ReceiptText },
    { path: "/budgets", label: "Budgets", icon: Wallet },
    { path: "/import", label: "CSV / OCR Import", icon: Upload },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand">
          <AnimatedLogo />  {/* ← USE IT HERE */}
        </div>

        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <Sparkles size={18} />
          <h4>Budget Smartly</h4>
          <p>Track expenses, reduce overspending, and improve savings.</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main-content">
        <button
          className="mobile-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <header className="topbar">
          <div>
            <p className="muted">Welcome back,</p>
            <h1>{user?.name || "User"} 👋</h1>
          </div>
          <div className="profile-pill">{user?.currency || "INR"}</div>
        </header>

        {children}
      </main>
    </div>
  );
}