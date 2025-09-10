import {
  Document,
  Page,
  Text,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";

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

interface DocumentProp {
  pdfContents: string[];
}

// Define PDF document using React components
const MyDocument = ({ pdfContents }: DocumentProp) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Notes</Text>
      <Text style={styles.section}>
        {pdfContents.length > 0 ? pdfContents.map((text) => text) : ""}
      </Text>
    </Page>
  </Document>
);

interface PdfViewProp {
  handleDownload: () => void;
  pdfContents: string[];
}

export default function PdfViewe({ handleDownload, pdfContents }: PdfViewProp) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div
      className="flex flex-col size-full justify-center items-center"
      style={{ backgroundColor: "#282828" }}
    >
      <div className="w-full pl-16 pd-4 gap-2">
        <button
          onClick={handleDownload}
          className=" hover:bg-gray-700 m-2 p-1 rounded press:bg-red-900"
        >
          👈
        </button>
      </div>
      <PDFViewer
        style={{
          border: "1px solid #ccc",
          backgroundColor: "#282c34",
          borderRadius: "8px",
        }}
        width={width - 100}
        height={height - 100}
      >
        <MyDocument pdfContents={pdfContents} />
      </PDFViewer>
    </div>
  );
}
