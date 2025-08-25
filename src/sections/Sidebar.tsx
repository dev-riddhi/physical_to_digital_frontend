import IconButton from "../components/IconButton";
import SidebarItem from "../components/SidebarItem";

interface ConversionHistoryItem {
  id: number;
  fileName: string;
  type: "image" | "pdf";
  date: string;
  preview: string;
}

interface SidebarProps {
  isOpen: boolean;
  isDarkMode: boolean;
  toggleSidebar: () => void;
  currentUser: string;
  conversionHistory: ConversionHistoryItem[];
  onClearHistory: () => void;
  onLogout: () => void;
}



const UserIcon = ({ size = 24, className = "" }) => (
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
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOutIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronLeftIcon = ({ size = 24, className = "" }) => (
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
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);



export default function Sidebar({
  isOpen,
  toggleSidebar,
  isDarkMode,
  currentUser,
  conversionHistory,
}: SidebarProps) {
  const TopSection = () => {
    return (
      <div
        className={`flex items-center justify-between p-4 h-[12%]  ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } border-b`}
      >
        <h2 className="text-[1.5em] font-semibold ">Dashboard</h2>
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-lg ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          } transition-colors`}
        >
          <ChevronLeftIcon size={20} />
        </button>
      </div>
    );
  };

  

  const HistorySection = () => {
    return (
      <>
        <div className="h-[78%] p-4">
            <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Conversion History</h3>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {conversionHistory.length === 0 ? (
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No conversions yet
            </p>
          ) : (
            conversionHistory.map((item) => (
              <SidebarItem id={item.id} isDarkMode={isDarkMode} />
            ))
          )}
        </div>
        </div>
      </>
    );
  };


  const AccountSection = () => {
    return (
      <>
      <div className="h-[10%] w-[100%] flex items-center justify-start gap-8 pl-4">
        <div className="flex items-center justify-between h-[80%] gap-3 ">
        <div
          className={`p-2 rounded-full ${
            isDarkMode ? "bg-blue-600" : "bg-blue-500"
          }`}
        >
          <UserIcon size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{currentUser}</p>
          <p
            className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            User's account
          </p>
        </div>
      </div>
        <IconButton icon={<LogOutIcon size={30}/>} isDarkMode={isDarkMode} onClick={()=>{}}/>

      </div>
      </>
    );
  };


  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 absolute w-80 ${
          isOpen ? "translate-<number>" : "translate-x-[-100%]"
        } transition-all duration-300 overflow-hidden ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r shadow-lg`}
      >
        <TopSection />
        <HistorySection />
        <AccountSection />
      </div>
    </>
  );
}
