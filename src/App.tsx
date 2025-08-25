import React, { useState } from 'react';
import Sidebar from './sections/Sidebar';
import MainContent from './sections/Main';

interface ConversionHistoryItem {
  id: number;
  fileName: string;
  type: 'image' | 'pdf';
  date: string;
  preview: string;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth < 600 ? false : true);
  const [currentUser, setCurrentUser] = useState<string>('john.doe@email.com');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [convertedText, setConvertedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistoryItem[]>([]);

  // const fileInputRef = useRef<React.RefObject<HTMLInputElement> | null>(null);

  const toggleTheme = (): void => {
    if(!isDarkMode) {
      localStorage.setItem('theme', 'dark');
    }
    else {
      localStorage.setItem('theme', 'light');
    }
    setIsDarkMode(!isDarkMode)
  };
  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setUploadedFile(file);
      setConvertedText('');
    }
  };

  if(localStorage.getItem('theme')==null) {
    localStorage.setItem('theme', 'light');
  };

  const theme = localStorage.getItem('theme')=='dark' ? 'dark' : 'light';

  const simulateConversion = (): void => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setTimeout(() => {
      const mockText = uploadedFile.type.startsWith('image/')
        ? `Converted text from ${uploadedFile.name}:\n\nThis is a sample conversion of your handwritten image...`
        : `Converted text from ${uploadedFile.name}:\n\nThis is a sample conversion of your handwritten PDF...`;
      setConvertedText(mockText);
      const newHistoryItem: ConversionHistoryItem = {
        id: Date.now(),
        fileName: uploadedFile.name,
        type: uploadedFile.type.startsWith('image/') ? 'image' : 'pdf',
        date: new Date().toISOString().split('T')[0],
        preview: mockText.substring(0, 50) + '...'
      };
      setConversionHistory([newHistoryItem, ...conversionHistory]);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadText = (): void => {
    const blob = new Blob([convertedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${uploadedFile?.name?.split('.')[0] || 'text'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (): void => {
    const lines = convertedText.split('\n');
    let pdfLines = '';
    lines.forEach((line) => {
        const escapedLine = line.replace(/[()\\\n\r]/g, '\\$&');
        pdfLines += `(${escapedLine}) Tj 0 -14 Td\n`;
    });
    const pdfContent = `
1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792] >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length ${pdfLines.length + 50} >>\nstream\nBT\n/F1 12 Tf\n50 750 Td\n${pdfLines}ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \n0000000273 00000 n \n0000000333 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${435 + pdfLines.length}\n%%EOF`.trim();
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_${uploadedFile?.name?.split('.')[0] || 'document'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearHistory = (): void => setConversionHistory([]);

  const logout = (): void => {
    setCurrentUser('');
    setConversionHistory([]);
    setUploadedFile(null);
    setConvertedText('');
  };


  const sidebarHistory : ConversionHistoryItem[] = [
    {
      id: 1,
      fileName: 'handwritten_note.jpg',
      type: 'image',
      date: '2023-10-01',
      preview: 'This is a sample conversion of your handwritten image...'
    },
    {
      id: 2,
      fileName: 'meeting_notes.pdf',
      type: 'image',
      date: '2023-09-28',
      preview: 'This is a sample conversion of your handwritten PDF...'
    }
  ];

  

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar
        isOpen={ sidebarOpen}
        isDarkMode={isDarkMode}
        toggleSidebar={toggleSidebar}
        currentUser={currentUser}
        conversionHistory={sidebarHistory}
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
};

export default App;
