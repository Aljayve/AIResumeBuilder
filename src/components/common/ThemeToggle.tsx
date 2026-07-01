import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore"


export default function ThemeToggle() {
    const { theme, toggleTheme } =
        useThemeStore();
    return (
        <button
            onClick={toggleTheme}
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            transition
            hover:bg-slate-100
            dark:border-slate-700
            dark:bg-slate-900
            "
        >
            {theme === "dark" ? (
                <Sun size={18} />
            ) : (
                <Moon size={18} />
            )}
        </button>
    )
}
