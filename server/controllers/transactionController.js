const Transaction = require("../models/Transaction");
const autoCategory = require("../utils/categoryHelper");

const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, paymentMethod, currency, note, date, isRecurring, recurringFrequency } = req.body;

    if (!title || !amount || !type) {
      return res.status(400).json({ message: "Title, amount and type are required" });
    }

    const finalCategory = category || autoCategory(title);

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      category: finalCategory,
      paymentMethod,
      currency,
      note,
      date,
      isRecurring,
      recurringFrequency
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { type, category, search } = req.query;

    const filter = { user: req.user._id };

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    Object.assign(transaction, req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
};