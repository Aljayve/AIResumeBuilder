import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

const serif = "'Georgia','Times New Roman',serif";

export default function PlainTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [personalInfo.email, personalInfo.phone, personalInfo.address, personalInfo.url].filter(Boolean);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm]" style={{ padding: "40px 48px" }}>
            <header className="text-center border-b border-gray-200 pb-4 mb-5">
                <h1 className="text-[32px] font-bold m-0 text-gray-800" style={{ fontFamily: serif }}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                {personalInfo.label && (
                    <div className="text-[12px] mt-1.5 tracking-[0.06em] uppercase text-gray-600 font-['Inter',system-ui,sans-serif]">
                        {personalInfo.label}
                    </div>
                )}
                {contactItems.length > 0 && (
                    <div className="text-[10.5px] text-gray-500 mt-2.5 font-['Inter',system-ui,sans-serif]">
                        {contactItems.join(" · ")}
                    </div>
                )}
            </header>

            <div className="font-['Inter',system-ui,sans-serif] text-[11px] leading-[1.45] text-gray-800 space-y-[14px]">
                {personalInfo.summary && (
                    <section>
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Summary
                        </span>
                        <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                    </section>
                )}

                {resume.experience.length > 0 && (
                    <section>
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Experience
                        </span>
                        <div className="space-y-2.5">
                            {resume.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-2">
                                        <div>
                                            <div className="text-[12px] font-semibold text-gray-800">{exp.position}</div>
                                            <div className="text-[11px] text-gray-600">{exp.company}</div>
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
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Education
                        </span>
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
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Skills
                        </span>
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
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Projects
                        </span>
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

                {resume.certifications.length > 0 && (
                    <section>
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Certifications
                        </span>
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

                {resume.languages.length > 0 && (
                    <section>
                        <span className="inline-block bg-brand-600 text-white text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full mb-2">
                            Languages
                        </span>
                        <div className="space-y-1">
                            {resume.languages.map((lang, i) => (
                                <p key={i} className="text-[11px] text-gray-800">
                                    {lang.name} <span className="text-gray-500 text-[10.5px]">({lang.proficiency})</span>
                                </p>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
