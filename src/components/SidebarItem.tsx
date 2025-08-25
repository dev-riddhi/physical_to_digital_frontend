interface SidebarItemProps {
  id: number;
  isDarkMode: boolean;
}

const FileTextIcon = ({ size = 24, className = "" }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ImageIcon = ({ size = 24, className = "" }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function SidebarItem({ id, isDarkMode }: SidebarItemProps) {
  const isImage = true;

  return (
    <div
      key={id}
      className={`p-3 rounded-lg ${
        isDarkMode
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-50 hover:bg-gray-100"
      } transition-colors cursor-pointer`}
    >
      <div className="flex items-center gap-2 mb-1">
        {isImage ? (
          <ImageIcon
            size={16}
            className={isDarkMode ? "text-green-400" : "text-green-600"}
          />
        ) : (
          <FileTextIcon
            size={16}
            className={isDarkMode ? "text-blue-400" : "text-blue-600"}
          />
        )}
        <p className="text-sm font-medium truncate">{"Test"}</p>
      </div>
      <p
        className={`text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        } mb-1`}
      >
        {"Date"}
      </p>
      <p
        className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
      >
        {"item.preview"}
      </p>
    </div>
  );
}
