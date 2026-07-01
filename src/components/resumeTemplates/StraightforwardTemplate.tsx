import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

const serif = "'Georgia','Times New Roman',serif";

export default function StraightforwardTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif] grid grid-cols-[32%_1fr]">
            <aside className="bg-brand-500/[0.12] border-r border-gray-200" style={{ padding: "28px 20px" }}>
                <div className="space-y-[14px]">
                    {resume.education.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">Education</h3>
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

                    {resume.skills.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">Skills</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {resume.skills.map((skill, i) => (
                                    <span key={i} className="border border-gray-200 rounded-full px-2 py-0.5 text-[10px] text-gray-700">
                                        {typeof skill === "string" ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {resume.certifications.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2">Awards</h3>
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
                </div>
            </aside>

            <main style={{ padding: "28px 32px" }}>
                <header className="mb-[14px]">
                    <h1 className="text-[28px] font-bold m-0 text-brand-600" style={{ fontFamily: serif }}>
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-[12px] text-gray-500 mt-1">{personalInfo.label || "Professional"}</div>
                    {contactItems.length > 0 && (
                        <div className="text-[10.5px] text-gray-600 mt-2">{contactItems.join(" · ")}</div>
                    )}
                </header>

                <div className="space-y-[14px]">
                    {personalInfo.summary && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Summary</h3>
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

                    {resume.projects.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Involvements</h3>
                            <div className="space-y-2">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-semibold text-gray-800">{proj.name}</p>
                                        {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}
