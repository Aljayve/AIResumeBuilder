interface Props {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
}

export default function SwitchWidget({ label, value, onChange }: Props) {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() => onChange(!value)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-hidden ${
                    value ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${value ? "translate-x-4" : "translate-x-0"}`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
        </div>
    );
}
