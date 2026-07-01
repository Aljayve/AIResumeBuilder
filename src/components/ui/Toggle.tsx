interface ToggleProps {
    label?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function Toggle({ label, checked, onChange }: ToggleProps) {
    const btn = (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                checked ? "bg-brand-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
        >
            <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition ${
                    checked ? "translate-x-[18px]" : "translate-x-1"
                }`}
            />
        </button>
    );

    if (!label) return btn;

    return (
        <div className="flex w-full items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
            {btn}
        </div>
    );
}
