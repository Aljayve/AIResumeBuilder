import { useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadcrumb";
import BuilderSidebar from "../../../components/resumeBuilder/BuilderSidebar";
import ResumePreview from "../../../components/resumeBuilder/ResumePreview";
import PersonalInfoForm from "../../../components/resumeBuilder/sections/PersonalInfoForm";
import ExperienceForm from "../../../components/resumeBuilder/sections/ExperienceForm";
import EducationForm from "../../../components/resumeBuilder/sections/EducationForm";
import SkillsForm from "../../../components/resumeBuilder/sections/SkillsForm";
import ProjectsForm from "../../../components/resumeBuilder/sections/ProjectsForm";
import CertificationsForm from "../../../components/resumeBuilder/sections/CertificationsForm";
import LanguagesForm from "../../../components/resumeBuilder/sections/LanguagesForm";
import AwardsForm from "../../../components/resumeBuilder/sections/AwardsForm";
import ActivitiesForm from "../../../components/resumeBuilder/sections/ActivitiesForm";
import VolunteeringForm from "../../../components/resumeBuilder/sections/VolunteeringForm";
import { useResumeBuilderStore } from "../../../store/resumeBuilderStore";
import { resumeApi } from "../../../api/resume.api";
import { toBackendContent } from "../../../utils/resumeAdapter";
import TemplateSelector from "../../../components/resumeTemplates/TemplateSelector";
import ExportPDFButton from "../../../components/resumeBuilder/ExportPDFButton";

export default function ResumeBuilderPage() {
    const { resumeId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const store = useResumeBuilderStore();
    const { activeSection, resume, resumeTitle, selectedTemplate, saving, saved, loadResume, resetResume, setSaving, setSaved, setSelectedTemplate } = store;
    const loaded = useRef(false);

    useEffect(() => {
        if (resumeId && !loaded.current) {
            loaded.current = true;
            resumeApi.getById(resumeId).then(({ data }) => {
                loadResume(
                    data._id,
                    data.title,
                    data.template,
                    data.content ?? {},
                    [],
                );
            }).catch(() => {
                toast.error("Failed to load resume");
                navigate("/dashboard/resumes");
            });
        }
        if (!resumeId) {
            resetResume();
            const template = searchParams.get("template");
            if (template && template !== "ats-classic") {
                setSelectedTemplate(template as any);
            }
        }
        return () => { loaded.current = false; };
    }, [resumeId]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = toBackendContent(resume);
            if (store.resumeId) {
                await resumeApi.update(store.resumeId, { content });
            } else {
                const { data } = await resumeApi.create({
                    title: resumeTitle,
                    template: selectedTemplate,
                    content,
                });
                store.loadResume(data._id, data.title, data.template, data.content ?? [], []);
                navigate(`/dashboard/resumes/${data._id}`, { replace: true });
            }
            setSaved(true);
            toast.success("Resume saved");
        } catch {
            toast.error("Failed to save resume");
        } finally {
            setSaving(false);
        }
    };

    const renderForm = () => {
        switch (activeSection) {
            case "personal": return <PersonalInfoForm />;
            case "experience": return <ExperienceForm />;
            case "education": return <EducationForm />;
            case "skills": return <SkillsForm />;
            case "projects": return <ProjectsForm />;
            case "certifications": return <CertificationsForm />;
            case "languages": return <LanguagesForm />;
            case "awards": return <AwardsForm />;
            case "activities": return <ActivitiesForm />;
            case "volunteering": return <VolunteeringForm />;
            default: return <PersonalInfoForm />;
        }
    };

    const previewRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <PageMeta
                title="Resume Builder - ResumeAI"
                description="Build your resume step by step."
            />
            <PageBreadcrumb pageTitle="Resume Builder" />

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <input
                        value={resumeTitle}
                        onChange={(e) => store.setResumeTitle(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-transparent px-3 py-1.5 text-lg font-semibold text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
                    />
                    {!saved && (
                        <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">Unsaved</span>
                    )}
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="w-full space-y-6 lg:w-96 lg:min-w-80">
                    <BuilderSidebar />
                    {renderForm()}

                    <ExportPDFButton previewRef={previewRef} />
                    <TemplateSelector />
                </div>

                <div className="min-w-0 flex-1">
                    <ResumePreview ref={previewRef} />
                </div>
            </div>
        </>
    )
}
