const Budget = require("../models/Budget");
const Transaction = require("../models/Transaction");

const createBudget = async (req, res) => {
  try {
    const { category, limit, month, currency } = req.body;

    const budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
      month,
      currency
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({ createdAt: -1 });

    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {
        const start = new Date(`${budget.month}-01`);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1);

        const transactions = await Transaction.find({
          user: req.user._id,
          type: "expense",
          category: budget.category,
          date: { $gte: start, $lt: end }
        });

        const spent = transactions.reduce((sum, t) => sum + t.amount, 0);

        return {
          ...budget.toObject(),
          spent,
          remaining: budget.limit - spent,
          percentage: Math.round((spent / budget.limit) * 100),
          alert: spent >= budget.limit ? "Exceeded" : spent >= budget.limit * 0.8 ? "Warning" : "Safe"
        };
      })
    );

    res.json(budgetsWithSpent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBudget, getBudgets, deleteBudget };