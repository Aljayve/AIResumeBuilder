import { Search } from "lucide-react";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
}

const categories = [
    "All Categories",
    "ATS Friendly",
    "Corporate",
    "Tech",
    "Modern",
    "Management",
    "Design",
];

export default function TemplateToolbar({ search, onSearchChange, category, onCategoryChange }: Props) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                    Resume Templates
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a template for your resume.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full sm:w-56">
                    <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                        <Search size={18} className="text-gray-500 dark:text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search templates..."
                        className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="h-11 rounded-lg border border-gray-200 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800"
                >
                    {categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
