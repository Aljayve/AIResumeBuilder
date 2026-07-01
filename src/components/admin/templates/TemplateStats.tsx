import type { ReactNode } from "react";

interface Props {
    title: string;
    value: string | number;
    icon: ReactNode;
    color?: "brand" | "success" | "warning" | "error";
}

const colorMap = {
    brand: "bg-brand-50 text-brand-500 dark:bg-brand-500/10",
    success: "bg-success-50 text-success-600 dark:bg-success-500/10",
    warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/10",
    error: "bg-error-50 text-error-600 dark:bg-error-500/10",
};

export default function TemplateStats({ title, value, icon, color = "brand" }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[color]}`}>
                    {icon}
                </span>
            </div>
            <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
    );
}
