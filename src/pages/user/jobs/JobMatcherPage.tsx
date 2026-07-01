import { Loader2, AlertCircle } from "lucide-react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";

import JobMatchForm from "../../../components/jobs/JobMatchForm";
import MatchScoreCard from "../../../components/jobs/MatchScoreCard";
import MissingKeywordsCard from "../../../components/jobs/MissingKeywordsCard";
import StrengthCard from "../../../components/jobs/StrengthCard";
import SuggestionsCard from "../../../components/jobs/SuggestionsCard";
import { useJobMatcherStore } from "../../../store/jobMatcherStore";

export default function JobMatcherPage() {
    const { result, loading, error, analyze } = useJobMatcherStore();

    return (
        <>
            <PageMeta
                title="Job Matcher - ResumeAI"
                description="Compare your resume against a specific job posting."
            />
            <PageBreadcrumb pageTitle="Job Matcher" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                        Job Matcher
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Compare resume vs job description
                    </p>
                </div>

                <JobMatchForm onAnalyze={analyze} loading={loading} />

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 size={32} className="animate-spin text-brand-500" />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-3 rounded-2xl border border-error-200 bg-error-50 p-5 dark:border-error-500/20 dark:bg-error-500/10">
                        <AlertCircle size={20} className="shrink-0 text-error-500" />
                        <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
                    </div>
                )}

                {result && (
                    <div className="grid gap-6 lg:grid-cols-3">
                        <MatchScoreCard score={result.matchPercentage} />
                        <MissingKeywordsCard skills={result.missingSkills} />
                        <StrengthCard strengths={result.matchingSkills} />

                        {result.suggestions.length > 0 && (
                            <div className="lg:col-span-3">
                                <SuggestionsCard suggestions={result.suggestions} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
