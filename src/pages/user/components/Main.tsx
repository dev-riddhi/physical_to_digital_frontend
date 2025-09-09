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
  const HeaderSection = () => (
    <header
      className={`${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
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

  // ==============================================================

  interface UploadedFile {
    file: File;
    id: string;
    title: string;
  }

  const MainSection: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [selectedModel, setSelectedModel] = useState("");
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

    type SendIconProps = {
      size?: number | string;
      strokeWidth?: number;
      variant?: "outline" | "solid";
      className?: string;
      title?: string;
    };

    const SendIcon: React.FC<SendIconProps> = ({
      size = 24,
      strokeWidth = 2,
      variant = "outline",
      className,
      title = "Send",
    }) => {
      if (variant === "solid") {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="currentColor"
            aria-label={title}
            role="img"
            className={className}
          >
            <path d="M22 2L2 9l9 4 4 9 7-20Zm-7.5 6.5-3.5 4.5-2.5-1 6-3.5Z" />
          </svg>
        );
      }
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label={title}
          role="img"
          className={className}
        >
          <path d="M22 2L15 22L11 13L2 9Z" />
          <path d="M22 2L11 13" />
        </svg>
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

    const openFile = (file: File) => {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const handleModelSelect = (modelId: string) => {
      setSelectedModel(modelId);
      setIsDropdownOpen(false);
    };

    const handleSend = () => {
      console.log("Sending files:", uploadedFiles);
      console.log("Selected model:", selectedModel);
      setUploadedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } flex flex-col items-center justify-end p-6 w-full h-full`}
      >
        <div
          className={`shadow-lg p-6 w-[80%] border ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
          style={{ borderRadius: "50px" }}
        >
          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 space-y-2 max-h-[300px] overflow-y-auto">
              {uploadedFiles.map((uploadedFile) => (
                <div
                  key={uploadedFile.id}
                  className={`flex items-center gap-3 p-3 border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  style={{ borderRadius: "30px" }}
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-12 h-12 border flex-shrink-0 overflow-hidden ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-700 border-gray-700"
                    }`}
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

                  {/* File Name */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={uploadedFile.title}
                      onChange={(e) =>
                        updateFileTitle(uploadedFile.id, e.target.value)
                      }
                      className={`w-full text-sm font-medium bg-transparent border-none focus:outline-none px-2 py-1 ${
                        isDarkMode
                          ? "text-white focus:bg-gray-700"
                          : "focus:bg-white"
                      }`}
                      style={{ borderRadius: "15px" }}
                    />
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-700" : "text-gray-700"
                      }`}
                    >
                      {uploadedFile.file.name}
                    </p>
                  </div>

                  {/* Buttons */}

                  <button
                    onClick={() => openFile(uploadedFile.file)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 border border-green-200 hover:bg-green-50 transition-colors"
                    style={{ borderRadius: "20px" }}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 hover:bg-red-50 transition-colors"
                    style={{ borderRadius: "20px" }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Section */}
          <div className="flex items-center gap-3">
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
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              Add Files 📁
            </label>
            <div className="flex-1">
              <input
                type="text"
                value="Give a title"
                className="text-gray-500 border-none flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full "
                contentEditable={true}
              />
            </div>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-1 py-1 text-sm font-medium border rounded-full ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-500 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedModel
                  ? models.find((m) => m.id === selectedModel)?.name
                  : "Models"}
                <span
                  className={`transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 shadow-md rounded-xl p-2 ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model.id)}
                      className="block px-4 py-2 w-full text-left hover:bg-blue-100 rounded-md"
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={uploadedFiles.length === 0}
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border rounded-full ${
                isDarkMode
                  ? "bg-gray-700 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <SendIcon size={17} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================================

  return (
    <div
      className="flex-1 flex flex-col transition-all duration-300"
      onClick={
        sidebarOpen && window.innerWidth < 600 ? toggleSidebar : undefined
      }
    >
      <HeaderSection />
      <MainSection />
    </div>
  );
}
