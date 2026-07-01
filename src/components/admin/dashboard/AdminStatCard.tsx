import type { ReactNode } from "react";

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: number;
    trendLabel?: string;
}

export default function AdminStatCard({ title, value, icon, trend, trendLabel }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                    {icon}
                </span>
            </div>
            <div className="mt-3 flex items-end justify-between">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h2>
                {trend !== undefined && (
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${trend >= 0 ? "bg-success-50 text-success-600 dark:bg-success-500/10" : "bg-error-50 text-error-600 dark:bg-error-500/10"}`}>
                        <svg className="fill-current" width="10" height="10" viewBox="0 0 10 10">
                            {trend >= 0 ? (
                                <path d="M5 1.5L9.5 8H0.5L5 1.5Z" />
                            ) : (
                                <path d="M5 8.5L0.5 2H9.5L5 8.5Z" />
                            )}
                        </svg>
                        {Math.abs(trend)}%
                        {trendLabel && <span className="text-gray-400">{trendLabel}</span>}
                    </span>
                )}
            </div>
        </div>
    );
}
