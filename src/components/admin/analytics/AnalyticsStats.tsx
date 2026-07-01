import type { ReactNode } from "react";

interface StatItem {
    title: string;
    value: string;
    icon: ReactNode;
    trend: number;
    trendLabel: string;
}

interface Props {
    stats: StatItem[];
}

export default function AnalyticsStats({ stats }: Props) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
                <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{s.title}</span>
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                            {s.icon}
                        </span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</h2>
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.trend >= 0 ? "bg-success-50 text-success-600 dark:bg-success-500/10" : "bg-error-50 text-error-600 dark:bg-error-500/10"}`}>
                            <svg className="fill-current" width="10" height="10" viewBox="0 0 10 10">
                                {s.trend >= 0 ? (
                                    <path d="M5 1.5L9.5 8H0.5L5 1.5Z" />
                                ) : (
                                    <path d="M5 8.5L0.5 2H9.5L5 8.5Z" />
                                )}
                            </svg>
                            {Math.abs(s.trend)}%
                            <span className="text-gray-400">{s.trendLabel}</span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
