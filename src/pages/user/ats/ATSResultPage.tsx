import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtsStore } from "../../../store/atsStore";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import ATSScoreCard from "../../../components/ats/ATSScoreCard";
import ATSMatchedSkills from "../../../components/ats/ATSMatchedSkills";
import ATSMissingSkills from "../../../components/ats/ATSMissingSkills";
import ATSRecommendations from "../../../components/ats/ATSRecommendations";
import { RefreshCw } from "lucide-react";

export default function ATSResultPage() {
    const navigate = useNavigate();
    const { result, clear } = useAtsStore();

    useEffect(() => {
        if (!result) {
            navigate("/dashboard/ats", { replace: true });
        }
    }, [result]);

    if (!result) return null;

    const handleNewAnalysis = () => {
        clear();
        navigate("/dashboard/ats");
    };

    return (
        <>
            <PageMeta
                title="ATS Results - ResumeAI"
                description="Your ATS compatibility analysis results."
            />
            <PageBreadcrumb pageTitle="ATS Results" />

            <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    <ATSScoreCard score={result.score.overall} />
                    <ATSMatchedSkills skills={result.keywordAnalysis.matched} />
                    <ATSMissingSkills skills={result.keywordAnalysis.missing} />
                </div>

                {result.suggestions.length > 0 && (
                    <ATSRecommendations suggestions={result.suggestions} />
                )}

                <div className="flex justify-center">
                    <button
                        onClick={handleNewAnalysis}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
                    >
                        <RefreshCw size={16} />
                        Analyze Another Resume
                    </button>
                </div>
            </div>
        </>
    );
}
