import api from "./axios";

export interface ResumeSummary {
    _id: string;
    title: string;
    template: string;
    atsScore: number;
    createdAt: string;
    updatedAt: string;
}

export interface ResumeListResponse {
    resumes: ResumeSummary[];
    total: number;
}

export interface CreateResumeDto {
    title: string;
    template?: string;
    content?: Record<string, any>;
}

export interface UpdateResumeDto {
    title?: string;
    template?: string;
    content?: Record<string, any>;
}

export const resumeApi = {
    getAll: () => api.get<ResumeSummary[]>("/resumes"),
    getById: (id: string) => api.get(`/resumes/${id}`),
    create: (dto: CreateResumeDto) => api.post("/resumes", dto),
    update: (id: string, dto: UpdateResumeDto) => api.patch(`/resumes/${id}`, dto),
    delete: (id: string) => api.delete(`/resumes/${id}`),
    uploadPhoto: (resumeId: string, file: File) => {
        const form = new FormData();
        form.append("file", file);
        form.append("resumeId", resumeId);
        return api.patch("/resumes/photo", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};
