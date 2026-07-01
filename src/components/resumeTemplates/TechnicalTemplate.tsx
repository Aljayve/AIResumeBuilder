import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

const mono = { fontFamily: "'JetBrains Mono','Fira Code','Consolas',monospace" };

export default function TechnicalTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif]" style={{ padding: "34px 40px" }}>
            <header className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3.5">
                <div>
                    <div className="text-[11px] text-brand-500" style={mono}>&lt;hello /&gt;</div>
                    <h1 className="text-[26px] font-bold text-gray-800 tracking-[0.01em] m-0">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-[11px] text-gray-500" style={mono}>
                        {"// "}{personalInfo.label || "Developer"}
                    </div>
                </div>
                <div className="text-right text-[10.5px] text-gray-500" style={mono}>
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                </div>
            </header>

            <div className="grid grid-cols-[1fr_38%] gap-[22px] mt-4">
                <div className="space-y-[14px]">
                    {personalInfo.summary && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Summary
                            </h3>
                            <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {resume.experience.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Experience
                            </h3>
                            <div className="space-y-3">
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

                    {resume.projects.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Projects
                            </h3>
                            <div className="space-y-2">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-semibold text-gray-800">{proj.name}</p>
                                        {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 hover:underline break-all">{proj.link}</a>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="space-y-[14px]">
                    {resume.skills.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Skills
                            </h3>
                            <div className="space-y-1.5">
                                {resume.skills.map((skill, i) => {
                                    const name = typeof skill === "string" ? skill : skill.name;
                                    return (
                                        <div key={i} className="flex justify-between items-center text-[10.5px] mb-1">
                                            <span>{name}</span>
                                            <span className="inline-flex gap-0.5">
                                                {[0, 1, 2, 3, 4].map((d) => (
                                                    <span key={d} className={`w-1.5 h-1.5 rounded-full ${d < (i % 5 + 1) ? "bg-brand-500" : "bg-gray-200"}`} />
                                                ))}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {resume.education.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Education
                            </h3>
                            <div className="space-y-2">
                                {resume.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-semibold text-gray-800">{edu.degree || edu.school}</p>
                                        <p className="text-[10.5px] text-gray-500">{edu.school}</p>
                                        <p className="text-[10px] text-gray-400">{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {resume.certifications.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 mr-2" />
                                Certifications
                            </h3>
                            <div className="space-y-1.5">
                                {resume.certifications.map((cert, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-medium text-gray-800">{cert.name}</p>
                                        {cert.issuer && <p className="text-[10.5px] text-gray-500">{cert.issuer}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
}
