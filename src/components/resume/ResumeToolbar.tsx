import { Search, Plus, Upload, LayoutGrid, List } from "lucide-react";

interface Props {
    view: "grid" | "table";
    onViewChange: (view: "grid" | "table") => void;
    search: string;
    onSearchChange: (value: string) => void;
    onCreate?: () => void;
}

export default function ResumeToolbar({ view, onViewChange, search, onSearchChange, onCreate }: Props) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                    <Search size={18} className="text-gray-500 dark:text-gray-400" />
                </span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search resumes..."
                    className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
            </div>

            <div className="flex items-center gap-3">
                <div className="flex rounded-lg border border-gray-200 p-1 dark:border-gray-800">
                    <button
                        onClick={() => onViewChange("grid")}
                        className={`flex items-center justify-center w-8 h-8 rounded-md transition ${view === "grid"
                            ? "bg-brand-500 text-white shadow-theme-xs"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => onViewChange("table")}
                        className={`flex items-center justify-center w-8 h-8 rounded-md transition ${view === "table"
                            ? "bg-brand-500 text-white shadow-theme-xs"
                            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            }`}
                    >
                        <List size={16} />
                    </button>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    <Upload size={16} />
                    <span className="hidden sm:inline">Upload Resume</span>
                </button>
                <button
                    onClick={onCreate}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-3 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 sm:px-4"
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Create Resume</span>
                </button>
            </div>
        </div>
    )
}
