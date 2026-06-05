const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

    const categoryMap = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    const categoryData = Object.keys(categoryMap).map((category) => ({
      category,
      amount: categoryMap[category]
    }));

    const monthlyMap = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
        year: "numeric"
      });

      if (!monthlyMap[month]) {
        monthlyMap[month] = { month, income: 0, expense: 0 };
      }

      monthlyMap[month][t.type] += t.amount;
    });

    const monthlyData = Object.values(monthlyMap);

    const budgets = await Budget.find({ user: req.user._id });

    res.json({
      totalIncome,
      totalExpense,
      balance,
      savingsRate,
      categoryData,
      monthlyData,
      budgetCount: budgets.length,
      transactionCount: transactions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardSummary };