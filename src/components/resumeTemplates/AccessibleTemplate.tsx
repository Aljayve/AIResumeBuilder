import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

export default function AccessibleTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif]" style={{ padding: "36px 40px" }}>
            <header className="mb-[18px]">
                <h1 className="text-[28px] font-bold text-brand-600 tracking-[0.01em] m-0 font-['Inter',system-ui,sans-serif]">
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <div className="text-[12px] text-brand-600 font-semibold">
                    {personalInfo.label || (personalInfo.email ? personalInfo.email.split("@")[1]?.split(".")[0] || "Professional" : "Professional")}
                </div>
                {contactItems.length > 0 && (
                    <div className="text-[10px] text-gray-500 mt-2">
                        {contactItems.join(" · ")}
                    </div>
                )}
            </header>

            <div className="text-[11px] leading-[1.45] text-gray-800 space-y-[14px]">
                {personalInfo.summary && (
                    <section>
                        <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                    </section>
                )}

                {resume.experience.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Experience</h3>
                        <div className="space-y-2.5">
                            {resume.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-2">
                                        <div>
                                            <div className="text-[12px] font-semibold text-gray-800">{exp.position}</div>
                                            <div className="text-[11px] text-brand-600 font-medium">{exp.company}</div>
                                        </div>
                                        <div className="text-[10px] text-gray-500 shrink-0">{exp.startDate} - {exp.endDate || "Present"}</div>
                                    </div>
                                    {exp.description && <p className="mt-1 text-[11px] leading-5 text-gray-600">{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.education.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Education</h3>
                        <div className="space-y-1.5">
                            {resume.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="font-semibold text-gray-800">
                                        {edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}
                                    </div>
                                    <div className="text-[10.5px] text-gray-500">
                                        {edu.school}{" · "}{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.skills.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-1.5">
                            {resume.skills.map((skill, i) => (
                                <span key={i} className="border border-gray-200 rounded-full px-2 py-0.5 text-[10px] text-gray-700">
                                    {typeof skill === "string" ? skill : skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {resume.projects.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Projects</h3>
                        <div className="space-y-2">
                            {resume.projects.map((proj, i) => (
                                <div key={i}>
                                    <div className="text-[12px] font-semibold text-gray-800">{proj.name}</div>
                                    {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                    {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 hover:underline break-all">{proj.link}</a>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.certifications.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Certifications</h3>
                        <div className="space-y-1.5">
                            {resume.certifications.map((cert, i) => (
                                <div key={i}>
                                    <div className="text-[11px] font-medium text-gray-800">{cert.name}</div>
                                    {cert.issuer && <div className="text-[10.5px] text-gray-500">{cert.issuer}</div>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.languages.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Languages</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {resume.languages.map((lang, i) => (
                                <span key={i} className="text-[11px] text-gray-800">
                                    {lang.name} <span className="text-gray-500 text-[10.5px]">({lang.proficiency})</span>
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
