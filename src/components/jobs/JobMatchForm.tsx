import { useState, useEffect } from "react";
import { Briefcase, Search, Loader2 } from "lucide-react";
import { resumeApi } from "../../api/resume.api";
import type { ResumeSummary } from "../../api/resume.api";

interface Props {
    onAnalyze: (resumeId: string, jobDescription: string) => void;
    loading: boolean;
}

export default function JobMatchForm({ onAnalyze, loading }: Props) {
    const [resumes, setResumes] = useState<ResumeSummary[]>([]);
    const [resumeId, setResumeId] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    useEffect(() => {
        resumeApi.getAll().then(({ data }) => {
            setResumes(data);
            if (data.length > 0) setResumeId(data[0]._id);
        }).catch(() => { });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeId || !jobDescription.trim()) return;
        onAnalyze(resumeId, jobDescription.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
                    <Briefcase size={20} className="text-brand-500" />
                </div>
                <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white/90">
                        Job Match Analysis
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Compare your resume against a job description
                    </p>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Select Resume
                    </label>
                    <select
                        value={resumeId}
                        onChange={(e) => setResumeId(e.target.value)}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                    >
                        {resumes.length === 0 && (
                            <option className="dark:bg-gray-800 dark:text-white" value="">No resumes available</option>
                        )}
                        {resumes.map((r) => (
                            <option className="dark:bg-gray-800 dark:text-white" key={r._id} value={r._id}>
                                {r.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Target Position
                    </label>
                    <input
                        placeholder="Frontend Developer"
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                </div>
            </div>

            <div className="mt-5">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Job Description
                </label>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    placeholder="Paste job description..."
                    className="w-full rounded-xl border border-gray-300 bg-transparent p-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 resize-none"
                />
            </div>

            <div className="mt-5">
                <button
                    type="submit"
                    disabled={loading || !resumeId || !jobDescription.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Search size={16} />
                    )}
                    {loading ? "Analyzing..." : "Analyze Match"}
                </button>
            </div>
        </form>
    );
}
