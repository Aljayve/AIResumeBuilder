import type { ResumeData } from "../store/resumeBuilderStore";

function profileValue(profiles: { network: string; url: string }[], network: string): string {
    return profiles.find((p) => p.network === network)?.url ?? "";
}

export function toBackendContent(resume: ResumeData): Record<string, any> {
    const pi = resume.personalInfo;
    return {
        personalInfo: {
            firstName: pi.firstName,
            lastName: pi.lastName,
            label: pi.label,
            email: pi.email,
            phone: pi.phone,
            country: "",
            city: pi.city,
            address: pi.address,
            postalCode: "",
            website: pi.url,
            linkedin: profileValue(pi.profiles, "linkedin"),
            github: profileValue(pi.profiles, "github"),
            portfolio: "",
            photo: pi.photo,
        },
        summary: pi.summary,
        experiences: resume.experience.map((e) => ({
            company: e.company,
            position: e.position,
            employmentType: "",
            location: "",
            startDate: e.startDate,
            endDate: e.endDate,
            currentlyWorking: e.isWorkingHere,
            description: e.description,
            achievements: [],
            technologies: [],
        })),
        education: resume.education.map((e) => ({
            school: e.school,
            degree: e.degree,
            fieldOfStudy: e.fieldOfStudy,
            location: "",
            startDate: e.startDate,
            endDate: e.endDate,
            currentlyStudying: e.isStudyingHere,
            gpa: e.score,
            description: "",
            achievements: [],
        })),
        projects: resume.projects.map((p) => ({
            name: p.name,
            role: "",
            organization: "",
            startDate: "",
            endDate: "",
            ongoing: false,
            description: p.description,
            technologies: p.technologies ?? [],
            url: p.link ?? "",
            repository: "",
            achievements: [],
        })),
        skills: resume.skills,
        certifications: resume.certifications.map((c) => ({
            name: c.name,
            issuer: c.issuer,
            issueDate: c.issueDate,
            expirationDate: "",
            doesNotExpire: true,
            credentialId: "",
            credentialUrl: "",
            description: "",
            skills: [],
        })),
        languages: resume.languages.map((l) => ({
            name: l.name,
            proficiency: l.proficiency,
        })),
        awards: resume.awards.map((a) => ({
            title: a.title,
            date: a.date,
            issuer: a.awarder,
            description: a.summary,
            url: "",
        })),
        references: [],
        customSections: [],
    };
}

function findProfile(profiles: { network: string; url: string }[], network: string, existing: { network: string; username: string; url: string }[]): { network: string; username: string; url: string } {
    const found = existing.find((p) => p.network === network);
    return found ?? { network, username: "", url: "" };
}

export function fromBackendContent(content: Record<string, any>, existingProfiles: { network: string; username: string; url: string }[] = []): Partial<ResumeData> {
    const pi = content.personalInfo ?? {};
    const profiles = existingProfiles.length > 0 ? existingProfiles : [];

    const mergeProfile = (network: string, url: string) => {
        if (!url) return;
        const idx = profiles.findIndex((p) => p.network === network);
        if (idx >= 0) {
            profiles[idx] = { ...profiles[idx], url };
        } else {
            profiles.push({ network, username: "", url });
        }
    };
    mergeProfile("linkedin", pi.linkedin);
    mergeProfile("github", pi.github);

    return {
        personalInfo: {
            firstName: pi.firstName ?? "",
            lastName: pi.lastName ?? "",
            label: pi.label ?? "",
            email: pi.email ?? "",
            phone: pi.phone ?? "",
            address: pi.address ?? "",
            city: pi.city ?? "",
            summary: content.summary ?? "",
            objective: "",
            photo: pi.photo ?? "",
            photoFilter: "none",
            url: pi.website ?? "",
            profiles,
        },
        experience: (content.experiences ?? []).map((e: any) => ({
            id: e._id ?? "",
            company: e.company ?? "",
            position: e.position ?? "",
            startDate: e.startDate ?? "",
            endDate: e.endDate ?? "",
            description: e.description ?? "",
            isWorkingHere: e.currentlyWorking ?? false,
            years: "",
            url: "",
        })),
        education: (content.education ?? []).map((e: any) => ({
            id: e._id ?? "",
            school: e.school ?? "",
            degree: e.degree ?? "",
            fieldOfStudy: e.fieldOfStudy ?? "",
            startDate: e.startDate ?? "",
            endDate: e.endDate ?? "",
            score: e.gpa ?? "",
            isStudyingHere: e.currentlyStudying ?? false,
        })),
        projects: (content.projects ?? []).map((p: any) => ({
            id: p._id ?? "",
            name: p.name ?? "",
            description: p.description ?? "",
            technologies: p.technologies ?? [],
            link: p.url ?? "",
        })),
        skills: content.skills ?? [],
        certifications: (content.certifications ?? []).map((c: any) => ({
            id: c._id ?? "",
            name: c.name ?? "",
            issuer: c.issuer ?? "",
            issueDate: c.issueDate ?? "",
        })),
        languages: (content.languages ?? []).map((l: any) => ({
            id: l._id ?? "",
            name: l.name ?? "",
            proficiency: l.proficiency ?? "",
        })),
        awards: (content.awards ?? []).map((a: any) => ({
            id: a._id ?? "",
            title: a.title ?? "",
            awarder: a.issuer ?? "",
            date: a.date ?? "",
            summary: a.description ?? "",
        })),
    };
}
