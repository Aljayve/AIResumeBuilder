
import SkillBadge from "../shared/SkillBadge";

interface Props {
    skills: string[];
}

export default function MissingKeywordsCard({ skills }: Props) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <h3 className="mb-5 font-semibold text-gray-800 dark:text-white/90">
                Missing Keywords
            </h3>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} type="missing" />
                ))}
            </div>

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Add these keywords to improve your match score.
            </p>
        </div>
    )
}
