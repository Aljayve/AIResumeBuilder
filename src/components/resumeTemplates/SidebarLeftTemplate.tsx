import type { ResumeData } from "../../store/resumeBuilderStore";
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from "react-icons/bs";

interface Props {
    resume: ResumeData;
}

export default function SidebarLeftTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [
        { icon: <BsTelephone size={12} />, text: personalInfo.phone },
        { icon: <BsEnvelope size={12} />, text: personalInfo.email },
        { icon: <BsGeoAlt size={12} />, text: personalInfo.address },
        { icon: <BsGlobe size={12} />, text: personalInfo.url, href: personalInfo.url },
    ].filter(c => c.text);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif] grid grid-cols-[34%_1fr]">
            <aside className="bg-brand-700 text-white flex flex-col gap-[18px]" style={{ padding: "32px 22px" }}>
                {personalInfo.photo && (
                    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full" style={{ border: "3px solid var(--tw-brand-500,#3b82f6)" }}>
                        <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                    </div>
                )}

                <section>
                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 mb-3">
                        Contact
                        <span className="flex-1 border-t border-white/20" />
                    </h3>
                    <div className="space-y-1 text-[10.5px] text-white/80">
                        {contactItems.map((c, i) => (
                            <p key={i} className="inline-flex items-center gap-1.5">
                                <span className="inline-flex w-3 h-3 shrink-0">{c.icon}</span>
                                <span>{c.text}</span>
                            </p>
                        ))}
                    </div>
                </section>

                {resume.skills.length > 0 && (
                    <section>
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 mb-3">
                            Skills
                            <span className="flex-1 border-t border-white/20" />
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {resume.skills.map((skill, i) => (
                                <span key={i} className="bg-white/15 rounded px-2 py-0.5 text-[10.5px] text-white/90">
                                    {typeof skill === "string" ? skill : skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {resume.education.length > 0 && (
                    <section>
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 mb-3">
                            Education
                            <span className="flex-1 border-t border-white/20" />
                        </h3>
                        <div className="space-y-2">
                            {resume.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="text-[11px] font-semibold text-white/90">{edu.degree || edu.school}</p>
                                    <p className="text-[10.5px] text-white/70">{edu.school}</p>
                                    <p className="text-[10.5px] text-white/60">{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.languages.length > 0 && (
                    <section>
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 mb-3">
                            Languages
                            <span className="flex-1 border-t border-white/20" />
                        </h3>
                        <div className="space-y-1">
                            {resume.languages.map((lang, i) => (
                                <p key={i} className="text-[11px] text-white/90">
                                    {lang.name} <span className="text-white/60 text-[10.5px]">({lang.proficiency})</span>
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {resume.certifications.length > 0 && (
                    <section>
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/90 mb-3">
                            Certifications
                            <span className="flex-1 border-t border-white/20" />
                        </h3>
                        <div className="space-y-1.5">
                            {resume.certifications.map((cert, i) => (
                                <div key={i}>
                                    <p className="text-[11px] font-medium text-white/90">{cert.name}</p>
                                    {cert.issuer && <p className="text-[10.5px] text-white/70">{cert.issuer}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            <main style={{ padding: "32px 28px" }}>
                <header className="mb-[14px]">
                    <h1 className="text-[28px] font-bold text-brand-600 tracking-[0.01em] m-0">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-[12px] text-gray-500 uppercase tracking-[0.08em] mt-0.5">
                        {personalInfo.label || (personalInfo.email ? personalInfo.email.split("@")[1]?.split(".")[0] || "Professional" : "Professional")}
                    </div>
                    <div className="h-[2px] w-12 bg-brand-500 mt-3" />
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
                            <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Projects</h3>
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
                </div>
            </main>
        </div>
    );
}
