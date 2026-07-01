import api from "./axios";

export interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: { url: string; publicId: string };
    role: string;
    status: string;
    plan: string;
    headline?: string;
    phone?: string;
    location?: string;
    linkedinUrl?: string;
    website?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsageResponse {
    plan: string;
    limits: {
        resumes: number;
        coverLetters: number;
        atsChecks: number;
        teamMembers: boolean;
        prioritySupport: boolean;
    };
    usage: {
        resumes: number;
        coverLetters: number;
    };
    usageResetAt: string;
}

export const userApi = {
    getProfile: () => api.get<UserProfile>("/users/me"),
    getUsage: () => api.get<UsageResponse>("/users/usage"),
};
