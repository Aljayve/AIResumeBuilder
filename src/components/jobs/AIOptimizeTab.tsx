import { Sparkles, ArrowRight, Lightbulb, AlertCircle, CheckCircle } from "lucide-react";
import type { AtsAnalysisResult } from "../../api/ats.api";

interface Props {
    result: AtsAnalysisResult;
    jobDescription: string;
}

export default function AIOptimizeTab({ result, jobDescription }: Props) {
    const { ai, keywordAnalysis } = result;

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                        <ArrowRight size={20} className="text-brand-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                            Job Description
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            The target position you're analyzing against
                        </p>
                    </div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-white/[0.03]">
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {jobDescription}
                    </p>
                </div>
            </div>

            <div className="rounded-2xl border border-success-200 bg-white p-5 dark:border-success-800 dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 dark:bg-success-500/10">
                        <Sparkles size={20} className="text-success-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                            Strengths
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Areas where your resume aligns well
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    {ai.strengths.length > 0 ? (
                        ai.strengths.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-xl border border-success-100 bg-success-50 p-3 dark:border-success-800 dark:bg-success-500/10"
                            >
                                <CheckCircle size={18} className="mt-0.5 shrink-0 text-success-500" />
                                <p className="text-sm leading-5 text-gray-700 dark:text-gray-300">
                                    {item}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No specific strengths identified.</p>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                        <Lightbulb size={20} className="text-brand-500" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                            Improvement Areas
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Priority fixes to improve your match score
                        </p>
                    </div>
                </div>
                <div className="space-y-2">
                    {ai.priorityFixes.length > 0 ? (
                        ai.priorityFixes.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-white/[0.03]"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                                    {i + 1}
                                </span>
                                <p className="text-sm leading-5 text-gray-600 dark:text-gray-400">
                                    {item}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No improvements suggested.</p>
                    )}
                </div>
            </div>

            {ai.weaknesses.length > 0 && (
                <div className="rounded-2xl border border-error-200 bg-white p-5 dark:border-error-800 dark:bg-white/[0.03]">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-50 dark:bg-error-500/10">
                            <AlertCircle size={20} className="text-error-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white/90">
                                Gaps Detected
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Missing keywords: {keywordAnalysis.missing.join(", ")}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {ai.weaknesses.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 rounded-xl border border-error-100 bg-error-50 p-3 dark:border-error-800 dark:bg-error-500/10"
                            >
                                <AlertCircle size={18} className="mt-0.5 shrink-0 text-error-500" />
                                <p className="text-sm leading-5 text-gray-700 dark:text-gray-300">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
