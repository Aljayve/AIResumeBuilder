import { useResumeBuilderStore, type ResumeSection } from "../../store/resumeBuilderStore";
import { User, Briefcase, GraduationCap, Wrench, FolderGit2, Award, Globe, Trophy, HeartHandshake, Hand } from "lucide-react";

const sectionIcon: Record<ResumeSection, React.ReactNode> = {
    personal: <User size={18} />,
    experience: <Briefcase size={18} />,
    education: <GraduationCap size={18} />,
    skills: <Wrench size={18} />,
    projects: <FolderGit2 size={18} />,
    certifications: <Award size={18} />,
    languages: <Globe size={18} />,
    awards: <Trophy size={18} />,
    activities: <HeartHandshake size={18} />,
    volunteering: <Hand size={18} />,
};

const sections: { key: ResumeSection; label: string }[] = [
    { key: "personal", label: "Personal Info" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "certifications", label: "Certifications" },
    { key: "languages", label: "Languages" },
    { key: "awards", label: "Awards" },
    { key: "activities", label: "Activities" },
    { key: "volunteering", label: "Volunteering" },
];

export default function BuilderSidebar() {
    const activeSection = useResumeBuilderStore((s) => s.activeSection);
    const setActiveSection = useResumeBuilderStore((s) => s.setActiveSection);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="mb-4 font-semibold text-gray-800 dark:text-white/90">
                Sections
            </h2>

            <nav className="space-y-1">
                {sections.map((s) => {
                    const isActive = activeSection === s.key;
                    return (
                        <button
                            key={s.key}
                            onClick={() => setActiveSection(s.key)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                            }`}
                        >
                            <span className={`${isActive ? "text-brand-500" : "text-gray-400 dark:text-gray-500"}`}>
                                {sectionIcon[s.key]}
                            </span>
                            {s.label}
                        </button>
                    );
                })}
            </nav>
        </div>
    )
}
