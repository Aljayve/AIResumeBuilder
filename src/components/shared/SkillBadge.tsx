import clsx from "clsx";

interface SkillBadgeProps {
    skill: string;
    type?: "matched" | "missing";
}

export default function SkillBadge({
    skill,
    type = "matched",
}: SkillBadgeProps) {
    return (
        <span
            className={clsx(
                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                {
                    "bg-success-50 text-success-700 dark:bg-success-500/10 dark:text-success-400":
                        type === "matched",
                    "bg-error-50 text-error-700 dark:bg-error-500/10 dark:text-error-400":
                        type === "missing",
                }
            )}
        >
            {skill}
        </span>
    );
}
