import { forwardRef } from "react";
import { useResumeBuilderStore } from "../../store/resumeBuilderStore";
import { Eye } from "lucide-react";
import ATSClassicTemplate from "../resumeTemplates/ATSClassicTemplate";
import ModernTemplate from "../resumeTemplates/ModernTemplate";
import ProfessionalTemplate from "../resumeTemplates/ProfessionalTemplate";
import AccessibleTemplate from "../resumeTemplates/AccessibleTemplate";
import CreativeTemplate from "../resumeTemplates/CreativeTemplate";
import TechnicalTemplate from "../resumeTemplates/TechnicalTemplate";
import HeaderBandTemplate from "../resumeTemplates/HeaderBandTemplate";
import InspiredTemplate from "../resumeTemplates/InspiredTemplate";
import PlainTemplate from "../resumeTemplates/PlainTemplate";
import VersatileTemplate from "../resumeTemplates/VersatileTemplate";
import StraightforwardTemplate from "../resumeTemplates/StraightforwardTemplate";
import SidebarRightTemplate from "../resumeTemplates/SidebarRightTemplate";
import SidebarLeftTemplate from "../resumeTemplates/SidebarLeftTemplate";

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
    const resume = useResumeBuilderStore((s) => s.resume);
    const selectedTemplate = useResumeBuilderStore((s) => s.selectedTemplate);

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case "modern":
                return <ModernTemplate resume={resume} />;
            case "professional":
                return <ProfessionalTemplate resume={resume} />;
            case "accessible":
                return <AccessibleTemplate resume={resume} />;
            case "creative":
                return <CreativeTemplate resume={resume} />;
            case "technical":
                return <TechnicalTemplate resume={resume} />;
            case "header-band":
                return <HeaderBandTemplate resume={resume} />;
            case "inspired":
                return <InspiredTemplate resume={resume} />;
            case "plain":
                return <PlainTemplate resume={resume} />;
            case "versatile":
                return <VersatileTemplate resume={resume} />;
            case "straightforward":
                return <StraightforwardTemplate resume={resume} />;
            case "sidebar-right":
                return <SidebarRightTemplate resume={resume} />;
            case "sidebar-left":
                return <SidebarLeftTemplate resume={resume} />;
            default:
                return <ATSClassicTemplate resume={resume} />;
        }
    };

    return (
        <div ref={ref} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.03]">
                    <Eye size={20} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white/90">
                        Resume Preview
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Live preview of your resume
                    </p>
                </div>
            </div>

            <div className="-mx-5 overflow-x-auto px-5">
                <div data-print-root className="min-w-[210mm]">{renderTemplate()}</div>
            </div>
        </div>
    );
});

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
