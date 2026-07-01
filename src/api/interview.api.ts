import api from "./axios";

export interface Question {
    id: string;
    question: string;
    hint: string;
}

export interface GenerateQuestionsResult {
    questions: {
        behavioral: Question[];
        technical: Question[];
        situational: Question[];
        general: Question[];
    };
}

export const interviewApi = {
    generate: (resumeId: string, jobDescription?: string) =>
        api.post<GenerateQuestionsResult>("/interview/generate", { resumeId, jobDescription }),
};
