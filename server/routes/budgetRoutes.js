const express = require("express");
const { createBudget, getBudgets, deleteBudget } = require("../controllers/budgetController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createBudget).get(protect, getBudgets);
router.route("/:id").delete(protect, deleteBudget);

module.exports = router;