type TabItem = string | { key: string; label: string };

interface TabsProps {
    tabs: TabItem[];
    /** Active index (for string[] tabs) */
    activeTab?: number;
    /** Active key (for {key,label}[] tabs) */
    active?: string;
    onChange?: ((index: number) => void) | ((key: string) => void);
    className?: string;
}

export default function Tabs({
    tabs,
    activeTab,
    active,
    onChange,
    className = "",
}: TabsProps) {
    const isStringKeyed = tabs.length > 0 && typeof tabs[0] === "object";

    const getLabel = (tab: TabItem) =>
        typeof tab === "string" ? tab : tab.label;

    const getKey = (tab: TabItem, i: number) =>
        typeof tab === "string" ? String(i) : tab.key;

    const isActive = (tab: TabItem, i: number) => {
        if (isStringKeyed && active !== undefined) {
            return (tab as { key: string; label: string }).key === active;
        }
        return i === activeTab;
    };

    const handleClick = (tab: TabItem, i: number) => {
        if (!onChange) return;
        if (isStringKeyed) {
            const key = (tab as { key: string; label: string }).key;
            (onChange as (key: string) => void)(key);
        } else {
            (onChange as (index: number) => void)(i);
        }
    };

    return (
        <div
            className={`flex rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-white/[0.03] ${className}`}
        >
            {tabs.map((tab, i) => (
                <button
                    key={getKey(tab, i)}
                    onClick={() => handleClick(tab, i)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                        isActive(tab, i)
                            ? "bg-white text-brand-600 shadow-sm dark:bg-white/10 dark:text-brand-400"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white/90"
                    }`}
                >
                    {getLabel(tab)}
                </button>
            ))}
        </div>
    );
}
