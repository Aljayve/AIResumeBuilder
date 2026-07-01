import api from "./axios";

export interface AnalyzeResumeDto {
    resumeId: string;
    jobDescription: string;
}

export interface AtsAnalysisResult {
    generatedAt: string;
    keywordAnalysis: {
        matched: string[];
        missing: string[];
        extra: string[];
        matchPercentage: number;
    };
    score: {
        overall: number;
        skills: number;
        experience: number;
        projects: number;
        education: number;
        summary: number;
    };
    suggestions: {
        type: "success" | "warning" | "info";
        title: string;
        description: string;
    }[];
    ai: {
        strengths: string[];
        weaknesses: string[];
        priorityFixes: string[];
        recommendation: string;
    };
}

export const atsApi = {
    analyze: (dto: AnalyzeResumeDto) =>
        api.post<AtsAnalysisResult>("/ats/analyze", dto),
};
