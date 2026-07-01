import { XCircle } from "lucide-react";

interface Props {
    skills: string[];
}

export default function ATSMissingSkills({ skills }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-5 font-semibold text-gray-800 dark:text-white/90">
                Missing Skills
            </h3>

            <div className="space-y-3">
                {skills.map((skill) => (
                    <div
                        key={skill}
                        className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 dark:border-gray-800 dark:bg-white/[0.03]"
                    >
                        <XCircle
                            size={18}
                            className="shrink-0 text-error-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
