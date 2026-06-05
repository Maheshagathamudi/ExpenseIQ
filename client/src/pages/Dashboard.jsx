import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
  TrendingUp,
  Wallet,
  TrendingDown,
  Activity,
  DollarSign,
} from "lucide-react";

// Animated counter hook
function useAnimatedCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const targetRef = useRef(target);

  useEffect(() => {
    targetRef.current = target;
    const start = countRef.current;
    const end = target;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function - easeOutQuart
      const easeOut = 1 - Math.pow(1 - progress, 4);

      const current = start + (end - start) * easeOut;
      countRef.current = current;
      setCount(Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
}

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    savingsRate: 0,
    categoryData: [],
    monthlyData: [],
    transactionCount: 0,
    budgetCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard/summary");
      setSummary(data);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    document.title = "ExpenseIQ | Dashboard";
  }, []);

  // Animated values
  const animatedIncome = useAnimatedCounter(summary.totalIncome);
  const animatedExpense = useAnimatedCounter(summary.totalExpense);
  const animatedBalance = useAnimatedCounter(summary.balance);
  const animatedSavings = useAnimatedCounter(summary.savingsRate);

  const kpiCards = [
    {
      title: "Total Income",
      value: `₹${animatedIncome.toLocaleString()}`,
      rawValue: summary.totalIncome,
      icon: ArrowUpCircle,
      gradient: "income",
      subtitle: "All time earnings",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Expense",
      value: `₹${animatedExpense.toLocaleString()}`,
      rawValue: summary.totalExpense,
      icon: ArrowDownCircle,
      gradient: "expense",
      subtitle: "All time spending",
      trend: "-5%",
      trendUp: false,
    },
    {
      title: "Net Balance",
      value: `₹${animatedBalance.toLocaleString()}`,
      rawValue: summary.balance,
      icon: Wallet,
      gradient: "balance",
      subtitle: "Current net worth",
      trend: summary.balance >= 0 ? "Healthy" : "Alert",
      trendUp: summary.balance >= 0,
    },
    {
      title: "Savings Rate",
      value: `${animatedSavings}%`,
      rawValue: summary.savingsRate,
      icon: TrendingUp,
      gradient: "savings",
      subtitle: "Income saved",
      trend: summary.savingsRate > 20 ? "Good" : "Low",
      trendUp: summary.savingsRate > 20,
    },
  ];

  const colors = ["#0066FF", "#00C2B3", "#7C3AED", "#10B981", "#F59E0B"];
  const expenseColors = ["#EF4444", "#F97316", "#F59E0B", "#10B981", "#3B82F6"];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h2>Overview</h2>
          <p>Here is your income, expense, budget, and cashflow summary.</p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index} 
              className={`kpi-card ${card.gradient}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="kpi-card-inner">
                <div className="kpi-header">
                  <div className={`kpi-icon ${card.gradient}`}>
                    <Icon size={22} strokeWidth={2.5} />
                  </div>
                  <div className={`kpi-trend ${card.trendUp ? "up" : "down"}`}>
                    <span>{card.trend}</span>
                  </div>
                </div>
                <div className="kpi-body">
                  <h3 className="kpi-value">{card.value}</h3>
                  <p className="kpi-title">{card.title}</p>
                  <p className="kpi-subtitle">{card.subtitle}</p>
                </div>
                <div className="kpi-shine"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="dashboard-grid">
        {/* Category Pie Chart */}
        <div className="chart-card glass">
          <div className="chart-header">
            <div className="chart-icon">
              <Activity size={18} />
            </div>
            <div>
              <h3>Category-wise Spending</h3>
              <p className="chart-subtitle">Breakdown by expense category</p>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summary.categoryData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  cx="50%"
                  cy="50%"
                  animationBegin={200}
                  animationDuration={1200}
                >
                  {summary.categoryData.map((_, index) => (
                    <Cell 
                      key={index} 
                      fill={expenseColors[index % expenseColors.length]} 
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  iconSize={10}
                />
              </PieChart>
            </ResponsiveContainer>
            {summary.categoryData.length === 0 && (
              <div className="empty-chart">
                <DollarSign size={48} className="empty-icon" />
                <p>No spending data yet</p>
                <span>Add transactions to see insights</span>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div className="chart-card glass">
          <div className="chart-header">
            <div className="chart-icon blue">
              <BarChartIcon size={18} />
            </div>
            <div>
              <h3>Monthly Income vs Expense</h3>
              <p className="chart-subtitle">Compare your cashflow over time</p>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.monthlyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94A3B8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value >= 1000 ? (value/1000) + 'k' : value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={10} />
                <Bar 
                  dataKey="income" 
                  fill="#0066FF" 
                  radius={[8, 8, 0, 0]}
                  name="Income"
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="expense" 
                  fill="#EF4444" 
                  radius={[8, 8, 0, 0]}
                  name="Expense"
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cashflow Area Chart */}
        <div className="chart-card glass wide">
          <div className="chart-header">
            <div className="chart-icon teal">
              <TrendingUp size={18} />
            </div>
            <div>
              <h3>Cashflow Trend</h3>
              <p className="chart-subtitle">Income trajectory over months</p>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={summary.monthlyData}>
                <defs>
                  <linearGradient id="cashflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.4} />
                    <stop offset="50%" stopColor="#0066FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94A3B8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#94A3B8" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value >= 1000 ? (value/1000) + 'k' : value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={10} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#0066FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#cashflow)"
                  name="Income"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#expenseFlow)"
                  name="Expense"
                  animationDuration={1500}
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <ReceiptText size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{summary.transactionCount}</span>
                <span className="stat-label">Transactions</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon purple">
                <Target size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{summary.budgetCount}</span>
                <span className="stat-label">Budgets</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon green">
                <Calendar size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                <span className="stat-label">Last Updated</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon orange">
                <TrendingDown size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">
                  {summary.totalExpense > 0 
                    ? Math.round((summary.totalExpense / (summary.totalIncome || 1)) * 100) 
                    : 0}%
                </span>
                <span className="stat-label">Spend Ratio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional icons needed
function BarChartIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  );
}

function ReceiptText(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
      <path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>
    </svg>
  );
}

function Target(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function Calendar(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}