import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAtsStore } from "../../../store/atsStore";
import PageMeta from "../../../components/common/PageMeta";
import { AlertCircle, Loader2 } from "lucide-react";

export default function ATSScanPage() {
    const navigate = useNavigate();
    const { loading, result, error, progress, stage, resumeId, jobDescription, analyze } = useAtsStore();
    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        if (!resumeId || !jobDescription.trim()) {
            navigate("/dashboard/ats", { replace: true });
            return;
        }
        startedRef.current = true;
        analyze();
    }, []);

    useEffect(() => {
        if (result) {
            const t = setTimeout(() => navigate("/dashboard/ats/result", { replace: true }), 600);
            return () => clearTimeout(t);
        }
    }, [result]);

    useEffect(() => {
        if (error) {
            const t = setTimeout(() => navigate("/dashboard/ats", { replace: true }), 2500);
            return () => clearTimeout(t);
        }
    }, [error]);

    return (
        <>
            <PageMeta title="Scanning - ATS Checker" description="Analyzing your resume..." />

            <div className="flex flex-col items-center justify-center py-16">
                {error ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3 rounded-2xl border border-error-200 bg-error-50 p-5 dark:border-error-500/20 dark:bg-error-500/10">
                            <AlertCircle size={20} className="shrink-0 text-error-500" />
                            <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Redirecting back...</p>
                    </div>
                ) : (
                    <div className="w-full max-w-md">
                        <div className="mb-6 flex justify-center">
                            <Loader2 size={48} className="animate-spin text-brand-500" />
                        </div>

                        <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className="h-full rounded-full bg-brand-500 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">{stage}</p>
                        <p className="mt-1 text-center text-3xl font-bold text-brand-500">{progress}%</p>
                    </div>
                )}
            </div>
        </>
    );
}
