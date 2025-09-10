import { useState, useEffect } from "react";
import Main from "./components/Main";
import PdfViewe from "../common/PdfView";

interface UploadedFile {
  file: File;
  id: string;
  title: string;
}

type models = "tesseract" | "paddle";

const apiUrl: string = import.meta.env.VITE_API_URL;

export default function Guest() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [showDownloadView, setShowDownloadView] = useState<boolean>(false);

  const [pdfContents, setPdfContents] = useState<string[]>();

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDownload = () => {
    setShowDownloadView(!showDownloadView);
  };

  const handleConvertRequest = (
    files: UploadedFile[],
    model: models,
    title: string,
    onComplete: (response: unknown) => void,
    onError: (error: string) => void
  ) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file.file);
    });

    formData.append("model", model);
    formData.append("title", title);

    fetch(apiUrl + "/guest/convert", {
      method: "post",
      headers: {
        "Access-Token": localStorage.getItem("access_token") ?? "",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data.text) {
          setPdfContents(json.data.text);
          onComplete(json);
        }
      })
      .catch(() => {
        onError("Unable to upload");
      });
  };

  return (
    <div
      className={`h-[100vh] w-[100vw] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {!showDownloadView ? (
        <Main
          isDarkMode={isDarkMode}
          handleTheme={handleTheme}
          handleConvertRequest={handleConvertRequest}
          handleDownload={handleDownload}
        />
      ) : (
        <PdfViewe
          handleDownload={handleDownload}
          pdfContents={pdfContents ?? []}
        />
      )}
    </div>
  );
}
