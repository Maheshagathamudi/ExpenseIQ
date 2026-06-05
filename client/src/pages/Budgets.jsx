import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Trash2,
  Plus,
  Wallet,
  Tag,
  IndianRupee,
  CalendarDays,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  PieChart,
  Target,
  ShoppingBag,
  Home,
  Car,
  Lightbulb,
  GraduationCap,
  Utensils,
  MoreHorizontal,
} from "lucide-react";

// Category icon mapping
const categoryIcons = {
  Food: Utensils,
  Rent: Home,
  Travel: Car,
  Shopping: ShoppingBag,
  Bills: Lightbulb,
  Education: GraduationCap,
  Other: MoreHorizontal,
};

// Category colors
const categoryColors = {
  Food: "#F59E0B",
  Rent: "#EF4444",
  Travel: "#3B82F6",
  Shopping: "#EC4899",
  Bills: "#8B5CF6",
  Education: "#10B981",
  Other: "#64748B",
};

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "Food",
    limit: "",
    month: new Date().toISOString().slice(0, 7),
    currency: "INR",
  });

  const loadBudgets = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/budgets");
      setBudgets(data);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
    document.title = "ExpenseIQ | Budgets";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/budgets", {
        ...form,
        limit: Number(form.limit),
      });

      setForm({
        category: "Food",
        limit: "",
        month: new Date().toISOString().slice(0, 7),
        currency: "INR",
      });

      loadBudgets();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const deleteBudget = async (id) => {
    if (!window.confirm("Delete this budget?")) return;
    try {
      await API.delete(`/budgets/${id}`);
      loadBudgets();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const categories = ["Food", "Rent", "Travel", "Shopping", "Bills", "Education", "Other"];
  const currencies = ["INR", "USD", "EUR"];

  // Get month name from YYYY-MM
  const getMonthName = (monthStr) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  };

  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h2>Budgets</h2>
          <p>Create monthly category budgets and track usage.</p>
        </div>
      </div>

      <div className="form-table-grid">
        {/* Create Budget Form */}
        <div className="form-card glass">
          <div className="form-header">
            <div className="form-icon">
              <Plus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3>Create Budget</h3>
              <p className="form-subtitle">Set spending limits by category</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Category Select */}
            <div className="input-group" style={{ animationDelay: "0s" }}>
              <div className="input-icon">
                <Tag size={18} />
              </div>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="has-icon"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Limit */}
            <div className="input-group" style={{ animationDelay: "0.05s" }}>
              <div className="input-icon">
                <IndianRupee size={18} />
              </div>
              <input
                type="number"
                placeholder="Budget limit"
                value={form.limit}
                onChange={(e) => setForm({ ...form, limit: e.target.value })}
                required
                className="has-icon"
              />
            </div>

            {/* Month */}
            <div className="input-group" style={{ animationDelay: "0.1s" }}>
              <div className="input-icon">
                <CalendarDays size={18} />
              </div>
              <input
                type="month"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="has-icon"
              />
            </div>

            {/* Currency */}
            <div className="input-group" style={{ animationDelay: "0.15s" }}>
              <div className="input-icon">
                <Globe size={18} />
              </div>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="has-icon"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">
              <Target size={18} />
              Save Budget
            </button>
          </form>
        </div>

        {/* Budget Cards Grid */}
        <div className="budgets-grid">
          {loading ? (
            <div className="budgets-loading">
              <div className="loading-spinner small"></div>
              <p>Loading budgets...</p>
            </div>
          ) : (
            <>
              {budgets.map((b, index) => {
                const Icon = categoryIcons[b.category] || MoreHorizontal;
                const color = categoryColors[b.category] || "#64748B";
                const percentage = Math.min(b.percentage, 100);
                const isExceeded = b.alert === "Exceeded";
                const isWarning = b.alert === "Warning";
                const isSafe = b.alert === "Safe";

                return (
                  <div
                    key={b._id}
                    className={`budget-card-premium ${isExceeded ? "exceeded" : ""} ${isWarning ? "warning" : ""}`}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Card Header */}
                    <div className="budget-card-header">
                      <div
                        className="budget-category-icon"
                        style={{
                          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
                          color: color,
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="budget-card-info">
                        <h4 className="budget-category">{b.category}</h4>
                        <span className="budget-month">{getMonthName(b.month)}</span>
                      </div>
                      <button
                        className="delete-btn"
                        onClick={() => deleteBudget(b._id)}
                        title="Delete budget"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Circular Progress */}
                    <div className="budget-progress-section">
                      <div className="circular-progress">
                        <svg viewBox="0 0 120 120" className="progress-ring">
                          <circle
                            className="progress-ring-bg"
                            cx="60"
                            cy="60"
                            r="50"
                          />
                          <circle
                            className="progress-ring-fill"
                            cx="60"
                            cy="60"
                            r="50"
                            style={{
                              stroke: isExceeded
                                ? "#EF4444"
                                : isWarning
                                ? "#F59E0B"
                                : color,
                              strokeDasharray: `${2 * Math.PI * 50}`,
                              strokeDashoffset: `${2 * Math.PI * 50 * (1 - percentage / 100)}`,
                            }}
                          />
                        </svg>
                        <div className="progress-text">
                          <span className="progress-percent">{b.percentage}%</span>
                          <span className="progress-label">used</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="budget-stats">
                        <div className="stat-row">
                          <span className="stat-label">Spent</span>
                          <span className="stat-value spent">
                            ₹{b.spent?.toLocaleString()}
                          </span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Limit</span>
                          <span className="stat-value limit">
                            ₹{b.limit?.toLocaleString()}
                          </span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">Remaining</span>
                          <span
                            className={`stat-value remaining ${isExceeded ? "negative" : ""}`}
                          >
                            ₹{(b.limit - b.spent)?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Linear Progress Bar */}
                    <div className="budget-linear-progress">
                      <div className="progress-bar-bg">
                        <div
                          className={`progress-bar-fill ${isExceeded ? "danger" : isWarning ? "warning" : ""}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="budget-status">
                      {isExceeded && (
                        <span className="status-badge danger">
                          <XCircle size={14} />
                          Exceeded
                        </span>
                      )}
                      {isWarning && (
                        <span className="status-badge warning">
                          <AlertTriangle size={14} />
                          Warning
                        </span>
                      )}
                      {isSafe && (
                        <span className="status-badge safe">
                          <CheckCircle2 size={14} />
                          Safe
                        </span>
                      )}
                      <span className="status-percent">
                        {b.percentage}% of budget
                      </span>
                    </div>
                  </div>
                );
              })}

              {budgets.length === 0 && (
                <div className="empty-budgets">
                  <div className="empty-content">
                    <Wallet size={48} className="empty-icon" />
                    <p>No budgets created yet</p>
                    <span>Create your first budget to start tracking spending limits</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}