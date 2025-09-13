import { useState } from "react";
import Main from "./components/Main";
import PdfViewe, { MyDocument } from "../common/PdfView";
import { pdf } from "@react-pdf/renderer";

interface UploadedFile {
  file: File;
  id: string;
  title: string;
}

type models = "tesseract" | "paddle";

const apiUrl: string = import.meta.env.VITE_API_URL;

export default function Guest() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem("theme") == "dark" ? true : false
  );

  const [showDownloadView, setShowDownloadView] = useState<boolean>(false);

  const [pdfFileTitle, setPdfFileTitle] = useState<string>("");

  const [pdfContents, setPdfContents] = useState<string[]>();

  const [limit, setLimit] = useState<number>(0);

  const hanleGuestRegister = () => {
    fetch(apiUrl + "/guest/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          localStorage.setItem("access_token", json.data.access_token);
          localStorage.setItem("user_type", json.data.user_type);
        }
      })
      .catch(() => {
        console.error("login error");
      });
  };

  if (
    localStorage.getItem("theme") == undefined ||
    localStorage.getItem("theme") == ""
  )
    localStorage.setItem("theme", "light");

  if (
    localStorage.getItem("access_token") == undefined ||
    localStorage.getItem("access_token") == ""
  ) {
    hanleGuestRegister();
  }

  const handleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const handleDownload = () => {
    const width = window.innerWidth;
    if (width <= 640) {
      if (pdfFileTitle == "") setPdfFileTitle("note.pdf");

      pdf(<MyDocument pdfContents={pdfContents ?? []} />)
        .toBlob()
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${pdfFileTitle}.pdf`;
          link.click();
        });
    } else {
      showPreview();
    }
  };

  const showPreview = () => {
    setShowDownloadView(true);
  };

  const closePreview = () => {
    setShowDownloadView(false);
  };

  const handleConvertRequest = (
    files: UploadedFile[],
    model: models,
    title: string,
    onComplete: (response: unknown) => void,
    onError: (error: string) => void
  ) => {
    const formData = new FormData();

    setPdfFileTitle(title ?? "");

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

        if (json.data.limit == 0) {
          setLimit(json.data.limit);
        }
      })
      .catch(() => {
        onError("Unable to upload");
      });
  };

  console.log("guest");

  return (
    <div
      className={`h-[100vh] w-[100vw] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {!showDownloadView ? (
        <Main
          limit={limit}
          isDarkMode={isDarkMode}
          handleTheme={handleTheme}
          handleConvertRequest={handleConvertRequest}
          handleDownload={handleDownload}
        />
      ) : (
        <PdfViewe
          pdfFileName={pdfFileTitle}
          closePreview={closePreview}
          pdfContents={pdfContents ?? []}
        />
      )}
    </div>
  );
}
