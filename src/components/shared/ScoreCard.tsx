import { TrendingUp, TrendingDown } from "lucide-react";

const scoreColor = (score: number) => {
    if (score >= 90) return "text-success-500";
    if (score >= 75) return "text-brand-500";
    if (score >= 60) return "text-warning-500";
    return "text-error-500";
};

const scoreRingColor = (score: number) => {
    if (score >= 90) return "stroke-success-500";
    if (score >= 75) return "stroke-brand-500";
    if (score >= 60) return "stroke-warning-500";
    return "stroke-error-500";
};

const scoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good Match";
    if (score >= 60) return "Average";
    return "Needs Improvement";
};

interface ScoreCardProps {
    title: string;
    score: number;
    description?: string;
}

export default function ScoreCard({
    title,
    score,
    description,
}: ScoreCardProps) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <h3 className="mb-5 font-semibold text-gray-800 dark:text-white/90">
                {title}
            </h3>

            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <svg width="160" height="160" className="-rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="none"
                            strokeWidth="10"
                            className="stroke-gray-100 dark:stroke-gray-800"
                        />
                        <circle
                            cx="80"
                            cy="80"
                            r={radius}
                            fill="none"
                            strokeWidth="10"
                            strokeLinecap="round"
                            className={scoreRingColor(score)}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                    </svg>
                    <span className={`absolute text-4xl font-bold ${scoreColor(score)}`}>
                        {score}%
                    </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    {score >= 75 ? (
                        <TrendingUp size={18} className="text-success-500" />
                    ) : (
                        <TrendingDown size={18} className="text-error-500" />
                    )}
                    <span className={`text-sm font-medium ${scoreColor(score)}`}>
                        {scoreLabel(score)}
                    </span>
                </div>

                {description && (
                    <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
