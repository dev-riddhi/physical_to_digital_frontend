import {
  Document,
  Page,
  Text,
  PDFViewer,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

interface PdfViewProp {
  closePreview: () => void;
  pdfContents: string[];
  pdfFileName: string;
}

interface DocumentProp {
  pdfContents: string[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
});

// Define PDF document using React components
export const MyDocument = ({ pdfContents }: DocumentProp) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Notes</Text>
      <Text style={styles.section}>
        {pdfContents.length > 0 ? pdfContents.map((text) => text) : ""}
      </Text>
    </Page>
  </Document>
);

export default function PdfViewe({
  closePreview,
  pdfFileName,
  pdfContents,
}: PdfViewProp) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const handleDownload = () => {
    if (pdfFileName == "" || pdfFileName == undefined) pdfFileName = "Note.pdf";

    pdf(<MyDocument pdfContents={pdfContents ?? []} />)
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${pdfFileName}.pdf`;
        link.click();
      });
  };

  const DownloadIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  const BackIcon = ({ size = 24, color = "currentColor" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );

  return (
    <div
      className="flex flex-col size-full justify-center items-center"
      style={{ backgroundColor: "#282828" }}
    >
      <div className="w-full pl-16 pd-4 gap-2">
        <button
          onClick={closePreview}
          className=" hover:bg-gray-600 m-2 p-1 rounded focus:bg-gray-700"
        >
          <BackIcon />
        </button>
        <button
          className="hover:bg-gray-700 m-2 p-1 rounded"
          onClick={handleDownload}
        >
          <DownloadIcon />
        </button>
      </div>

      <PDFViewer
        showToolbar={false}
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#282c34",
          borderRadius: "8px",
          width: width - 100,
          height: height - 100,
        }}
      >
        <MyDocument pdfContents={pdfContents} />
      </PDFViewer>
    </div>
  );
}
