require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/db");
const Transaction = require("./models/Transaction");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const importRoutes = require("./routes/importRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ExpenseIQ API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/import", importRoutes);

// Simple recurring transaction job
cron.schedule("0 8 * * *", async () => {
  console.log("Checking recurring transactions...");

  const recurringTransactions = await Transaction.find({
    isRecurring: true,
    recurringFrequency: "monthly"
  });

  for (const transaction of recurringTransactions) {
    const today = new Date();
    const lastDate = new Date(transaction.date);

    if (today.getDate() === lastDate.getDate()) {
      await Transaction.create({
        user: transaction.user,
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        currency: transaction.currency,
        note: "Auto-created recurring transaction",
        source: "recurring",
        date: today
      });
    }
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});