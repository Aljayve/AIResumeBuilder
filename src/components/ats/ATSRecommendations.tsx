import { Lightbulb, ArrowRight, CheckCircle, AlertTriangle, Info } from "lucide-react";

const iconMap = {
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
};

const colorMap = {
    success: "text-success-600 bg-success-50 dark:bg-success-500/10 border-success-100 dark:border-success-500/20",
    warning: "text-warning-600 bg-warning-50 dark:bg-warning-500/10 border-warning-100 dark:border-warning-500/20",
    info: "text-brand-600 bg-brand-50 dark:bg-brand-500/10 border-brand-100 dark:border-brand-500/20",
};

interface Suggestion {
    type: "success" | "warning" | "info";
    title: string;
    description: string;
}

interface Props {
    suggestions: Suggestion[];
}

export default function ATSRecommendations({ suggestions }: Props) {
    if (suggestions.length === 0) return null;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 dark:bg-warning-500/10">
                    <Lightbulb size={20} className="text-warning-500" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white/90">
                    Recommendations
                </h3>
            </div>

            <div className="space-y-3">
                {suggestions.map((item, idx) => {
                    const Icon = iconMap[item.type];
                    const colors = colorMap[item.type];
                    return (
                        <div
                            key={idx}
                            className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${colors}`}
                        >
                            <Icon size={18} className="mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-xs mt-0.5 opacity-80">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
