import type { ResumeData } from "../../store/resumeBuilderStore";

interface Props {
    resume: ResumeData;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-brand-500/75 rounded-lg p-4 pt-3 relative">
            <div className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-gray-800">
                {title}
            </div>
            <div className="pt-2">{children}</div>
        </div>
    );
}

export default function ProfessionalTemplate({ resume }: Props) {
    const { personalInfo } = resume;

    return (
        <div className="mx-auto w-full max-w-[210mm] bg-white min-h-[297mm] font-['Inter',system-ui,sans-serif]">
            <div className="flex gap-2.5 p-[25px] h-full">
                <div className="flex-[2] flex flex-col gap-5">
                    <Section title="">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h1 className="text-xl font-medium text-gray-800">
                                {personalInfo.firstName} {personalInfo.lastName}
                            </h1>
                            <div className="flex gap-2 text-[11px] text-brand-600">
                                {personalInfo.email && <span>{personalInfo.email}</span>}
                                {personalInfo.phone && <span>{personalInfo.phone}</span>}
                            </div>
                        </div>
                    </Section>

                    {resume.experience.length > 0 && (
                        <Section title="Work Experience">
                            <div className="space-y-4">
                                {resume.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className="text-[12px] font-semibold text-gray-800">{exp.position}</p>
                                                <p className="text-[11px] text-brand-600 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="shrink-0 text-[10px] text-gray-500">{exp.startDate} - {exp.endDate || "Present"}</span>
                                        </div>
                                        {exp.description && <p className="mt-1 text-[11px] leading-5 text-gray-600">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {resume.projects.length > 0 && (
                        <Section title="Key Projects">
                            <div className="space-y-3">
                                {resume.projects.map((proj, i) => (
                                    <div key={i}>
                                        <p className="text-[12px] font-semibold text-gray-800">{proj.name}</p>
                                        {proj.description && <p className="text-[11px] leading-5 text-gray-600">{proj.description}</p>}
                                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10.5px] text-brand-600 hover:underline break-all inline-block mt-0.5">{proj.link}</a>}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {resume.certifications.length > 0 && (
                        <Section title="Certificates and Awards">
                            <div className="space-y-2">
                                {resume.certifications.map((cert, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-medium text-gray-800">{cert.name}</p>
                                        {cert.issuer && <p className="text-[10px] text-gray-500">{cert.issuer}</p>}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>

                <div className="flex-[1] flex flex-col gap-5 text-[11px]">
                    <Section title="Summary">
                        {personalInfo.photo && (
                            <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-brand-500/30">
                                <img src={personalInfo.photo} alt="" className="h-full w-full object-cover" />
                            </div>
                        )}
                        {personalInfo.summary && (
                            <p className="text-[11px] leading-5 text-gray-600">{personalInfo.summary}</p>
                        )}
                    </Section>

                    {resume.skills.length > 0 && (
                        <Section title="Technical Expertise">
                            <div className="flex flex-wrap gap-1.5">
                                {resume.skills.map((skill, i) => (
                                    <span key={i} className="rounded border border-brand-500/30 px-2 py-0.5 text-[10.5px] text-gray-700">
                                        {typeof skill === "string" ? skill : skill.name}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {resume.education.length > 0 && (
                        <Section title="Education">
                            <div className="space-y-2">
                                {resume.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="text-[11px] font-semibold text-gray-800">{edu.degree || edu.school}</p>
                                        <p className="text-[10.5px] text-gray-500">{edu.school}</p>
                                        <p className="text-[10px] text-gray-400">{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {resume.languages.length > 0 && (
                        <Section title="Languages">
                            <div className="space-y-1">
                                {resume.languages.map((lang, i) => (
                                    <p key={i} className="text-[11px] text-gray-800">
                                        {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
                                    </p>
                                ))}
                            </div>
                        </Section>
                    )}

                    <div className="border border-brand-500/75 rounded-lg p-3">
                        <p className="mb-1 text-[10px] font-semibold text-gray-800">Contact</p>
                        <div className="space-y-0.5 text-[10.5px] text-gray-500">
                            {personalInfo.address && <p>{personalInfo.address}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
