import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contex/ThemeContex";

const Darkmode = () => {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="dark:text-white cursor-pointer"
    >
      {dark ? (
        <Sun className="w-8 h-8 border bg-gray-600 dark:bg-white dark:text-black p-1 rounded-full" /> 
      ) : (
        <Moon className="w-8 h-8 border  border-black/40 p-1 rounded-full" />
      )}
    </button>
  );
};

export default Darkmode;
