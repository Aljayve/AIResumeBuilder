import { useState } from "react";
import { Mic, Square, CheckCircle, Lightbulb } from "lucide-react";
import type { Question } from "./QuestionList";

interface Props {
    question: Question | null;
}

export default function PracticeCard({ question }: Props) {
    const [answer, setAnswer] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    if (!question) {
        return (
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
        );
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <Mic size={20} className="text-brand-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">
                        Practice Answer
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Write or speak your response
                    </p>
                </div>
            </div>

            <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-3 dark:border-brand-500/20 dark:bg-brand-500/5">
                <p className="text-sm font-medium text-brand-700 dark:text-brand-400">
                    {question.question}
                </p>
            </div>

            <div className="mb-4 flex items-start gap-2">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 break-words hyphens-auto">
                    {question.hint}
                </p>
            </div>

            <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                placeholder="Type your answer here..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                        isRecording
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/10"
                    }`}
                >
                    {isRecording ? (
                        <><Square size={16} /> Stop Recording</>
                    ) : (
                        <><Mic size={16} /> Start Recording</>
                    )}
                </button>

                {answer.trim() && (
                    <span className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle size={16} />
                        Answer saved
                    </span>
                )}
            </div>
        </div>
    );
}
