import api from "./axios";

export interface MatchResult {
    matchPercentage: number;
    matchingSkills: string[];
    missingSkills: string[];
    suggestions: string[];
}

export const jobMatcherApi = {
    match: (resumeId: string, jobDescription: string) =>
        api.post<MatchResult>("/job-matcher/match", { resumeId, jobDescription }),
};
