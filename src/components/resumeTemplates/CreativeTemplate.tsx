import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

export default function CreativeTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [personalInfo.phone, personalInfo.email, personalInfo.address].filter(Boolean);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif]">
            <header className="relative overflow-hidden" style={{ padding: "36px 36px 22px" }}>
                <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-brand-500/20 pointer-events-none" />
                <div className="absolute top-[30px] right-[120px] w-20 h-20 rounded-full bg-brand-600/15 pointer-events-none" />
                <div className="relative flex items-center gap-[18px]">
                    {personalInfo.photo && (
                        <div className="h-[90px] w-[90px] shrink-0 overflow-hidden rounded-[16px]" style={{ border: "3px solid", borderColor: "var(--tw-brand-500,#3b82f6)" }}>
                            <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-[30px] font-bold text-brand-600 tracking-[0.01em] m-0">
                            {personalInfo.firstName} {personalInfo.lastName}
                        </h1>
                        <div className="text-[12px] font-semibold text-brand-600 mt-0.5">
                            {personalInfo.label || (personalInfo.email ? personalInfo.email.split("@")[1]?.split(".")[0] || "Professional" : "Professional")}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-[38%_1fr]" style={{ padding: "0 36px 30px", gap: 24 }}>
                <aside className="space-y-6">
                    <section className="bg-brand-500/[0.08] p-3.5 rounded-[10px]">
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                            <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                            Contact
                        </h3>
                        <div className="space-y-1.5 text-[10.5px] text-gray-600">
                            {contactItems.map((item, i) => <p key={i}>{item}</p>)}
                        </div>
                    </section>

                    {resume.skills.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Skills
                            </h3>
                            <div className="space-y-1.5">
                                {resume.skills.map((skill, i) => {
                                    const name = typeof skill === "string" ? skill : skill.name;
                                    return (
                                        <div key={i} className="mb-1.5">
                                            <div className="flex justify-between text-[10.5px] mb-0.5">
                                                <span>{name}</span>
                                                <span className="text-gray-400">{(i % 5 + 3) * 20}%</span>
                                            </div>
                                            <div className="h-1 bg-gray-200 rounded-sm">
                                                <div className="h-full bg-brand-500 rounded-sm" style={{ width: `${(i % 5 + 3) * 20}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {resume.education.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Education
                            </h3>
                            <div className="space-y-2">
                                {resume.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-semibold text-gray-800">{edu.degree || edu.school}</p>
                                        <p className="text-[10.5px] text-gray-500">{edu.school}</p>
                                        <p className="text-[10.5px] text-gray-400">{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {resume.languages.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Languages
                            </h3>
                            <div className="space-y-1">
                                {resume.languages.map((lang, i) => (
                                    <p key={i} className="text-[11px] text-gray-800">
                                        {lang.name} <span className="text-gray-500 text-[10.5px]">({lang.proficiency})</span>
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}

                    {resume.certifications.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
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

                <main className="space-y-6">
                    {personalInfo.summary && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Summary
                            </h3>
                            <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {resume.experience.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
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
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Projects
                            </h3>
                            <div className="space-y-2">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-semibold text-gray-800">{proj.name}</p>
                                        {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10.5px] text-brand-600 hover:underline break-all">{proj.link}</a>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
