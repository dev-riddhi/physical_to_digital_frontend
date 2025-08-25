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
  fileInputRef ? : React.RefObject<HTMLInputElement>;
}

const UploadIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const DownloadIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const MoonIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);



const CheckIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MenuIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Main({
  sidebarOpen,
  toggleSidebar,
  isDarkMode,
  toggleTheme,
  uploadedFile,
  convertedText,
  isProcessing,
  handleFileUpload,
  simulateConversion,
  downloadText,
  downloadPDF,
  fileInputRef
}  : MainContentProps) {


    const HeaderSection = () => {
        return <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 h-10">
            {!sidebarOpen && (<button onClick={toggleSidebar} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
              <MenuIcon size={20} />
            </button>)}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NotesConverter</h1>
          </div>
          <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </header>
    };

    

    const MainSection = () => {
        return <main className="flex-1 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-6 sm:p-8 mb-8`}>
            <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">Convert Handwritten Notes</h2>
            <div  className={`border-2 border-dashed ${isDarkMode ? 'border-gray-600 hover:border-gray-500 bg-gray-700' : 'border-gray-300 hover:border-gray-400 bg-gray-50'} rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-colors`}>
              <UploadIcon size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <p className="text-lg font-medium mb-2">Drop your files here or click to browse</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Supports JPG, PNG, PDF files up to 10MB</p>
              {uploadedFile && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <CheckIcon size={16} className="text-green-500" />
                  <span className="text-sm font-medium">{uploadedFile.name}</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
            {uploadedFile && (
              <div className="mt-6 flex justify-center">
                <button onClick={simulateConversion} disabled={isProcessing} className={`px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto ${isProcessing ? (isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500') + ' cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'}`}>
                  {isProcessing ? 'Converting...' : 'Convert to Text'}
                </button>
              </div>
            )}
          </div>
          {(convertedText || isProcessing) && (
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-sm p-6 sm:p-8`}>
              <h2 className="text-xl font-semibold mb-6">Converted Text</h2>
              {isProcessing ? (
                <div className="flex items-center justify-center py-12">
                  <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
                </div>
              ) : (
                <>
                  <div className={`${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border p-6 mb-6 max-h-96 overflow-y-auto`}>
                    <pre className="whitespace-pre-wrap text-sm font-mono">{convertedText}</pre>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={downloadText} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                      <DownloadIcon size={16} />
                      Download as Text
                    </button>
                    <button onClick={downloadPDF} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                      <DownloadIcon size={16} />
                      Download as PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>;
    }
  return (
    <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'ml-0'}`} onClick={ sidebarOpen && window.innerWidth < 600 ? toggleSidebar : undefined }>
      <HeaderSection/>
      <MainSection/>
    </div>
  );
};