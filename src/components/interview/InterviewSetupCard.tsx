import { useEffect, useState } from "react";
import { Sparkles, FileText, Briefcase, Loader2 } from "lucide-react";
import { resumeApi } from "../../api/resume.api";
import type { ResumeSummary } from "../../api/resume.api";

interface Props {
    jd: string;
    resumeId: string;
    onJdChange: (v: string) => void;
    onResumeChange: (v: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export default function InterviewSetupCard({ jd, resumeId, onJdChange, onResumeChange, onGenerate, isLoading }: Props) {
    const [resumes, setResumes] = useState<ResumeSummary[]>([]);

    useEffect(() => {
        resumeApi.getAll().then(({ data }) => {
            setResumes(data);
            if (data.length > 0 && !resumeId) onResumeChange(data[0]._id);
        }).catch(() => { });
    }, []);

    const canGenerate = !!resumeId;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <Sparkles size={20} className="text-brand-500" />
                </div>
                <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white/90">
                        Interview Setup
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Choose a resume and paste a job description
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Briefcase size={14} className="mr-1.5 inline" />
                        Select Resume
                    </label>
                    <select
                        value={resumeId}
                        onChange={(e) => onResumeChange(e.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    >
                        <option className="dark:bg-gray-800 dark:text-white" value="">Choose a resume...</option>
                        {resumes.map((r) => (
                            <option className="dark:bg-gray-800 dark:text-white" key={r._id} value={r._id}>{r.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FileText size={14} className="mr-1.5 inline" />
                        Job Description
                    </label>
                    <textarea
                        value={jd}
                        onChange={(e) => onJdChange(e.target.value)}
                        rows={6}
                        placeholder="Paste the job description here..."
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-3.5 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                </div>

                <button
                    onClick={onGenerate}
                    disabled={!canGenerate || isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Generating...
                        </span>
                    ) : (
                        <><Sparkles size={16} /> Generate Questions</>
                    )}
                </button>
            </div>
        </div>
    );
}
