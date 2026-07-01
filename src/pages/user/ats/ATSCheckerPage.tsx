import { useNavigate } from "react-router";
import { useAtsStore } from "../../../store/atsStore";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import ATSForm from "../../../components/ats/ATSForm";

export default function ATSCheckerPage() {
    const navigate = useNavigate();
    const { setFormData } = useAtsStore();

    const handleAnalyze = (resumeId: string, jobDescription: string) => {
        setFormData(resumeId, jobDescription);
        navigate("/dashboard/ats/scan");
    };

    return (
        <>
            <PageMeta
                title="ATS Checker - ResumeAI"
                description="Analyze resume compatibility with ATS systems."
            />
            <PageBreadcrumb pageTitle="ATS Checker" />

            <div className="space-y-6">
                <ATSForm onAnalyze={handleAnalyze} />
            </div>
        </>
    )
}
