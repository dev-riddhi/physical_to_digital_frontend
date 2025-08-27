import { useState } from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  isDarkMode: boolean;
  onClick: () => void;
}
export default function IconButton({
  icon,
  onClick,
  isDarkMode,
}: IconButtonProps) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const activeColor = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200";
  const heandleClick = () => {

    setButtonPressed(true);
    setTimeout(() => {
      setButtonPressed(false);
      onClick();
    }, 200);
  };

  return (
    <button
      onClick={heandleClick}
      className={`p-2 rounded  ${
        buttonPressed ? activeColor : ""
      }  ease-in-out`}
    >
      {icon}
    </button>
  );
}
