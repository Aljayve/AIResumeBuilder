import { CheckCircle } from "lucide-react";

interface Props {
    strengths: string[];
}

export default function StrengthCard({ strengths }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <h3 className="mb-5 font-semibold text-gray-800 dark:text-white/90">
                Strengths
            </h3>

            <div className="space-y-3">
                {strengths.map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 dark:border-gray-800 dark:bg-white/3"
                    >
                        <CheckCircle
                            size={18}
                            className="shrink-0 text-success-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
