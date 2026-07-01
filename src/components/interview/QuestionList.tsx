import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, HelpCircle } from "lucide-react";

export interface Question {
    id: string;
    question: string;
    hint: string;
}

interface Props {
    questions: Question[];
    selectedId: string | null;
    onSelect: (q: Question) => void;
    category: string;
}

const categoryLabels: Record<string, string> = {
    behavioral: "Behavioral",
    technical: "Technical",
    situational: "Situational",
    general: "General",
};

const categories = ["behavioral", "technical", "situational", "general"];

export default function QuestionList({ questions, selectedId, onSelect, category }: Props) {
    const [openId, setOpenId] = useState<string | null>(null);

    if (!questions.length) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <HelpCircle size={40} className="mb-3 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Select a resume and paste a job description, then click <span className="font-medium text-brand-500">Generate</span> to get started.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <HelpCircle size={20} className="text-brand-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">
                        {categoryLabels[category] || "Questions"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {questions.length} question{questions.length !== 1 ? "s" : ""} — click to practice
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                {questions.map((q) => {
                    const isOpen = openId === q.id;
                    const isSelected = selectedId === q.id;

                    return (
                        <div
                            key={q.id}
                            className={`rounded-xl border transition ${
                                isSelected
                                    ? "border-brand-500 bg-brand-50/50 dark:border-brand-500 dark:bg-brand-500/5"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-white/[0.03] dark:hover:border-gray-600"
                            }`}
                        >
                            <div className="flex items-start gap-2 px-4 py-3">
                                <button
                                    onClick={() => onSelect(q)}
                                    className={`min-w-0 flex-1 text-left text-sm font-medium ${
                                        isSelected
                                            ? "text-brand-700 dark:text-brand-400"
                                            : "text-gray-800 dark:text-white/90"
                                    }`}
                                >
                                    {q.question}
                                </button>
                                <button
                                    onClick={() => setOpenId(isOpen ? null : q.id)}
                                    className="mt-0.5 shrink-0 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {isOpen ? (
                                        <ChevronUp size={16} className="text-gray-400" />
                                    ) : (
                                        <ChevronDown size={16} className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {isOpen && (
                                <div className="border-t border-gray-200 px-4 pb-3 pt-2 dark:border-gray-700">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb size={14} className="mt-0.5 shrink-0 text-amber-500" />
                                        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                            {q.hint}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
