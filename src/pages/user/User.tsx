import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/Main";

interface ConversionHistoryItem {
  id: number;
  fileName: string;
  type: "image" | "pdf";
  date: string;
  preview: string;
}

export default function User() {
  // ==============================
  // THEME STATE
  // ==============================
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // ==============================
  // SIDEBAR STATE
  // ==============================
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    window.innerWidth < 600 ? false : true
  );

  // ==============================
  // USER STATE
  // ==============================
  const [currentUser, setCurrentUser] = useState<string>("");

  // ==============================
  // FILE + CONVERSION STATE
  // ==============================
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [convertedText, setConvertedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [conversionHistory, setConversionHistory] = useState<
    ConversionHistoryItem[]
  >([]);

  // ==============================
  // LOGIN FORM STATE
  // ==============================
  const [loginEmail, setLoginEmail] = useState<string>("");

  // ==============================
  // EFFECT: Load Theme + User Email
  // ==============================
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setCurrentUser(savedEmail);
    }
  }, []);

  // ==============================
  // HANDLERS
  // ==============================
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type.startsWith("image/") || file.type === "application/pdf")
    ) {
      setUploadedFile(file);
      setConvertedText("");
    }
  };

  const simulateConversion = () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      const mockText = uploadedFile.type.startsWith("image/")
        ? `Converted text from ${uploadedFile.name}:\n\nThis is a sample conversion of your handwritten image...`
        : `Converted text from ${uploadedFile.name}:\n\nThis is a sample conversion of your handwritten PDF...`;
      setConvertedText(mockText);
      const newHistoryItem: ConversionHistoryItem = {
        id: Date.now(),
        fileName: uploadedFile.name,
        type: uploadedFile.type.startsWith("image/") ? "image" : "pdf",
        date: new Date().toISOString().split("T")[0],
        preview: mockText.substring(0, 50) + "...",
      };
      setConversionHistory([newHistoryItem, ...conversionHistory]);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadText = () => {
    const blob = new Blob([convertedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted_${uploadedFile?.name?.split(".")[0] || "text"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const lines = convertedText.split("\n");
    let pdfLines = "";
    lines.forEach((line) => {
      const escapedLine = line.replace(/[()\\\n\r]/g, "\\$&");
      pdfLines += `(${escapedLine}) Tj 0 -14 Td\n`;
    });
    const pdfContent = `
1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792] >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length ${
      pdfLines.length + 50
    } >>\nstream\nBT\n/F1 12 Tf\n50 750 Td\n${pdfLines}ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \n0000000273 00000 n \n0000000333 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${
      435 + pdfLines.length
    }\n%%EOF`.trim();
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted_${
      uploadedFile?.name?.split(".")[0] || "document"
    }.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => setConversionHistory([]);

  const logout = () => {
    localStorage.removeItem("userEmail");
    setCurrentUser("");
    setConversionHistory([]);
    setUploadedFile(null);
    setConvertedText("");
  };

  const handleLogin = () => {
    if (!loginEmail.trim()) return alert("Please enter a valid email!");
    localStorage.setItem("userEmail", loginEmail);
    setCurrentUser(loginEmail);
    setLoginEmail("");
  };

  // ==============================
  // UI
  // ==============================
  if (currentUser) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Login to Continue
          </h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN VIEW (AFTER LOGIN)
  // ==============================
  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        isDarkMode={isDarkMode}
        toggleSidebar={toggleSidebar}
        currentUser={currentUser}
        conversionHistory={conversionHistory}
        onClearHistory={clearHistory}
        onLogout={logout}
      />

      <MainContent
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        uploadedFile={uploadedFile}
        convertedText={convertedText}
        isProcessing={isProcessing}
        handleFileUpload={handleFileUpload}
        simulateConversion={simulateConversion}
        downloadText={downloadText}
        downloadPDF={downloadPDF}
      />
    </div>
  );
}
