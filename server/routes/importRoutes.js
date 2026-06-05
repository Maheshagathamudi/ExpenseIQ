const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const protect = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");
const autoCategory = require("../utils/categoryHelper");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/csv", protect, upload.single("file"), async (req, res) => {
  try {
    const rows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", async () => {
        for (const row of rows) {
          const title = row.title || row.description || row.Description || "Imported Transaction";
          const amount = Number(row.amount || row.Amount || 0);
          const type = row.type || row.Type || "expense";

          await Transaction.create({
            user: req.user._id,
            title,
            amount: Math.abs(amount),
            type,
            category: autoCategory(title),
            source: "csv",
            currency: row.currency || "INR",
            date: row.date || new Date()
          });
        }

        fs.unlinkSync(req.file.path);
        res.json({ message: "CSV imported successfully", imported: rows.length });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/ocr", protect, upload.single("image"), async (req, res) => {
  res.json({
    message: "OCR stub processed successfully",
    extractedText: [
      "Cafe Latte - ₹180",
      "GST - ₹9",
      "Total - ₹189"
    ],
    suggestion: {
      title: "Cafe Receipt",
      amount: 189,
      category: "Food",
      type: "expense"
    }
  });
});

module.exports = router;