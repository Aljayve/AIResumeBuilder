import type { ResumeData } from "../../store/resumeBuilderStore";
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from "react-icons/bs";

interface Props {
    resume: ResumeData;
}

export default function SidebarRightTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [
        { icon: <BsTelephone size={12} />, text: personalInfo.phone },
        { icon: <BsEnvelope size={12} />, text: personalInfo.email },
        { icon: <BsGeoAlt size={12} />, text: personalInfo.address },
    ].filter(c => c.text);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif] grid grid-cols-[1fr_32%]">
            <main style={{ padding: "34px 28px" }}>
                <header className="mb-[14px]">
                    <h1 className="text-[28px] font-bold text-brand-600 tracking-[0.01em] m-0">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-[12px] text-gray-500 uppercase tracking-[0.08em] mt-1">
                        {personalInfo.label || (personalInfo.email ? personalInfo.email.split("@")[1]?.split(".")[0] || "Professional" : "Professional")}
                    </div>
                    <div className="h-[3px] w-14 rounded-full bg-brand-500 mt-3 mb-[18px]" />
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

                    {resume.certifications.length > 0 && (
                        <section>
                            <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">Certifications</h3>
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
            </main>

            <aside className="bg-brand-500/[0.06] border-l-4 border-brand-500" style={{ padding: "34px 22px" }}>
                <div className="space-y-6">
                    {personalInfo.photo && (
                        <div className="mx-auto h-[88px] w-[88px] overflow-hidden rounded-full">
                            <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                        </div>
                    )}

                    <section>
                        <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                            <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                            Contact
                        </h3>
                        <div className="space-y-1.5 text-[10.5px] text-gray-600">
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
                            <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 mb-3">
                                <span className="inline-block w-[14px] h-[3px] rounded bg-brand-500 shrink-0" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {resume.skills.map((skill, i) => (
                                    <span key={i} className="bg-white/60 rounded-md px-2 py-0.5 text-[10px] text-gray-700">
                                        {typeof skill === "string" ? skill : skill.name}
                                    </span>
                                ))}
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
                </div>
            </aside>
        </div>
    );
}
