import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Plus,
  Trash2,
  Receipt,
  IndianRupee,
  Tag,
  CreditCard,
  Globe,
  CalendarDays,
  FileText,
  Repeat,
  ChevronDown,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
} from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    paymentMethod: "UPI",
    currency: "INR",
    note: "",
    date: new Date().toISOString().slice(0, 10),
    isRecurring: false,
    recurringFrequency: "monthly",
  });

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const url = filter ? `/transactions?category=${filter}` : "/transactions";
      const { data } = await API.get(url);
      setTransactions(data);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
    document.title = "ExpenseIQ | Transactions";
  }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });

      setForm({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        paymentMethod: "UPI",
        currency: "INR",
        note: "",
        date: new Date().toISOString().slice(0, 10),
        isRecurring: false,
        recurringFrequency: "monthly",
      });

      loadTransactions();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await API.delete(`/transactions/${id}`);
      loadTransactions();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const formFields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title e.g. Zomato order",
      icon: Receipt,
      required: true,
    },
    {
      name: "amount",
      type: "number",
      placeholder: "Amount",
      icon: IndianRupee,
      required: true,
    },
    {
      name: "type",
      type: "select",
      icon: ArrowDownRight,
      options: [
        { value: "expense", label: "Expense" },
        { value: "income", label: "Income" },
      ],
    },
    {
      name: "category",
      type: "text",
      placeholder: "Category or leave blank for auto",
      icon: Tag,
    },
    {
      name: "paymentMethod",
      type: "select",
      icon: CreditCard,
      options: [
        { value: "UPI", label: "UPI" },
        { value: "Cash", label: "Cash" },
        { value: "Card", label: "Card" },
        { value: "Bank Transfer", label: "Bank Transfer" },
      ],
    },
    {
      name: "currency",
      type: "select",
      icon: Globe,
      options: [
        { value: "INR", label: "INR (₹)" },
        { value: "USD", label: "USD ($)" },
        { value: "EUR", label: "EUR (€)" },
      ],
    },
    {
      name: "date",
      type: "date",
      icon: CalendarDays,
    },
    {
      name: "note",
      type: "textarea",
      placeholder: "Add a note (optional)",
      icon: FileText,
    },
  ];

  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h2>Transactions</h2>
          <p>Add income, expenses, recurring entries, and filter by category.</p>
        </div>
      </div>

      <div className="form-table-grid">
        {/* Add Transaction Form */}
        <div className="form-card glass">
          <div className="form-header">
            <div className="form-icon">
              <Plus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3>Add Transaction</h3>
              <p className="form-subtitle">Record a new income or expense</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {formFields.map((field, index) => {
              const Icon = field.icon;
              const delay = index * 0.05;

              if (field.type === "select") {
                return (
                  <div
                    key={field.name}
                    className="input-group"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className="input-icon">
                      <Icon size={18} />
                    </div>
                    <select
                      value={form[field.name]}
                      onChange={(e) =>
                        setForm({ ...form, [field.name]: e.target.value })
                      }
                      className="has-icon"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === "textarea") {
                return (
                  <div
                    key={field.name}
                    className="input-group"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <div className="input-icon textarea-icon">
                      <Icon size={18} />
                    </div>
                    <textarea
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={(e) =>
                        setForm({ ...form, [field.name]: e.target.value })
                      }
                      className="has-icon"
                      rows={3}
                    />
                  </div>
                );
              }

              return (
                <div
                  key={field.name}
                  className="input-group"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="input-icon">
                    <Icon size={18} />
                  </div>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={(e) =>
                      setForm({ ...form, [field.name]: e.target.value })
                    }
                    required={field.required}
                    className="has-icon"
                  />
                </div>
              );
            })}

            {/* Recurring Toggle */}
            <div className="recurring-section">
              <label
                className={`recurring-toggle ${form.isRecurring ? "active" : ""}`}
                onClick={() =>
                  setForm({ ...form, isRecurring: !form.isRecurring })
                }
              >
                <div className="recurring-icon">
                  <Repeat size={18} />
                </div>
                <div className="recurring-info">
                  <span className="recurring-label">Recurring Transaction</span>
                  <span className="recurring-desc">
                    Set up automatic repeating entries
                  </span>
                </div>
                <div className={`toggle-switch ${form.isRecurring ? "on" : ""}`}>
                  <div className="toggle-knob"></div>
                </div>
              </label>

              {form.isRecurring && (
                <div className="recurring-options fade-in">
                  <div className="input-group">
                    <div className="input-icon">
                      <CalendarDays size={18} />
                    </div>
                    <select
                      value={form.recurringFrequency}
                      onChange={(e) =>
                        setForm({ ...form, recurringFrequency: e.target.value })
                      }
                      className="has-icon"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              <Plus size={18} />
              Save Transaction
            </button>
          </form>
        </div>

        {/* Transaction List */}
        <div className="table-card glass">
          <div className="table-header">
            <div className="table-header-left">
              <div className="table-icon">
                <Wallet size={18} />
              </div>
              <div>
                <h3>Transaction List</h3>
                <p className="table-subtitle">
                  {transactions.length} {transactions.length === 1 ? "entry" : "entries"} found
                </p>
              </div>
            </div>
            <div className="filter-group">
              <div className="input-icon small">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Filter by category..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-input has-icon"
              />
              {filter && (
                <button
                  className="clear-filter"
                  onClick={() => setFilter("")}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="table-wrap">
            {loading ? (
              <div className="table-loading">
                <div className="loading-spinner small"></div>
                <p>Loading transactions...</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th className="text-right">Amount</th>
                    <th>Date</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, index) => (
                    <tr
                      key={t._id}
                      className="transaction-row"
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      <td>
                        <div className="transaction-title">
                          <span className="title-text">{t.title}</span>
                          {t.note && (
                            <span className="title-note">{t.note}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${t.type} pill`}>
                          {t.type === "income" ? (
                            <ArrowUpRight size={12} />
                          ) : (
                            <ArrowDownRight size={12} />
                          )}
                          {t.type}
                        </span>
                      </td>
                      <td>
                        <span className="category-tag">{t.category || "—"}</span>
                      </td>
                      <td className="text-right">
                        <span
                          className={`amount ${t.type}`}
                        >
                          {t.type === "income" ? "+" : "−"}₹{t.amount.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className="date-cell">
                          {new Date(t.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="delete-btn"
                          onClick={() => deleteTransaction(t._id)}
                          title="Delete transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-content">
                          <Receipt size={40} className="empty-icon" />
                          <p>No transactions found</p>
                          <span>
                            {filter
                              ? "Try a different filter or add a new transaction"
                              : "Add your first transaction to get started"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}