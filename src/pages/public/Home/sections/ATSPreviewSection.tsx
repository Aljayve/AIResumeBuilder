import { CheckCircle2, Sparkles, XCircle } from "lucide-react";

export default function ATSPreviewSection() {
    const matchedSkills = ["React", "TypeScript", "Node.js", "MongoDB"];
    const missingSkills = ["AWS", "Redux"];

    return (
        <section className="bg-gray-50 py-20 dark:bg-white/[0.01]">
            <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
                <div>
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-400">
                        ATS Scanner
                    </span>
                    <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Improve Your Resume
                        <span className="text-brand-500"> Before Recruiters See It</span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
                        Our ATS Scanner analyzes your resume, identifies missing keywords, and provides
                        recommendations to improve compatibility with Applicant Tracking Systems.
                    </p>
                    <div className="mt-8 space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-success-500" /> ATS Compatibility Score
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-success-500" /> Keyword Analysis
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={20} className="text-success-500" /> Improvement Suggestions
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Resume Analysis</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">AI ATS Scanner Report</p>
                        </div>
                        <Sparkles className="text-brand-500" size={24} />
                    </div>

                    <div className="mt-8 text-center">
                        <div className="text-6xl font-bold text-brand-500">92</div>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">ATS Score</p>
                    </div>

                    <div className="mt-8">
                        <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Matched Skills</h4>
                        <div className="space-y-3">
                            {matchedSkills.map((skill) => (
                                <div key={skill} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-success-500" />
                                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Missing Skills</h4>
                        <div className="space-y-3">
                            {missingSkills.map((skill) => (
                                <div key={skill} className="flex items-center gap-3">
                                    <XCircle size={18} className="text-error-500" />
                                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-brand-50 p-4 dark:bg-brand-500/10">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="block font-bold">Recommendation:</span>
                            Add cloud deployment experience and highlight Redux projects to increase your ATS score.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
