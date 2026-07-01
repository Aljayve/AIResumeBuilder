import { create } from "zustand";

export type ResumeSection =
    | "personal"
    | "experience"
    | "education"
    | "skills"
    | "projects"
    | "certifications"
    | "languages"
    | "awards"
    | "activities"
    | "volunteering";

export type ResumeTemplate =
    | "ats-classic"
    | "modern"
    | "professional"
    | "accessible"
    | "creative"
    | "technical"
    | "header-band"
    | "inspired"
    | "plain"
    | "versatile"
    | "straightforward"
    | "sidebar-right"
    | "sidebar-left";

export interface ProfileLink {
    network: string;
    username: string;
    url: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    label: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    summary: string;
    objective: string;
    photo: string;
    photoFilter: "none" | "remove-bg";
    url: string;
    profiles: ProfileLink[];
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    isWorkingHere: boolean;
    years: string;
    url: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    score: string;
    isStudyingHere: boolean;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
}

export interface Language {
    id: string;
    name: string;
    proficiency: string;
}

export interface Award {
    id: string;
    title: string;
    awarder: string;
    date: string;
    summary: string;
}

export interface Activity {
    involvements: string;
    achievements: string;
}

export interface Volunteering {
    id: string;
    organization: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    isVolunteeringNow: boolean;
    url: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    awards: Award[];
    activities: Activity;
    volunteering: Volunteering[];
}

interface ResumeBuilderState {
    resumeId: string | null;
    activeSection: ResumeSection;
    selectedTemplate: ResumeTemplate;
    resumeTitle: string;
    resume: ResumeData;
    saved: boolean;
    saving: boolean;
    setActiveSection: (section: ResumeSection) => void;
    setSelectedTemplate: (template: ResumeTemplate) => void;
    setResumeTitle: (title: string) => void;
    updateResume: (data: Partial<ResumeData>) => void;
    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    loadResume: (id: string, title: string, template: string, content: Record<string, any>, profiles: ProfileLink[]) => void;
    resetResume: () => void;
    setSaved: (v: boolean) => void;
    setSaving: (v: boolean) => void;
}

const defaultPersonalInfo: PersonalInfo = {
    firstName: "",
    lastName: "",
    label: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    summary: "",
    objective: "",
    photo: "",
    photoFilter: "none",
    url: "",
    profiles: [],
};

const defaultActivity: Activity = {
    involvements: "",
    achievements: "",
};

const defaultResume: ResumeData = {
    personalInfo: { ...defaultPersonalInfo },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    activities: { ...defaultActivity },
    volunteering: [],
};

function fromBackendContent(content: Record<string, any>, existingProfiles: ProfileLink[] = []): Partial<ResumeData> {
    const pi = content.personalInfo ?? {};
    const profiles = existingProfiles.length > 0 ? [...existingProfiles] : [];

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

export const useResumeBuilderStore = create<ResumeBuilderState>((set) => ({
    resumeId: null,
    activeSection: "personal",
    selectedTemplate: "ats-classic",
    resumeTitle: "Untitled Resume",
    resume: { ...defaultResume, personalInfo: { ...defaultPersonalInfo }, activities: { ...defaultActivity } },
    saved: false,
    saving: false,

    setActiveSection: (section) => set({ activeSection: section }),
    setSelectedTemplate: (template) => set({ selectedTemplate: template }),
    setResumeTitle: (title) => set({ resumeTitle: title }),

    updateResume: (data) =>
        set((state) => ({
            resume: { ...state.resume, ...data },
            saved: false,
        })),

    updatePersonalInfo: (data) =>
        set((state) => ({
            resume: {
                ...state.resume,
                personalInfo: { ...state.resume.personalInfo, ...data },
            },
            saved: false,
        })),

    loadResume: (id, title, template, content, profiles) =>
        set((state) => {
            const merged = fromBackendContent(content, profiles);
            return {
                resumeId: id,
                resumeTitle: title,
                selectedTemplate: template as ResumeTemplate,
                activeSection: "personal",
                resume: {
                    ...state.resume,
                    ...merged,
                    personalInfo: { ...state.resume.personalInfo, ...merged.personalInfo },
                    activities: state.resume.activities,
                    volunteering: state.resume.volunteering,
                },
                saved: true,
            };
        }),

    resetResume: () =>
        set({
            resumeId: null,
            resumeTitle: "Untitled Resume",
            selectedTemplate: "ats-classic",
            activeSection: "personal",
            resume: {
                ...defaultResume,
                personalInfo: { ...defaultPersonalInfo },
                activities: { ...defaultActivity },
            },
            saved: false,
        }),

    setSaved: (v) => set({ saved: v }),
    setSaving: (v) => set({ saving: v }),
}));
