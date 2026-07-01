import { CalendarDays } from "lucide-react";

interface DateInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export default function DateInput({
    label,
    value,
    onChange,
    disabled = false,
    required = false,
    className = "",
}: DateInputProps) {
    return (
        <div className={className}>
            {label && (
                <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-400">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    required={required}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:focus:border-brand-400 [&::-webkit-calendar-picker-indicator]:opacity-0"
                />
                <CalendarDays
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
            </div>
        </div>
    );
}
