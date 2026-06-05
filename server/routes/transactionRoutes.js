const express = require("express");
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createTransaction).get(protect, getTransactions);
router.route("/:id").put(protect, updateTransaction).delete(protect, deleteTransaction);

module.exports = router;