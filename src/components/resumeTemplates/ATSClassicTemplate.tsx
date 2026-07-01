import type { ResumeData } from "../../store/resumeBuilderStore";
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from "react-icons/bs";

interface Props {
    resume: ResumeData;
}

function ContactLine({ icon, text, href }: { icon: React.ReactNode; text?: string; href?: string }) {
    if (!text) return null;
    const body = (
        <span className="inline-flex items-center gap-1.5 text-[10.5px] leading-[1.4] break-all">
            <span className="inline-flex w-3 h-3">{icon}</span>
            <span>{text}</span>
        </span>
    );
    if (href) return <a href={href} target="_blank" rel="noreferrer" className="text-inherit">{body}</a>;
    return body;
}

export default function ATSClassicTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    const contactItems = [
        { icon: <BsTelephone size={12} />, text: personalInfo.phone },
        { icon: <BsEnvelope size={12} />, text: personalInfo.email },
        { icon: <BsGeoAlt size={12} />, text: personalInfo.address },
        { icon: <BsGlobe size={12} />, text: personalInfo.url, href: personalInfo.url },
    ].filter(c => c.text);

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white p-10 min-h-[297mm]" style={{ padding: "40px 48px" }}>
            <header className="text-center border-b-2 border-brand-500 pb-3.5 mb-[18px]">
                <h1 className="m-0 text-[30px] font-bold tracking-[0.01em] text-brand-600 font-['Inter',system-ui,sans-serif]">
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                {personalInfo.label && (
                    <div className="text-[12px] text-gray-500 tracking-[0.08em] uppercase mt-1">
                        {personalInfo.label}
                    </div>
                )}
                <div className="flex justify-center gap-[18px] mt-2.5 text-gray-500 text-[10.5px] flex-wrap">
                    {contactItems.map((c, i) => (
                        <ContactLine key={i} icon={c.icon} text={c.text} href={c.href} />
                    ))}
                </div>
            </header>

            <div className="font-['Inter',system-ui,sans-serif] text-[11px] leading-[1.45] text-gray-800 space-y-[14px]">
                {personalInfo.summary && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Profile
                        </h3>
                        <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                    </section>
                )}

                {resume.experience.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Experience
                        </h3>
                        <div className="space-y-2.5">
                            {resume.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline gap-2">
                                        <div>
                                            <div className="text-[12px] font-semibold text-gray-800">{exp.position}</div>
                                            <div className="text-[11px] font-medium text-brand-600">{exp.company}</div>
                                        </div>
                                        <div className="text-[10px] text-gray-500 shrink-0">
                                            {exp.startDate} - {exp.endDate || "Present"}
                                        </div>
                                    </div>
                                    {exp.description && (
                                        <p className="mt-1 text-[11px] leading-5 text-gray-600">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {resume.education.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Education
                        </h3>
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
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {resume.skills.map((skill, i) => (
                                <span key={i} className="border border-gray-200 rounded-full px-2 py-0.5 text-[10px] text-gray-700 whitespace-nowrap">
                                    {typeof skill === "string" ? skill : skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {resume.projects.length > 0 && (
                    <section>
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Projects
                        </h3>
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
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Certifications
                        </h3>
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
                        <h3 className="text-[11px] font-bold uppercase tracking-wider border-b-2 border-brand-500 pb-[3px] mb-2">
                            Languages
                        </h3>
                        <div className="space-y-1">
                            {resume.languages.map((lang, i) => (
                                <div key={i} className="text-[11px] text-gray-800">
                                    {lang.name} <span className="text-gray-500 text-[10.5px]">({lang.proficiency})</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
