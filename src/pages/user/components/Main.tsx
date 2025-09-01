import { MenuIcon, MoonIcon, SunIcon } from "../../../assets/icons/Icons";
import React, { useState, useRef } from "react";

interface MainContentProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  uploadedFile: File | null;
  convertedText: string;
  isProcessing: boolean;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  simulateConversion: () => void;
  downloadText: () => void;
  downloadPDF: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

export default function Main({
  sidebarOpen,
  toggleSidebar,
  isDarkMode,
  toggleTheme,
}: MainContentProps) {
  const HeaderSection = () => {
    return (
      <header
        className={`${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b shadow-sm p-4`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 h-10">
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className={`p-2 rounded-lg ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                } transition-colors`}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                <MenuIcon size={20} />
              </button>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NotesConverter
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            } transition-colors`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </header>
    );
  };

  // ==============================================================

  interface UploadedFile {
    file: File;
    id: string;
    title: string;
  }

  const MainSection: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [showFilePreview, setShowFilePreview] = useState<UploadedFile | null>(
      null
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const models = [
      { id: "gpt-4", name: "GPT-4" },
      { id: "claude-3", name: "Claude 3" },
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          const newFile: UploadedFile = {
            file,
            id: Math.random().toString(36).substr(2, 9),
            title: file.name.split(".")[0],
          };
          setUploadedFiles((prev) => [...prev, newFile]);
        });
      }
    };

    const removeFile = (id: string) => {
      setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const updateFileTitle = (id: string, newTitle: string) => {
      setUploadedFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, title: newTitle } : f))
      );
    };

    const getFileIcon = (file: File) => {
      if (file.type.startsWith("image/")) {
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21,15 16,10 5,21" />
          </svg>
        );
      }
      if (file.type === "application/pdf") {
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        );
      }
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13,2 13,9 20,9" />
        </svg>
      );
    };

    const UploadIcon = () => (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    );

    const SendIcon = () => (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22,2 15,22 11,13 2,9 22,2" />
      </svg>
    );

    const XIcon = () => (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const XIconLarge = () => (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const openFile = (file: File) => {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
      // Clean up the URL after a delay to free memory
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const handleModelSelect = (modelId: string) => {
      setSelectedModel(modelId);
      setIsDropdownOpen(false);
    };

    const handleSend = () => {
      console.log("Sending files:", uploadedFiles);
      console.log("Selected model:", selectedModel);
      // Reset after sending
      setUploadedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <div className="flex flex-col items-center justify-end p-6 bg-gray-50 w-[100%]  h-[100%]">
        <div
          className="bg-white shadow-lg p-6 border  border-gray-200  w-[80%]"
          style={{ borderRadius: "50px" }}
        >
          {/* Uploaded Files Display */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 space-y-2 max-h-[300px] overflow-y-auto ">
              {uploadedFiles.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className="flex items-center gap-3 p-3  bg-gray-50 border"
                  style={{ borderRadius: "30px" }}
                >
                  {/* File Preview/Thumbnail */}
                  <div
                    className="w-12 h-12 bg-gray-100 border flex-shrink-0 overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    {uploadedFile.file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(uploadedFile.file)}
                        alt={uploadedFile.title}
                        className="w-full h-full object-cover"
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(uploadedFile.file)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={uploadedFile.title}
                      onChange={(e) =>
                        updateFileTitle(uploadedFile.id, e.target.value)
                      }
                      className="w-full text-sm font-medium bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-blue-300 px-2 py-1"
                      placeholder="Enter title..."
                      style={{ borderRadius: "15px" }}
                    />
                    <p className="text-xs text-gray-500">
                      {uploadedFile.file.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowFilePreview(uploadedFile)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 border border-blue-200 hover:bg-blue-50 transition-colors"
                    style={{ borderRadius: "20px" }}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => openFile(uploadedFile.file)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 border border-green-200 hover:bg-green-50 transition-colors"
                    style={{ borderRadius: "20px" }}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-red-500 hover:text-red-700 p-2 border border-red-200 hover:bg-red-50 transition-colors"
                    style={{ borderRadius: "20px" }}
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Section with Add Files, Model Selector and Send */}
          <div className="flex items-center gap-3">
            {/* File Upload Section */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors border border-blue-200"
              style={{ borderRadius: "25px" }}
            >
              <UploadIcon />
              Add Files
            </label>

            <div className="flex-1"></div>

            {/* Custom Model Selector with V-Shape Arms */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:bg-gray-50"
                style={{ borderRadius: "25px" }}
              >
                <span>
                  {selectedModel
                    ? models.find((m) => m.id === selectedModel)?.name
                    : "Models"}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Left V-Arm */}
              <div
                className={`absolute bottom-full left-1/2 origin-bottom transform -translate-x-1/2 transition-all duration-400 ease-out ${
                  isDropdownOpen
                    ? "opacity-100 rotate-[135deg] scale-100"
                    : "opacity-0 rotate-0 scale-0 pointer-events-none"
                }`}
              >
                {/* Stick Arm */}
                <div className="w-1 h-16 bg-gray-600 relative rounded-full">
                  {/* Option Button at the end */}
                  <div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                      isDropdownOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                    style={{
                      transitionDelay: isDropdownOpen ? "300ms" : "0ms",
                    }}
                  >
                    <div className="relative">
                      {/* Oval bubble */}
                      <div className="px-4 py-2 bg-white border-2 border-gray-300 shadow-lg transform rotate-[135deg] rounded-full">
                        <button
                          onClick={() => handleModelSelect(models[0].id)}
                          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                        >
                          {models[0].name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right V-Arm */}
              <div
                className={`absolute bottom-full left-1/2 origin-bottom transform -translate-x-1/2 translate-x-0.5 transition-all duration-400 ease-out ${
                  isDropdownOpen
                    ? "opacity-100 rotate-45 scale-100"
                    : "opacity-0 rotate-0 scale-0 pointer-events-none"
                }`}
                style={{ transitionDelay: isDropdownOpen ? "150ms" : "0ms" }}
              >
                {/* Stick Arm */}
                <div className="w-1 h-16 bg-gray-600 relative rounded-full">
                  {/* Option Button at the end */}
                  <div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                      isDropdownOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                    style={{
                      transitionDelay: isDropdownOpen ? "450ms" : "0ms",
                    }}
                  >
                    <div className="relative">
                      {/* Oval bubble */}
                      <div className="px-4 py-2 bg-white border-2 border-gray-300 shadow-lg transform -rotate-45 rounded-full">
                        <button
                          onClick={() => handleModelSelect(models[1].id)}
                          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                        >
                          {models[1].name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={uploadedFiles.length === 0}
              className="flex items-center justify-center p-3 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              style={{ borderRadius: "25px" }}
            >
              <SendIcon />
            </button>
          </div>
        </div>

        {/* File Preview Popup */}
        {showFilePreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className="bg-white p-6 max-w-lg w-full"
              style={{ borderRadius: "30px" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">File Preview</h3>
                <button
                  onClick={() => setShowFilePreview(null)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 transition-colors"
                  style={{ borderRadius: "15px" }}
                >
                  <XIconLarge />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(showFilePreview.file)}
                  <div>
                    <p className="font-medium">{showFilePreview.title}</p>
                    <p className="text-sm text-gray-500">
                      {showFilePreview.file.name}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Size:</strong>{" "}
                    {(showFilePreview.file.size / 1024).toFixed(1)} KB
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {showFilePreview.file.type || "Unknown"}
                  </p>
                  <p>
                    <strong>Last Modified:</strong>{" "}
                    {new Date(
                      showFilePreview.file.lastModified
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => openFile(showFilePreview.file)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                  style={{ borderRadius: "20px" }}
                >
                  Open File
                </button>
                <button
                  onClick={() => setShowFilePreview(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  style={{ borderRadius: "20px" }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    removeFile(showFilePreview.id);
                    setShowFilePreview(null);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
                  style={{ borderRadius: "20px" }}
                >
                  Remove File
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // =============================================================

  return (
    <div
      className={`flex-1 flex flex-col transition-all duration-300
         `}
      onClick={
        sidebarOpen && window.innerWidth < 600 ? toggleSidebar : undefined
      }
    >
      <HeaderSection />
      {/* 
      <MainSection /> */}
      <MainSection />
    </div>
  );
}
