import { ArrowRight, Eye } from "lucide-react";

interface TemplateCardProps {
    name: string;
    category: string;
}

export default function TemplateCard({ name, category }: TemplateCardProps) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="relative h-80 bg-gray-100 dark:bg-white/[0.02]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-60 w-44 rounded-lg bg-white shadow-lg dark:bg-gray-800" />
                </div>
                <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-medium text-white">{category}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Professional resume template designed for modern job seekers.
                </p>
                <div className="mt-5 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600">
                        <Eye size={16} /> Preview
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-500 dark:text-gray-300">
                        Use Template <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
