interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    className?: string;
}

export default function Slider({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    showValue = true,
    className = "",
}: SliderProps) {
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className={className}>
            {(label || showValue) && (
                <div className="mb-1.5 flex items-center justify-between">
                    {label && (
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {label}
                        </span>
                    )}
                    {showValue && (
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            {value}
                        </span>
                    )}
                </div>
            )}
            <div className="relative h-2 w-full">
                <div className="absolute h-full w-full rounded-full bg-gray-200 dark:bg-gray-700" />
                <div
                    className="absolute h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${percent}%` }}
                />
                <input
                    type="range"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    min={min}
                    max={max}
                    step={step}
                    className="absolute h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-500 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand-500 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm"
                />
            </div>
        </div>
    );
}
