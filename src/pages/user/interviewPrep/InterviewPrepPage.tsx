import { useState, useEffect } from "react";
import { Mic, Loader2, AlertCircle } from "lucide-react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import InterviewSetupCard from "../../../components/interview/InterviewSetupCard";
import QuestionList from "../../../components/interview/QuestionList";
import PracticeCard from "../../../components/interview/PracticeCard";
import type { Question } from "../../../components/interview/QuestionList";
import Tabs from "../../../components/ui/Tabs";
import { useInterviewStore } from "../../../store/interviewStore";

const tabs = [
    { key: "behavioral", label: "Behavioral" },
    { key: "technical", label: "Technical" },
    { key: "situational", label: "Situational" },
    { key: "general", label: "General" },
];

export default function InterviewPrepPage() {
    const [jd, setJd] = useState("");
    const [resumeId, setResumeId] = useState("");
    const [activeTab, setActiveTab] = useState("behavioral");
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const { questions, loading, error, generate } = useInterviewStore();

    useEffect(() => {
        setSelectedQuestion(null);
    }, [activeTab]);

    const handleGenerate = () => {
        generate(resumeId, jd || undefined);
    };

    const allQuestions = questions ?? {
        behavioral: [] as Question[],
        technical: [] as Question[],
        situational: [] as Question[],
        general: [] as Question[],
    };

    const currentQuestions = allQuestions[activeTab as keyof typeof allQuestions] ?? [];
    const hasQuestions = Object.values(allQuestions).some((q) => q.length > 0);

    return (
        <>
            <PageMeta
                title="Interview Prep - ResumeAI"
                description="Generate and practice interview questions tailored to your resume."
            />
            <PageBreadcrumb pageTitle="Interview Prep" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                        Interview Prep
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Practice interview questions generated from your resume and target role
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <InterviewSetupCard
                        jd={jd}
                        resumeId={resumeId}
                        onJdChange={setJd}
                        onResumeChange={setResumeId}
                        onGenerate={handleGenerate}
                        isLoading={loading}
                    />

                    <div className="space-y-4">
                        {loading && (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 size={28} className="animate-spin text-brand-500" />
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-3 rounded-2xl border border-error-200 bg-error-50 p-4 dark:border-error-500/20 dark:bg-error-500/10">
                                <AlertCircle size={18} className="shrink-0 text-error-500" />
                                <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
                            </div>
                        )}

                        {!loading && !error && (
                            <>
                                <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
                                {hasQuestions ? (
                                    <QuestionList
                                        questions={currentQuestions}
                                        selectedId={selectedQuestion?.id ?? null}
                                        onSelect={setSelectedQuestion}
                                        category={activeTab}
                                    />
                                ) : (
                                    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <HelpCircleIcon size={48} className="mb-4 text-gray-300 dark:text-gray-600" />
                                            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
                                                No Questions Yet
                                            </h3>
                                            <p className="max-w-md text-sm text-gray-500 dark:text-gray-400">
                                                Select a resume and paste a job description on the left, then click <span className="font-medium text-brand-500">Generate Questions</span> to get AI-powered interview questions.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="lg:sticky lg:top-24 lg:self-start">
                        {hasQuestions ? (
                            <PracticeCard question={selectedQuestion} />
                        ) : (
                            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.03]">
                                        <Mic size={20} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-white/90">
                                            Practice Answer
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Click a question to practice your response
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function HelpCircleIcon({ size, className }: { size: number; className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>
    );
}
