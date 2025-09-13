import { MoonIcon, SunIcon } from "../../../assets/icons/Icons";
import React, { useState, useRef } from "react";

interface MainContentProps {
  handleConvertRequest: (
    files: UploadedFile[],
    model: "tesseract" | "paddle",
    title: string,
    onComplete: (response: unknown) => void,
    onError: (error: string) => void
  ) => void;
  handleDownload: () => void;
  handleTheme: () => void;
  isDarkMode: boolean;
  limit: number;
}

interface HeaderSectionProps {
  isDarkMode: boolean;
  handleTheme: () => void;
  limit: number;
}

interface MainSectionProp {
  isDarkMode: boolean;
  handleDownload: () => void;
  handleConvertRequest: (
    files: UploadedFile[],
    model: "tesseract" | "paddle",
    title: string,
    onComplete: (response: unknown) => void,
    onError: (error: string) => void
  ) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  title: string;
}

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

// New Download Icon
const DownloadIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

function HeaderSection({ isDarkMode, handleTheme, limit }: HeaderSectionProps) {
  return (
    <header
      className={`border-none ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } pl-4 pr-4 sm:h-[5%] border-none  lg:h-[12%] w-[100%] flex items-center justify-between`}
    >
      <div className="flex items-center justify-between border-none w-[100%]">
        <div className="flex items-center justify-between">
          <h1 className="lg:text-2xl border-none sm:text-10 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NotesConverter
          </h1>
        </div>

        <div className="flex w-[10%] gap-5">
          <div className="flex items-center justify-between">🪙 {limit}</div>
          <button
            onClick={handleTheme}
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
      </div>
    </header>
  );
}

function MainSection({
  isDarkMode,
  handleConvertRequest,
  handleDownload,
}: MainSectionProp) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedModel, setSelectedModel] = useState<"tesseract" | "paddle">();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [requestTitle, setRequestTitle] = useState("");

  const [isSending, setIsSending] = React.useState(false);
  const [showDownloadButton, setShowDownloadButton] = React.useState(false);

  interface ocrModels {
    model: "tesseract" | "paddle";
    name: "PaddleOCR" | "TesseractOCT";
  }

  const models: ocrModels[] = [
    { model: "tesseract", name: "TesseractOCT" },
    { model: "paddle", name: "PaddleOCR" },
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

  const handleReuestTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestTitle(event.target.value);
  };

  const handleOpenFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const handleModelSelect = (index: number) => {
    setSelectedModel(models[index].model);
    console.log(models[index].model);
    setIsDropdownOpen(false);
  };

  const handleSend = () => {
    handleConvertRequest(
      uploadedFiles,
      selectedModel!,
      requestTitle,
      () => {
        setIsSending(false);
        setShowDownloadButton(true);
      },
      () => {
        setIsSending(false);
        setShowDownloadButton(false);
      }
    );
    setUploadedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsSending(true);
  };
  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } flex flex-col items-center justify-center sm:h-[95%] lg:h-[88%] px-4 py-8 h-full  md:p-8 lg:p-16`}
    >
      {/* Added a toggle for demonstration purposes */}

      <div
        className={`shadow-lg p-4 sm:p-6 w-full max-w-lg md:max-w-3xl lg:max-w-4xl border ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
        style={{ borderRadius: "50px" }}
      >
        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div
            className="max-h-[300px] rounded overflow-y-auto mb-4"
            style={
              isDarkMode
                ? { scrollbarColor: "#7a7a7aff #101828" }
                : { scrollbarColor: "#c4c4c4ff #FFFFFF" }
            }
          >
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className={`flex flex-col sm:flex-row items-center gap-3 p-3 border rounded-3xl mb-2 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={`w-16 h-16 sm:w-12 sm:h-12 flex-shrink-0 border overflow-hidden rounded-2xl ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-700 border-gray-700"
                  }`}
                >
                  {uploadedFile.file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(uploadedFile.file)}
                      alt={uploadedFile.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}
                </div>

                {/* File Name and Buttons Wrapper */}
                <div className="flex flex-col sm:flex-row flex-1 items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  {/* File Name */}
                  <div className="flex-1 w-full text-center sm:text-left">
                    <input
                      type="text"
                      value={uploadedFile.title}
                      onChange={(e) =>
                        updateFileTitle(uploadedFile.id, e.target.value)
                      }
                      className={`w-full text-sm font-medium bg-transparent border-none focus:outline-none px-2 py-1 rounded-xl ${
                        isDarkMode
                          ? "text-white focus:bg-gray-700"
                          : "text-black focus:bg-gray-50"
                      }`}
                    />
                    <p
                      className={`text-xs px-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      {uploadedFile.file.name}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                    <button
                      onClick={() => handleOpenFile(uploadedFile.file)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 border border-green-200 hover:bg-green-50 transition-colors rounded-3xl"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => removeFile(uploadedFile.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 hover:bg-red-50 transition-colors rounded-3xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload and Input Section */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center p-2 sm:p-4 gap-2">
          {/* Upload Button */}
          <div className="flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border rounded-full cursor-pointer transition-colors ${
                isDarkMode
                  ? "bg-gray-700 border-gray-500 text-white hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Add Files 📁
            </label>
          </div>

          {/* Text Input */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              placeholder="Give a title"
              value={requestTitle}
              onChange={handleReuestTitle}
              className={`w-full border-none px-4 py-2 text-sm font-medium rounded-full focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 placeholder-gray-500"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500"
              }`}
              contentEditable={true}
            />
          </div>

          {/* Model Selector and Action Buttons */}
          <div className="relative flex-shrink-0 flex items-center justify-center md:justify-end gap-2 mt-2 md:mt-0">
            {/* Model Selector */}
            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-1 p-2 text-sm font-medium border rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-500 text-white hover:bg-gray-600"
                    : "bg-white border-gray-300 text-black hover:bg-gray-100"
                }`}
              >
                {selectedModel
                  ? models.find((m) => m.model === selectedModel)?.name
                  : "Models"}
                <span
                  className={`transition-transform duration-200 text-xs ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isDropdownOpen && (
                <div
                  className={`absolute bottom-full right-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 mb-2 w-max shadow-lg rounded-xl p-2 z-10 ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {models.map((model, index) => (
                    <button
                      key={index}
                      onClick={() => handleModelSelect(index)}
                      className={`block px-4 py-2 w-full text-left rounded-md transition-colors ${
                        isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {showDownloadButton && (
                <button
                  onClick={handleDownload}
                  className={`flex items-center justify-center p-2 text-sm font-medium border rounded-full transition-colors ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-500 text-white hover:bg-gray-600"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  title="Download Result"
                >
                  <DownloadIcon size={17} />
                </button>
              )}
            </div>

            {/* --- MODIFIED --- Send Button */}
            <button
              onClick={handleSend}
              disabled={uploadedFiles.length === 0 || isSending}
              className={`flex items-center justify-center pl-4 pr-4 pt-3 pb-3 text-sm font-medium border rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDarkMode
                  ? "bg-gray-700 border-gray-500 text-white hover:bg-gray-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {isSending ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <SendIcon size={17} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Main({
  isDarkMode,
  limit,
  handleTheme,
  handleConvertRequest,
  handleDownload,
}: MainContentProps) {
  // ==============================================================

  // =============================================================

  return (
    <div
      className={`flex flex-col size-full text-xl font-bold${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }  transition-all duration-300`}
    >
      <HeaderSection
        limit={limit}
        isDarkMode={isDarkMode}
        handleTheme={handleTheme}
      />
      <MainSection
        handleDownload={handleDownload}
        isDarkMode={isDarkMode}
        handleConvertRequest={handleConvertRequest}
      />
    </div>
  );
}
