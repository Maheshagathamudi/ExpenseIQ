import { useState, useRef, useCallback } from "react";
import API from "../services/api";
import {
  FileUp,
  ImageUp,
  Upload,
  X,
  FileText,
  Image,
  CheckCircle2,
  AlertCircle,
  Copy,
  Trash2,
  Sparkles,
  ArrowRight,
  Loader2,
  FileSpreadsheet,
  Receipt,
  Tag,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

export default function ImportData() {
  const [csvFile, setCsvFile] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [csvDragging, setCsvDragging] = useState(false);
  const [receiptDragging, setReceiptDragging] = useState(false);
  const [csvUploading, setCsvUploading] = useState(false);
  const [receiptUploading, setReceiptUploading] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);
  const [receiptProgress, setReceiptProgress] = useState(0);
  const [csvMessage, setCsvMessage] = useState("");
  const [receiptMessage, setReceiptMessage] = useState("");
  const [ocrResult, setOcrResult] = useState(null);
  const [copiedText, setCopiedText] = useState("");

  const csvInputRef = useRef(null);
  const receiptInputRef = useRef(null);

  // Format file size
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // CSV Drag & Drop handlers
  const handleCsvDragOver = useCallback((e) => {
    e.preventDefault();
    setCsvDragging(true);
  }, []);

  const handleCsvDragLeave = useCallback((e) => {
    e.preventDefault();
    setCsvDragging(false);
  }, []);

  const handleCsvDrop = useCallback((e) => {
    e.preventDefault();
    setCsvDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith(".csv")) {
      setCsvFile(files[0]);
      setCsvMessage("");
    } else {
      setCsvMessage("Please drop a CSV file");
    }
  }, []);

  // Receipt Drag & Drop handlers
  const handleReceiptDragOver = useCallback((e) => {
    e.preventDefault();
    setReceiptDragging(true);
  }, []);

  const handleReceiptDragLeave = useCallback((e) => {
    e.preventDefault();
    setReceiptDragging(false);
  }, []);

  const handleReceiptDrop = useCallback((e) => {
    e.preventDefault();
    setReceiptDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      setReceipt(files[0]);
      setOcrResult(null);
      setReceiptMessage("");
    } else {
      setReceiptMessage("Please drop an image file");
    }
  }, []);

  // Simulate progress
  const simulateProgress = (setProgress, duration = 1500) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return interval;
  };

  const uploadCSV = async () => {
    if (!csvFile) return setCsvMessage("Select a CSV file first");

    setCsvUploading(true);
    const progressInterval = simulateProgress(setCsvProgress);

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const { data } = await API.post("/import/csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(progressInterval);
      setCsvProgress(100);
      setCsvMessage(data.message || "CSV uploaded successfully!");
      setCsvFile(null);
      setTimeout(() => setCsvProgress(0), 2000);
    } catch (err) {
      clearInterval(progressInterval);
      setCsvMessage(err.response?.data?.message || "Upload failed");
      setCsvProgress(0);
    } finally {
      setCsvUploading(false);
    }
  };

  const uploadReceipt = async () => {
    if (!receipt) return setReceiptMessage("Select a receipt image first");

    setReceiptUploading(true);
    const progressInterval = simulateProgress(setReceiptProgress);

    try {
      const formData = new FormData();
      formData.append("image", receipt);

      const { data } = await API.post("/import/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(progressInterval);
      setReceiptProgress(100);
      setOcrResult(data);
      setReceiptMessage("Receipt processed successfully!");
      setTimeout(() => setReceiptProgress(0), 2000);
    } catch (err) {
      clearInterval(progressInterval);
      setReceiptMessage(err.response?.data?.message || "Processing failed");
      setReceiptProgress(0);
    } finally {
      setReceiptUploading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const removeCsvFile = () => {
    setCsvFile(null);
    setCsvMessage("");
    setCsvProgress(0);
    if (csvInputRef.current) csvInputRef.current.value = "";
  };

  const removeReceipt = () => {
    setReceipt(null);
    setOcrResult(null);
    setReceiptMessage("");
    setReceiptProgress(0);
    if (receiptInputRef.current) receiptInputRef.current.value = "";
  };

  // Get preview URL for receipt
  const receiptPreview = receipt ? URL.createObjectURL(receipt) : null;

  return (
    <div className="page">
      <div className="page-title">
        <div>
          <h2>Import Data</h2>
          <p>Upload CSV transactions or scan receipts with OCR.</p>
        </div>
      </div>

      <div className="import-grid">
        {/* CSV Upload Card */}
        <div className="import-card glass">
          <div className="import-card-header">
            <div className="import-icon csv">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h3>CSV Import</h3>
              <p className="import-subtitle">Upload bank-style CSV with transactions</p>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`drop-zone ${csvDragging ? "dragging" : ""} ${csvFile ? "has-file" : ""}`}
            onDragOver={handleCsvDragOver}
            onDragLeave={handleCsvDragLeave}
            onDrop={handleCsvDrop}
            onClick={() => csvInputRef.current?.click()}
          >
            <input
              ref={csvInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setCsvFile(e.target.files[0]);
                  setCsvMessage("");
                }
              }}
              hidden
            />

            {!csvFile ? (
              <div className="drop-zone-content">
                <div className="drop-zone-icon">
                  <Upload size={40} />
                </div>
                <p className="drop-zone-title">
                  Drop CSV file here or <span>browse</span>
                </p>
                <p className="drop-zone-hint">Supports .csv files up to 10MB</p>
              </div>
            ) : (
              <div className="file-preview">
                <div className="file-preview-icon">
                  <FileText size={32} />
                </div>
                <div className="file-preview-info">
                  <p className="file-name">{csvFile.name}</p>
                  <p className="file-size">{formatSize(csvFile.size)}</p>
                </div>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); removeCsvFile(); }}>
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {csvUploading && (
            <div className="upload-progress">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${csvProgress}%` }}></div>
              </div>
              <span className="progress-text">{Math.round(csvProgress)}%</span>
            </div>
          )}

          {/* Upload Button */}
          <button
            className={`upload-btn ${!csvFile ? "disabled" : ""}`}
            onClick={uploadCSV}
            disabled={!csvFile || csvUploading}
          >
            {csvUploading ? (
              <>
                <Loader2 size={18} className="spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileUp size={18} />
                Upload CSV
              </>
            )}
          </button>

          {/* Message */}
          {csvMessage && (
            <div className={`message-box ${csvMessage.includes("success") || csvMessage.includes("Uploaded") ? "success" : "error"}`}>
              {csvMessage.includes("success") || csvMessage.includes("Uploaded") ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{csvMessage}</span>
            </div>
          )}
        </div>

        {/* Receipt OCR Card */}
        <div className="import-card glass">
          <div className="import-card-header">
            <div className="import-icon ocr">
              <Sparkles size={24} />
            </div>
            <div>
              <h3>Receipt OCR</h3>
              <p className="import-subtitle">Scan receipt and extract data</p>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`drop-zone ${receiptDragging ? "dragging" : ""} ${receipt ? "has-file" : ""}`}
            onDragOver={handleReceiptDragOver}
            onDragLeave={handleReceiptDragLeave}
            onDrop={handleReceiptDrop}
            onClick={() => receiptInputRef.current?.click()}
          >
            <input
              ref={receiptInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setReceipt(e.target.files[0]);
                  setOcrResult(null);
                  setReceiptMessage("");
                }
              }}
              hidden
            />

            {!receipt ? (
              <div className="drop-zone-content">
                <div className="drop-zone-icon">
                  <ImageUp size={40} />
                </div>
                <p className="drop-zone-title">
                  Drop receipt image here or <span>browse</span>
                </p>
                <p className="drop-zone-hint">Supports JPG, PNG up to 5MB</p>
              </div>
            ) : (
              <div className="file-preview image-preview">
                {receiptPreview && (
                  <img src={receiptPreview} alt="Receipt preview" className="receipt-thumb" />
                )}
                <div className="file-preview-info">
                  <p className="file-name">{receipt.name}</p>
                  <p className="file-size">{formatSize(receipt.size)}</p>
                </div>
                <button className="file-remove" onClick={(e) => { e.stopPropagation(); removeReceipt(); }}>
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {receiptUploading && (
            <div className="upload-progress">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${receiptProgress}%` }}></div>
              </div>
              <span className="progress-text">{Math.round(receiptProgress)}%</span>
            </div>
          )}

          {/* Process Button */}
          <button
            className={`upload-btn ocr-btn ${!receipt ? "disabled" : ""}`}
            onClick={uploadReceipt}
            disabled={!receipt || receiptUploading}
          >
            {receiptUploading ? (
              <>
                <Loader2 size={18} className="spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Process Receipt
              </>
            )}
          </button>

          {/* Message */}
          {receiptMessage && (
            <div className={`message-box ${receiptMessage.includes("success") ? "success" : "error"}`}>
              {receiptMessage.includes("success") ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              <span>{receiptMessage}</span>
            </div>
          )}

          {/* OCR Result */}
          {ocrResult && (
            <div className="ocr-result-card fade-in">
              <div className="ocr-header">
                <div className="ocr-icon">
                  <Receipt size={20} />
                </div>
                <h4>Extracted Data</h4>
              </div>

              {/* Extracted Text Lines */}
              <div className="ocr-text-section">
                <div className="ocr-section-title">
                  <FileText size={14} />
                  Raw Text
                </div>
                <div className="ocr-text-lines">
                  {ocrResult.extractedText?.map((line, index) => (
                    <div key={index} className="ocr-line">
                      <span className="line-number">{index + 1}</span>
                      <span className="line-text">{line}</span>
                    </div>
                  )) || <p className="no-text">No text extracted</p>}
                </div>
              </div>

              {/* Suggestion Card */}
              {ocrResult.suggestion && (
                <div className="suggestion-card">
                  <div className="suggestion-header">
                    <div className="suggestion-icon">
                      <Sparkles size={16} />
                    </div>
                    <span className="suggestion-label">AI Suggestion</span>
                  </div>

                  <div className="suggestion-details">
                    <div className="suggestion-item">
                      <div className="suggestion-item-icon">
                        <IndianRupee size={16} />
                      </div>
                      <div className="suggestion-item-info">
                        <span className="item-label">Amount</span>
                        <span className="item-value">₹{ocrResult.suggestion.amount}</span>
                      </div>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(ocrResult.suggestion.amount.toString(), "amount")}
                        title="Copy amount"
                      >
                        <Copy size={14} />
                        {copiedText === "amount" && <span className="copied-tooltip">Copied!</span>}
                      </button>
                    </div>

                    <div className="suggestion-item">
                      <div className="suggestion-item-icon">
                        <Tag size={16} />
                      </div>
                      <div className="suggestion-item-info">
                        <span className="item-label">Category</span>
                        <span className="item-value">{ocrResult.suggestion.category}</span>
                      </div>
                      <button
                        className="copy-btn"
                        onClick={() => copyToClipboard(ocrResult.suggestion.category, "category")}
                        title="Copy category"
                      >
                        <Copy size={14} />
                        {copiedText === "category" && <span className="copied-tooltip">Copied!</span>}
                      </button>
                    </div>
                  </div>

                  <button className="add-transaction-btn">
                    <ArrowRight size={16} />
                    Add as Transaction
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}