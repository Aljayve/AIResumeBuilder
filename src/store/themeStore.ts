import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

function getInitialTheme(): Theme {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark" || stored === "light" || stored === "system") return stored;
    return "light";
}

function applyTheme(theme: Theme) {
    const isDark =
        theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

interface ThemeStore {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: initialTheme,

    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
        set({ theme });
    },

    toggleTheme: () =>
        set((state) => {
            const newTheme: Theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
            return { theme: newTheme };
        }),
}));

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", () => {
    const state = useThemeStore.getState();
    if (state.theme === "system") {
        applyTheme("system");
    }
});
