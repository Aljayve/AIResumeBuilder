import type { ResumeData } from "../../store/resumeBuilderStore";
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from "react-icons/bs";

interface Props {
    resume: ResumeData;
}

export default function HeaderBandTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [
        { icon: <BsTelephone size={12} />, text: personalInfo.phone },
        { icon: <BsEnvelope size={12} />, text: personalInfo.email },
        { icon: <BsGeoAlt size={12} />, text: personalInfo.address },
        { icon: <BsGlobe size={12} />, text: personalInfo.url, href: personalInfo.url },
    ].filter(c => c.text);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif]">
            <header className="bg-brand-700 text-white flex items-center gap-5" style={{ padding: "28px 36px" }}>
                {personalInfo.photo && (
                    <div className="h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full" style={{ border: "3px solid var(--tw-brand-500,#3b82f6)" }}>
                        <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                    </div>
                )}
                <div className="flex-1">
                    <h1 className="text-[28px] font-bold text-white tracking-[0.01em] m-0">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-[12px] tracking-[0.1em] uppercase opacity-90 mt-1">
                        {personalInfo.label || "Professional"}
                    </div>
                </div>
                <div className="text-right text-[10.5px] text-white/90 space-y-1">
                    {contactItems.map((c, i) => (
                        <div key={i} className="inline-flex items-center gap-1.5">
                            <span className="inline-flex w-3 h-3">{c.icon}</span>
                            <span>{c.text}</span>
                        </div>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-[1fr_38%]" style={{ padding: "26px 36px", gap: 26 }}>
                <div className="space-y-[14px]">
                    {personalInfo.summary && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Summary
                            </h3>
                            <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                        </section>
                    )}

                    {resume.experience.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
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
                </div>

                <aside className="space-y-[14px]">
                    {resume.skills.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {resume.skills.map((skill, i) => (
                                    <span key={i} className="border border-gray-200 rounded-full px-2 py-0.5 text-[10px] text-gray-700">
                                        {typeof skill === "string" ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {resume.education.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
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

                    {resume.languages.length > 0 && (
                        <section>
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] mb-2">
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
                </aside>
            </div>
        </div>
    );
}
