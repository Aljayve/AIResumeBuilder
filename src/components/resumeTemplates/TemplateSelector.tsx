import { Check } from "lucide-react";
import { useResumeBuilderStore, type ResumeTemplate } from "../../store/resumeBuilderStore";
import TemplatePreview from "../templates/TemplatePreview";

const allTemplates: { value: ResumeTemplate; label: string; premium?: boolean }[] = [
    { value: "ats-classic", label: "ATS Classic" },
    { value: "modern", label: "Modern" },
    { value: "professional", label: "Professional" },
    { value: "accessible", label: "Accessible" },
    { value: "creative", label: "Creative", premium: true },
    { value: "technical", label: "Technical" },
    { value: "header-band", label: "Header Band" },
    { value: "inspired", label: "Inspired" },
    { value: "plain", label: "Plain" },
    { value: "versatile", label: "Versatile" },
    { value: "straightforward", label: "Straightforward" },
    { value: "sidebar-right", label: "Sidebar Right" },
    { value: "sidebar-left", label: "Sidebar Left" },
];

interface Props {
    plan?: string;
}

export default function TemplateSelector({ plan }: Props) {
    const selectedTemplate = useResumeBuilderStore((s) => s.selectedTemplate);
    const setSelectedTemplate = useResumeBuilderStore((s) => s.setSelectedTemplate);

    const templates = plan === "free" || !plan
        ? allTemplates.filter((t) => !t.premium)
        : allTemplates;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-white/90">
                Template
            </h3>

            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin">
                {templates.map((t) => {
                    const isActive = selectedTemplate === t.value;
                    return (
                        <button
                            key={t.value}
                            onClick={() => setSelectedTemplate(t.value)}
                            className={`relative w-[180px] shrink-0 snap-start cursor-pointer overflow-hidden rounded border-2 transition ${
                                isActive
                                    ? "border-gray-800 dark:border-gray-300"
                                    : "border-gray-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                            }`}
                            style={{ height: 240 }}
                        >
                            <div className="h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-800">
                                <TemplatePreview slug={t.value} title={t.label} />
                            </div>

                            {isActive && (
                                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
                                    <Check size={14} className="text-gray-800 dark:text-gray-200" />
                                </div>
                            )}

                            <div className={`absolute bottom-0 left-0 right-0 px-2 py-1.5 text-center text-[11px] font-medium ${
                                isActive
                                    ? "bg-gray-800 text-white dark:bg-gray-300 dark:text-gray-900"
                                    : "bg-white/90 text-gray-600 dark:bg-gray-900/90 dark:text-gray-400"
                            }`}>
                                {t.label}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
