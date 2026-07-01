import { Search, Filter } from "lucide-react";

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
    categories: string[];
}

export default function TemplateToolbar({ search, onSearchChange, categoryFilter, onCategoryFilterChange, categories }: Props) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-1">
                <div className="relative w-full sm:w-72">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Search size={18} className="text-gray-500 dark:text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search templates..."
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                </div>

                <div className="relative w-full sm:w-auto">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Filter size={15} className="text-gray-400" />
                    </span>
                    <select
                        value={categoryFilter}
                        onChange={(e) => onCategoryFilterChange(e.target.value)}
                        className="h-10 w-full rounded-lg border border-gray-200 bg-transparent pl-8 pr-8 text-sm text-gray-800 appearance-none focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90"
                    >
                        <option className="dark:bg-gray-800 dark:text-white" value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option className="dark:bg-gray-800 dark:text-white" key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
