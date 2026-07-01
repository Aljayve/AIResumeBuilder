import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeStore, type Theme } from "../../store/themeStore";

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

export default function AppearanceSettingsCard() {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                </span>
                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Appearance</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Customize your theme</p>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
                {themes.map((t) => {
                    const Icon = t.icon;
                    const active = theme === t.value;
                    return (
                        <button
                            key={t.value}
                            onClick={() => setTheme(t.value)}
                            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-colors ${
                                active
                                    ? "border-brand-500 bg-brand-50 text-brand-600 dark:border-brand-400 dark:bg-brand-500/10 dark:text-brand-400"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                            }`}
                        >
                            <Icon size={22} />
                            <span className="text-xs font-medium">{t.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
