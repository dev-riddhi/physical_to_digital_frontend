import IconButton from "./IconButton";
import {DeleteIcon} from "../assets/icons/Icons";

interface SidebarItemProps {
  title: string;
  isDarkMode: boolean;
  onClick: () => void;
}

export default function SidebarItem({
  title,
  isDarkMode,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg ${
        isDarkMode
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-50 hover:bg-gray-100"
      } transition-colors cursor-pointer`}
    >
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-medium truncate">{title}</p>
        <IconButton
          icon={<DeleteIcon size={20} />}
          onClick={() => {}}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
}
