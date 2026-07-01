import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { resumeApi, type ResumeSummary } from "../../api/resume.api";
import { useCoverLetterStore } from "../../store/coverLetterStore";

interface Props {
    onContentChange: (content: string) => void;
}

export default function CoverLetterForm({ onContentChange }: Props) {
    const { generate, generating, error, current } = useCoverLetterStore();

    const [resumes, setResumes] = useState<ResumeSummary[]>([]);
    const [resumeId, setResumeId] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    useEffect(() => {
        resumeApi.getAll().then(({ data }) => {
            setResumes(data);
            if (data.length > 0) setResumeId(data[0]._id);
        }).catch(() => { });
    }, []);

    useEffect(() => {
        if (current) {
            onContentChange(current.content);
        }
    }, [current, onContentChange]);

    const handleGenerate = () => {
        if (!resumeId || !jobTitle.trim() || !companyName.trim()) return;
        generate({ resumeId, jobTitle: jobTitle.trim(), companyName: companyName.trim(), jobDescription: jobDescription.trim() || undefined });
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.03]">
                    <span className="text-lg">📄</span>
                </div>
                <div>
                    <h2 className="font-semibold text-gray-800 dark:text-white/90">
                        Cover Letter Details
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fill in the details to generate a tailored cover letter
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Select Resume
                        </label>
                        <select
                            value={resumeId}
                            onChange={(e) => setResumeId(e.target.value)}
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
                        >
                            {resumes.length === 0 && <option className="dark:bg-gray-800 dark:text-white" value="">No resumes found</option>}
                            {resumes.map((r) => (
                                <option className="dark:bg-gray-800 dark:text-white" key={r._id} value={r._id}>{r.title}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Job Title
                        </label>
                        <input
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Frontend Developer"
                            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company Name
                    </label>
                    <input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Google"
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Job Description
                    </label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={6}
                        placeholder="Paste job description here..."
                        className="w-full rounded-xl border border-gray-300 bg-transparent p-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 resize-none"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                    onClick={handleGenerate}
                    disabled={generating || !resumeId || !jobTitle.trim() || !companyName.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Sparkles size={16} />
                    {generating ? "Generating..." : "Generate Cover Letter"}
                </button>
            </div>
        </div>
    );
}
