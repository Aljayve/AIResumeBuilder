import { Lightbulb, ArrowRight } from "lucide-react";

interface Props {
    suggestions: string[];
}

export default function SuggestionsCard({ suggestions }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 dark:bg-warning-500/10">
                    <Lightbulb size={20} className="text-warning-500" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">
                    Improvement Suggestions
                </h3>
            </div>

            <div className="space-y-3">
                {suggestions.map((item) => (
                    <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 dark:border-gray-800 dark:bg-white/3"
                    >
                        <ArrowRight
                            size={16}
                            className="mt-0.5 shrink-0 text-brand-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
