import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

export default function ModernTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const SectionHeading = ({ title }: { title: string }) => (
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">{title}</h3>
    );

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] p-2 font-['Inter',system-ui,sans-serif]">
            <div className="p-3">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-gray-800 leading-tight">
                            {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <p className="text-[11px] text-gray-500 mt-0.5">{personalInfo.label}</p>
                        <div className="flex gap-3 mt-1.5 text-[10px] text-gray-400">
                            {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            {personalInfo.email && <span>{personalInfo.email}</span>}
                            {personalInfo.address && <span>{personalInfo.address}</span>}
                        </div>
                    </div>
                    {personalInfo.photo && (
                        <div className="ml-auto shrink-0 h-[100px] w-[100px] overflow-hidden rounded-full">
                            <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 p-3">
                <div className="basis-[60%] space-y-4">
                    {personalInfo.summary && (
                        <div>
                            <SectionHeading title="Summary" />
                            <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                        </div>
                    )}

                    {resume.experience.length > 0 && (
                        <div>
                            <SectionHeading title="Experience" />
                            <div className="space-y-3">
                                {resume.experience.map((exp, i) => (
                                    <div key={i} className="border-b border-gray-100 pb-2 last:border-0">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <p className="text-[12px] font-semibold text-gray-800">{exp.position}</p>
                                            <p className="text-[10px] text-gray-400 shrink-0">
                                                {exp.startDate} - {exp.endDate || "Present"}
                                            </p>
                                        </div>
                                        <p className="text-[10.5px] text-gray-500">{exp.company}</p>
                                        {exp.description && <p className="text-[11px] leading-5 text-gray-600 mt-1">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {resume.projects.length > 0 && (
                        <div>
                            <SectionHeading title="Projects" />
                            <div className="space-y-2">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-semibold text-gray-800">{proj.name}</p>
                                        {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {resume.certifications.length > 0 && (
                        <div>
                            <SectionHeading title="Certifications" />
                            <div className="space-y-1.5">
                                {resume.certifications.map((cert, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-medium text-gray-800">{cert.name}</p>
                                        {cert.issuer && <p className="text-[10px] text-gray-500">{cert.issuer}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="basis-[40%] space-y-4">
                    {resume.education.length > 0 && (
                        <div>
                            <SectionHeading title="Education" />
                            <div className="space-y-2">
                                {resume.education.map((edu, i) => (
                                    <div key={i} className="border-b border-gray-100 pb-1.5 last:border-0">
                                        <p className="text-[11px] font-semibold text-gray-800">
                                            {edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""}
                                        </p>
                                        <p className="text-[10.5px] text-gray-500">{edu.institution || edu.school}</p>
                                        <p className="text-[10px] text-gray-400">{edu.startDate} - {edu.endDate || "Present"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {resume.skills.length > 0 && (
                        <div>
                            <SectionHeading title="Skills" />
                            <div className="flex flex-wrap gap-2 py-1">
                                {resume.skills.map((skill, i) => (
                                    <span key={i} className="py-1 px-2 text-[11px] font-medium border-b-2 border-gray-200">
                                        {typeof skill === "string" ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {resume.languages.length > 0 && (
                        <div>
                            <SectionHeading title="Languages" />
                            <div className="space-y-1">
                                {resume.languages.map((lang, i) => (
                                    <p key={i} className="text-[11px] text-gray-800">
                                        {lang.name} <span className="text-gray-500 text-[10px]">({lang.proficiency})</span>
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
